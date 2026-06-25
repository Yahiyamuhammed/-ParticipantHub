import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, Zap, Bell, Calendar } from 'lucide-react';
import { verificationApi } from '../api/client';

export default function Recognize() {
  const [mode, setMode] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Added state for the image preview
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  // Cleanup object URLs to prevent memory leaks when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      setPreviewUrl(imageSrc); // The webcam screenshot is a base64 string, perfect for preview
      setMode('preview');
    }
  }, [webcamRef]);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a local URL for the uploaded file
      setMode('preview');
    }
  };

  const resetState = () => {
    setMode(null);
    setResult(null);
    setSelectedFile(null);
    setPreviewUrl(null);
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
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* Professional Hero Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your festival,<br />
          <span className="text-indigo-600">in your pocket.</span>
        </h1>
        <p className="text-lg text-slate-600">
          No queues. No confusion. Identify yourself instantly to access your live schedule, published results, and venue updates.
        </p>
      </div>

      {/* Recognition Tool Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
        
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">Participant Verification</h2>

        {/* Mode Selection */}
        {!mode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setMode('camera')}
              className="group flex flex-col items-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition"
            >
              <Camera size={48} className="text-slate-400 group-hover:text-indigo-600 mb-4 transition-colors" />
              <span className="font-semibold text-slate-700 group-hover:text-indigo-900">Take a Selfie</span>
              <span className="text-xs text-slate-500 mt-2 text-center">Fastest way to check in</span>
            </button>
            
            <label className="group flex flex-col items-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition cursor-pointer">
              <Upload size={48} className="text-slate-400 group-hover:text-indigo-600 mb-4 transition-colors" />
              <span className="font-semibold text-slate-700 group-hover:text-indigo-900">Upload Photo</span>
              <span className="text-xs text-slate-500 mt-2 text-center">From your device gallery</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        )}

        {/* Live Camera View */}
        {mode === 'camera' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="rounded-xl overflow-hidden border-4 border-indigo-100 mb-6 shadow-inner bg-slate-900 relative">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
                className="w-full max-w-md object-cover aspect-square sm:aspect-video"
              />
            </div>
            <div className="flex gap-4 w-full max-w-md">
              <button onClick={resetState} className="flex-1 py-3 text-slate-700 bg-slate-100 rounded-lg font-semibold hover:bg-slate-200">Cancel</button>
              <button onClick={handleCapture} className="flex-1 py-3 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 shadow-md hover:shadow-lg">Capture</button>
            </div>
          </div>
        )}

        {/* Image Preview & Submit View */}
        {mode === 'preview' && selectedFile && (
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
            
            {/* Display the captured or uploaded photo */}
            <div className="relative mb-6">
              <img 
                src={previewUrl} 
                alt="Face Preview" 
                className="w-48 h-48 object-cover rounded-full border-4 border-indigo-100 shadow-lg"
              />
              <div className="absolute bottom-2 right-2 bg-indigo-500 text-white p-1.5 rounded-full shadow-sm">
                <Camera size={16} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">Looking Good!</h3>
            <p className="text-slate-600 mb-8">Ensure your face is clearly visible before verifying.</p>
            
            {result ? (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl w-full max-w-md text-left shadow-inner">
                <pre className="text-sm overflow-x-auto text-slate-800 font-mono">{JSON.stringify(result, null, 2)}</pre>
                <button onClick={resetState} className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-2">
                  <span>←</span> Try Another Face
                </button>
              </div>
            ) : (
              <div className="flex gap-4 w-full max-w-md">
                 <button onClick={resetState} className="flex-1 py-3 text-slate-700 bg-slate-100 rounded-lg font-semibold hover:bg-slate-200">Retake</button>
                 <button onClick={submitToApi} disabled={loading} className="flex-1 py-3 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 shadow-md disabled:bg-indigo-400 disabled:shadow-none flex justify-center items-center gap-2">
                   {loading ? (
                     <><Zap className="animate-pulse" size={18} /> Processing...</>
                   ) : (
                     'Verify Identity'
                   )}
                 </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-8 border-t border-slate-200">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mb-4">
            <Zap size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Instant Results</h3>
          <p className="text-sm text-slate-600">Ranks and grades published the moment judges submit. No waiting at notice boards.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mb-4">
            <Calendar size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Live Schedule</h3>
          <p className="text-sm text-slate-600">Your personalised event timetable with venue and current status—always up to date.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mb-4">
            <Bell size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">WhatsApp Alerts</h3>
          <p className="text-sm text-slate-600">Get venue changes and 30-minute event reminders sent straight to your chat.</p>
        </div>
      </div>

    </div>
  );
}