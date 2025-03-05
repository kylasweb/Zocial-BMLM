import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSave, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function EnvironmentManager() {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSecrets, setShowSecrets] = useState({});
  const [newVariable, setNewVariable] = useState({ key: '', value: '', isSecret: false });
  
  useEffect(() => {
    fetchEnvironmentVariables();
  }, []);

  const fetchEnvironmentVariables = async () => {
    try {
      const response = await fetch('/api/admin/environment');
      const data = await response.json();
      setVariables(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch environment variables');
      setLoading(false);
    }
  };

  const handleAddVariable = async () => {
    try {
      const response = await fetch('/api/admin/environment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVariable)
      });

      if (!response.ok) throw new Error('Failed to add variable');

      toast.success('Environment variable added successfully');
      fetchEnvironmentVariables();
      setNewVariable({ key: '', value: '', isSecret: false });
    } catch (error) {
      toast.error('Failed to add environment variable');
    }
  };

  const handleUpdateVariable = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/admin/environment/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) throw new Error('Failed to update variable');

      toast.success('Environment variable updated successfully');
      fetchEnvironmentVariables();
    } catch (error) {
      toast.error('Failed to update environment variable');
    }
  };

  const handleDeleteVariable = async (id) => {
    if (!window.confirm('Are you sure you want to delete this variable?')) return;

    try {
      const response = await fetch(`/api/admin/environment/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete variable');

      toast.success('Environment variable deleted successfully');
      fetchEnvironmentVariables();
    } catch (error) {
      toast.error('Failed to delete environment variable');
    }
  };

  const toggleSecretVisibility = (id) => {
    setShowSecrets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Environment Variables</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => fetchEnvironmentVariables()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Add New Variable Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Variable</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="KEY"
            value={newVariable.key}
            onChange={(e) => setNewVariable(prev => ({ ...prev, key: e.target.value }))}
            className="border rounded-lg px-4 py-2"
          />
          <input
            type={newVariable.isSecret ? 'password' : 'text'}
            placeholder="Value"
            value={newVariable.value}
            onChange={(e) => setNewVariable(prev => ({ ...prev, value: e.target.value }))}
            className="border rounded-lg px-4 py-2"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newVariable.isSecret}
                onChange={(e) => setNewVariable(prev => ({ ...prev, isSecret: e.target.checked }))}
                className="form-checkbox"
              />
              <span>Secret</span>
            </label>
            <button
              onClick={handleAddVariable}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <FiPlus className="inline-block mr-2" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Variables List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variables.map((variable) => (
              <tr key={variable.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {variable.key}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {variable.isSecret ? (
                    <div className="flex items-center space-x-2">
                      <span>
                        {showSecrets[variable.id] ? variable.value : '••••••••'}
                      </span>
                      <button
                        onClick={() => toggleSecretVisibility(variable.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showSecrets[variable.id] ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  ) : (
                    variable.value
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${variable.isSecret ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {variable.isSecret ? 'Secret' : 'Public'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleUpdateVariable(variable.id, { ...variable })}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FiEdit2 className="inline-block" />
                  </button>
                  <button
                    onClick={() => handleDeleteVariable(variable.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}