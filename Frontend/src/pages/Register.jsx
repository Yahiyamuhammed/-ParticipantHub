import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, UserPlus, CheckCircle, RefreshCw } from 'lucide-react';
import { verificationApi } from '../api/client';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', district: '', email: '' });
  const [cameraMode, setCameraMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState({ loading: false, success: null, error: null });
  
  const webcamRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCameraMode(false);
    }
  };

  const handleCapture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const res = await fetch(imageSrc);
      const buf = await res.arrayBuffer();
      const file = new File([buf], 'register_capture.jpg', { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(imageSrc);
      setCameraMode(false);
    }
  }, [webcamRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatus({ loading: false, success: null, error: 'Please select or capture a profile photo.' });
      return;
    }

    setStatus({ loading: true, success: null, error: null });
    try {
      await verificationApi.register(formData.name, formData.district, formData.email, selectedFile);
      setStatus({ loading: false, success: 'Participant successfully registered!', error: null });
      setFormData({ name: '', district: '', email: '' });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: null, error: err.response?.data?.detail?.[0]?.msg || 'Registration failed.' });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="text-emerald-700 w-8 h-8" />
        <h1 className="text-2xl font-bold text-gray-800">Register Participant</h1>
      </div>

      {status.success && (
        <div className="p-4 mb-6 text-sm text-emerald-800 bg-emerald-50 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} /> {status.success}
        </div>
      )}

      {status.error && (
        <div className="p-4 mb-6 text-sm text-red-800 bg-red-50 rounded-xl">
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
          <input type="text" name="district" required value={formData.district} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo *</label>
          
          {cameraMode ? (
            <div className="flex flex-col items-center p-4 bg-gray-50 border rounded-xl">
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full max-w-xs rounded-lg mb-3" />
              <div className="flex gap-2">
                <button type="button" onClick={handleCapture} className="px-4 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Capture</button>
                <button type="button" onClick={() => setCameraMode(false)} className="px-4 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
              </div>
            </div>
          ) : previewUrl ? (
            <div className="flex items-center gap-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
              <img src={previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-emerald-200" />
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Photo attached successfully</p>
                <button type="button" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"><RefreshCw size={12}/> Change photo</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setCameraMode(true)} className="flex items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 text-gray-600 text-sm font-medium">
                <Camera size={18} /> Take Snapshot
              </button>
              <label className="flex items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 text-gray-600 text-sm font-medium cursor-pointer">
                <Upload size={18} /> Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}
        </div>

        <button type="submit" disabled={status.loading} className="w-full mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:bg-emerald-300">
          {status.loading ? 'Registering...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
}