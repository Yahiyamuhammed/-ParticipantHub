import { useEffect, useState } from "react";
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { verificationApi } from "../api/client";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace your existing useEffect in Logs.jsx with this:

  useEffect(() => {
    verificationApi
      .getLogs()
      .then((data) => {
        // Target the .logs array inside the response object
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;
        setLogs(parsedData.logs || []);
      })
      .catch((err) => console.error("Failed to load logs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardList className="text-emerald-700 w-8 h-8" />
        <h1 className="text-2xl font-bold text-gray-800">
          Recognition Activity Logs
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Loading access logs...
        </div>
      ) : !Array.isArray(logs) || logs.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded-xl text-gray-400">
          No activity logs recorded yet.
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider font-semibold border-b">
                  <th className="px-6 py-3.5">Timestamp</th>
                  <th className="px-6 py-3.5">Matched Participant</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Confidence</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {logs.map((log) => {
                  const isSuccess = log.status?.toLowerCase() === "success";
                  return (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Participant ID: {log.participant_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isSuccess ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}
                        >
                          {isSuccess ? (
                            <CheckCircle size={12} />
                          ) : (
                            <AlertTriangle size={12} />
                          )}
                          {isSuccess ? "Success" : "Failed"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                        {log.confidence
                          ? `${(log.confidence * 100).toFixed(1)}%`
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
