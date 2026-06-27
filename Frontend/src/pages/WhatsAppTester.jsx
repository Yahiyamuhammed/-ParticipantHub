import { useState } from 'react';
import { verificationApi } from '../api/client';
import { Send, Loader2 } from 'lucide-react';

// Define users for easy lookup
const USERS = {
  yahiya: { phone: '919526515290', name: 'Yahiya' },
  shammas: { phone: '918078589330', name: 'Shammas' }
};

export default function WhatsAppTester() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    phone: USERS.yahiya.phone,
    name: USERS.yahiya.name,
    endpoint: 'hello',
    order_id: 'ORDER-123',
    date: '2026-06-27'
  });

  // Handler to update phone and name simultaneously
  const handleUserChange = (e) => {
    const user = USERS[e.target.value];
    setFormData({ ...formData, phone: user.phone, name: user.name });
  };

  const handleTest = async () => {
    setLoading(true);
    setStatus(null);
    try {
      await verificationApi.sendWhatsApp(formData.endpoint, formData);
      setStatus({ type: 'success', msg: `Message sent to ${formData.name} successfully!` });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.detail || 'Failed to send' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold mb-4">WhatsApp API Tester</h2>
      
      <label className="block text-sm font-medium mb-1">Select User</label>
      <select className="w-full p-2 border rounded mb-3" onChange={handleUserChange}>
        <option value="yahiya">Yahiya (+91 95265 15290)</option>
        <option value="shammas">Shammas (+91 80-78589330)</option>
      </select>

      <label className="block text-sm font-medium mb-1">Endpoint</label>
      <select className="w-full p-2 border rounded mb-3" onChange={e => setFormData({...formData, endpoint: e.target.value})}>
        <option value="hello">Hello Alert</option>
        <option value="plain-alert">Plain Alert</option>
        <option value="order-confirmation">Order Confirmation</option>
      </select>

      <button 
        onClick={handleTest}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-indigo-700"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        Send to {formData.name}
      </button>

      {status && (
        <div className={`mt-4 p-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.msg}
        </div>
      )}
    </div>
  );
}