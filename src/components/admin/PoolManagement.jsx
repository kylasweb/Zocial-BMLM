import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

export default function PoolManagement() {
  const [pools, setPools] = useState([]);
  const [newPool, setNewPool] = useState({
    name: '',
    type: 'standard',
    capacity: '',
    overflowPool: '',
    requirements: {
      minInvestment: '',
      minTeamSize: '',
      rank: ''
    }
  });

  useEffect(() => {
    loadPools();
  }, []);

  const loadPools = async () => {
    try {
      const response = await apiService.getPools();
      setPools(response.data);
    } catch (error) {
      toast.error('Failed to load pools');
    }
  };

  const handleCreatePool = async (e) => {
    e.preventDefault();
    try {
      await apiService.createPool(newPool);
      toast.success('Pool created successfully');
      loadPools();
      setNewPool({
        name: '',
        type: 'standard',
        capacity: '',
        overflowPool: '',
        requirements: {
          minInvestment: '',
          minTeamSize: '',
          rank: ''
        }
      });
    } catch (error) {
      toast.error('Failed to create pool');
    }
  };

  const handleUpdatePool = async (poolId, updates) => {
    try {
      await apiService.updatePool(poolId, updates);
      toast.success('Pool updated successfully');
      loadPools();
    } catch (error) {
      toast.error('Failed to update pool');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Pool</h2>
        <form onSubmit={handleCreatePool} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Pool Name"
              value={newPool.name}
              onChange={(e) => setNewPool({...newPool, name: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <select
              value={newPool.type}
              onChange={(e) => setNewPool({...newPool, type: e.target.value})}
              className="border p-2 rounded"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="elite">Elite</option>
            </select>
            <input
              type="number"
              placeholder="Capacity"
              value={newPool.capacity}
              onChange={(e) => setNewPool({...newPool, capacity: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <select
              value={newPool.overflowPool}
              onChange={(e) => setNewPool({...newPool, overflowPool: e.target.value})}
              className="border p-2 rounded"
            >
              <option value="">Select Overflow Pool</option>
              {pools.map(pool => (
                <option key={pool.id} value={pool.id}>{pool.name}</option>
              ))}
            </select>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Min Investment"
                value={newPool.requirements.minInvestment}
                onChange={(e) => setNewPool({
                  ...newPool,
                  requirements: {
                    ...newPool.requirements,
                    minInvestment: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Min Team Size"
                value={newPool.requirements.minTeamSize}
                onChange={(e) => setNewPool({
                  ...newPool,
                  requirements: {
                    ...newPool.requirements,
                    minTeamSize: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Required Rank"
                value={newPool.requirements.rank}
                onChange={(e) => setNewPool({
                  ...newPool,
                  requirements: {
                    ...newPool.requirements,
                    rank: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Pool
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Active Pools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pools.map(pool => (
            <div key={pool.id} className="border p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{pool.name}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  pool.type === 'premium' ? 'bg-yellow-200' :
                  pool.type === 'elite' ? 'bg-purple-200' :
                  'bg-gray-200'
                }`}>
                  {pool.type}
                </span>
              </div>
              
              <div className="space-y-2">
                <p>Capacity: {pool.capacity}</p>
                <p>Current Members: {pool.currentMembers}</p>
                <p>Overflow Pool: {pool.overflowPool || 'None'}</p>
                
                <div className="mt-4">
                  <h4 className="font-semibold">Requirements:</h4>
                  <ul className="list-disc list-inside">
                    <li>Min Investment: ${pool.requirements.minInvestment}</li>
                    <li>Min Team Size: {pool.requirements.minTeamSize}</li>
                    <li>Required Rank: {pool.requirements.rank}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleUpdatePool(pool.id, { active: !pool.active })}
                  className={`${
                    pool.active ? 'bg-red-500' : 'bg-green-500'
                  } text-white px-3 py-1 rounded`}
                >
                  {pool.active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEditPool(pool.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}