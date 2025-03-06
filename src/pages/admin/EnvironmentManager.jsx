import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSave, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const defaultEnvironmentVariables = [
  { key: 'NODE_VERSION', value: '20', isSecret: false },
  { key: 'NODE_ENV', value: 'production', isSecret: false },
  { key: 'VITE_API_URL', value: '', isSecret: false },
  { key: 'REACT_APP_API_URL', value: '', isSecret: false },
  { key: 'VITE_CLERK_PUBLISHABLE_KEY', value: '', isSecret: true },
  { key: 'CLERK_SECRET_KEY', value: '', isSecret: true },
  { key: 'SENTRY_DSN', value: '', isSecret: true },
  { key: 'VITE_WEB3_NETWORK', value: 'mainnet', isSecret: false },
  { key: 'VITE_TOKEN_DISTRIBUTOR_ADDRESS', value: '', isSecret: false },
  { key: 'NETLIFY_AUTH_TOKEN', value: '', isSecret: true },
  { key: 'NETLIFY_SITE_ID', value: '', isSecret: true },
  { key: 'CORS_ORIGIN', value: '', isSecret: false },
  { key: 'MONGODB_URI', value: '', isSecret: true }
];

export default function EnvironmentManager() {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSecrets, setShowSecrets] = useState({});
  const [newVariable, setNewVariable] = useState({ key: '', value: '', isSecret: false });
  const [environment, setEnvironment] = useState('production');

  useEffect(() => {
    fetchEnvironmentVariables();
  }, [environment]);

  const initializeDefaultVariables = async () => {
    try {
      const existingVars = await fetchEnvironmentVariables();
      const missingVars = defaultEnvironmentVariables.filter(
        defaultVar => !existingVars.some(existing => existing.key === defaultVar.key)
      );

      if (missingVars.length > 0) {
        for (const variable of missingVars) {
          await handleAddVariable(variable);
        }
        await fetchEnvironmentVariables();
      }
    } catch (error) {
      toast.error('Failed to initialize default variables');
    }
  };

  const handleEnvironmentChange = async (newEnvironment) => {
    setEnvironment(newEnvironment);
    await fetchEnvironmentVariables();
  };

  const validateVariable = (variable) => {
    const validations = {
      NODE_VERSION: (value) => /^\d+$/.test(value),
      NODE_ENV: (value) => ['development', 'production', 'staging'].includes(value),
      VITE_API_URL: (value) => /^https?:\/\/.+/.test(value),
      VITE_WEB3_NETWORK: (value) => ['mainnet', 'testnet'].includes(value),
      MONGODB_URI: (value) => value.startsWith('mongodb'),
      VITE_TOKEN_DISTRIBUTOR_ADDRESS: (value) => /^0x[a-fA-F0-9]{40}$/.test(value)
    };

    const validator = validations[variable.key];
    if (validator && !validator(variable.value)) {
      throw new Error(`Invalid value for ${variable.key}`);
    }
  };

  const fetchEnvironmentVariables = async () => {
    try {
      const response = await fetch(`/api/admin/environment?environment=${environment}`);
      const data = await response.json();
      setVariables(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch environment variables');
      setLoading(false);
    }
  };

  const handleAddVariable = async (variable = newVariable) => {
    try {
      validateVariable(variable);
      
      const response = await fetch('/api/admin/environment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...variable, environment })
      });

      if (!response.ok) throw new Error('Failed to add variable');

      toast.success('Environment variable added successfully');
      await fetchEnvironmentVariables();
      setNewVariable({ key: '', value: '', isSecret: false });
    } catch (error) {
      toast.error(error.message || 'Failed to add environment variable');
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
          <select
            value={environment}
            onChange={(e) => handleEnvironmentChange(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
          <button
            onClick={initializeDefaultVariables}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Initialize Default Variables
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
