import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, CheckCircle } from 'lucide-react';
import { verificationApi } from '../api/client';

export default function Recognize() {
  const [mode, setMode] = useState(null); // 'camera' | 'file' | null
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const webcamRef = useRef(null);

  // Convert base64 from webcam to a File object for the API
  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  };

  const handleCapture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const file = await urlToFile(imageSrc, 'capture.jpg', 'image/jpeg');
      setSelectedFile(file);
      setMode('preview');
    }
  }, [webcamRef]);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setMode('preview');
    }
  };

  const submitToApi = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const response = await verificationApi.recognize(selectedFile);
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult({ error: "Recognition failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-emerald-800 mb-8">Facial Recognition</h1>

      {/* Mode Selection */}
      {!mode && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setMode('camera')}
            className="flex flex-col items-center p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition"
          >
            <Camera size={48} className="text-emerald-600 mb-4" />
            <span className="font-semibold text-gray-700">Open Camera</span>
          </button>
          
          <label className="flex flex-col items-center p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer">
            <Upload size={48} className="text-emerald-600 mb-4" />
            <span className="font-semibold text-gray-700">Upload File</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {/* Camera View */}
      {mode === 'camera' && (
        <div className="flex flex-col items-center">
          <div className="rounded-lg overflow-hidden border-4 border-emerald-100 mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="w-full max-w-md"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={() => setMode(null)} className="px-6 py-2 text-gray-600 bg-gray-200 rounded-full font-medium hover:bg-gray-300">Cancel</button>
            <button onClick={handleCapture} className="px-6 py-2 text-white bg-emerald-600 rounded-full font-medium hover:bg-emerald-700">Capture Photo</button>
          </div>
        </div>
      )}

      {/* Preview & Submit View */}
      {mode === 'preview' && selectedFile && (
        <div className="flex flex-col items-center text-center">
          <CheckCircle size={48} className="text-emerald-500 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-6">Photo ready for processing</p>
          
          {result ? (
            <div className="p-4 bg-gray-100 rounded-lg w-full max-w-md text-left">
              <pre className="text-sm overflow-x-auto text-emerald-900">{JSON.stringify(result, null, 2)}</pre>
              <button onClick={() => { setMode(null); setResult(null); setSelectedFile(null); }} className="mt-4 text-emerald-600 font-medium underline">Try Again</button>
            </div>
          ) : (
            <div className="flex gap-4">
               <button onClick={() => setMode(null)} className="px-6 py-2 text-gray-600 bg-gray-200 rounded-full font-medium hover:bg-gray-300">Retake</button>
               <button onClick={submitToApi} disabled={loading} className="px-6 py-2 text-white bg-emerald-600 rounded-full font-medium hover:bg-emerald-700 disabled:bg-emerald-300">
                 {loading ? 'Processing...' : 'Recognize Face'}
               </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}