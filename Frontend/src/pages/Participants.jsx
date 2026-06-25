import { useEffect, useState } from 'react';
import { Users, Search, MapPin, Mail } from 'lucide-react';
import { verificationApi } from '../api/client';

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificationApi.getParticipants()
      .then(data => {
        // Parse JSON if API returns a string encoded array
        setParticipants(typeof data === 'string' ? JSON.parse(data) : data);
      })
      .catch(err => console.error('Failed to fetch participants:', err))
      .finally(() => setLoading(false));
  }, []);

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
          {filteredParticipants.map((user, index) => (
            <div key={user.id || index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{user.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><MapPin size={14} className="text-emerald-600" /> {user.district}</p>
                  <p className="flex items-center gap-2"><Mail size={14} className="text-emerald-600" /> {user.email || 'N/A'}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between text-xs text-gray-400">
                <span>ID: {user.id || index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}