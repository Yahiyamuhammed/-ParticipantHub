import { useEffect, useState } from 'react';
import { Users, Search, MapPin, Mail, Trash2 } from 'lucide-react'; // ✅ Imported Trash2
import { verificationApi } from '../api/client';

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificationApi.getParticipants()
      .then(data => {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        setParticipants(parsedData.users || []);
      })
      .catch(err => console.error('Failed to fetch participants:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this participant?')) return;
    
    try {
      const response = await verificationApi.deleteParticipant(userId);
      if (response.success) {
        // Remove the user locally from the state array
        setParticipants(prev => prev.filter(user => user.id !== userId));
      } else {
        alert(response.message || 'Could not delete user.');
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('An error occurred while deleting the participant.');
    }
  };

  const filteredParticipants = Array.isArray(participants) ? participants.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.district?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="text-emerald-700 w-8 h-8" />
          <h1 className="text-2xl font-bold text-gray-800">Registered Participants</h1>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search name or district..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading records...</div>
      ) : filteredParticipants.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded-xl text-gray-400">No participants found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParticipants.map((user) => (
            <div key={user.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
                  <div className="flex items-center gap-2">
                    {user.status && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-md font-medium capitalize">
                        {user.status.replace('_', ' ')}
                      </span>
                    )}
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                      title="Delete Participant"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><MapPin size={14} className="text-emerald-600" /> {user.district}</p>
                  <p className="flex items-center gap-2"><Mail size={14} className="text-emerald-600" /> {user.email || 'N/A'}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between text-xs text-gray-400">
                <span>ID: {user.id}</span>
                <span>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}