import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

export default function RankManagement() {
  const [ranks, setRanks] = useState([]);
  const [newRank, setNewRank] = useState({
    name: '',
    level: '',
    requirements: {
      personalInvestment: '',
      teamInvestment: '',
      directReferrals: '',
      teamSize: '',
      activeMonths: ''
    },
    benefits: {
      directCommission: '',
      levelCommission: '',
      poolAccess: [],
      bonusRewards: ''
    }
  });

  useEffect(() => {
    loadRanks();
  }, []);

  const loadRanks = async () => {
    try {
      const response = await apiService.getRanks();
      setRanks(response.data);
    } catch (error) {
      toast.error('Failed to load ranks');
    }
  };

  const handleCreateRank = async (e) => {
    e.preventDefault();
    try {
      await apiService.createRank(newRank);
      toast.success('Rank created successfully');
      loadRanks();
      setNewRank({
        name: '',
        level: '',
        requirements: {
          personalInvestment: '',
          teamInvestment: '',
          directReferrals: '',
          teamSize: '',
          activeMonths: ''
        },
        benefits: {
          directCommission: '',
          levelCommission: '',
          poolAccess: [],
          bonusRewards: ''
        }
      });
    } catch (error) {
      toast.error('Failed to create rank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Rank</h2>
        <form onSubmit={handleCreateRank} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Rank Name"
              value={newRank.name}
              onChange={(e) => setNewRank({...newRank, name: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Rank Level"
              value={newRank.level}
              onChange={(e) => setNewRank({...newRank, level: e.target.value})}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Personal Investment"
                value={newRank.requirements.personalInvestment}
                onChange={(e) => setNewRank({
                  ...newRank,
                  requirements: {
                    ...newRank.requirements,
                    personalInvestment: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Team Investment"
                value={newRank.requirements.teamInvestment}
                onChange={(e) => setNewRank({
                  ...newRank,
                  requirements: {
                    ...newRank.requirements,
                    teamInvestment: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Direct Referrals"
                value={newRank.requirements.directReferrals}
                onChange={(e) => setNewRank({
                  ...newRank,
                  requirements: {
                    ...newRank.requirements,
                    directReferrals: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Team Size"
                value={newRank.requirements.teamSize}
                onChange={(e) => setNewRank({
                  ...newRank,
                  requirements: {
                    ...newRank.requirements,
                    teamSize: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Direct Commission %"
                value={newRank.benefits.directCommission}
                onChange={(e) => setNewRank({
                  ...newRank,
                  benefits: {
                    ...newRank.benefits,
                    directCommission: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Level Commission %"
                value={newRank.benefits.levelCommission}
                onChange={(e) => setNewRank({
                  ...newRank,
                  benefits: {
                    ...newRank.benefits,
                    levelCommission: e.target.value
                  }
                })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Bonus Rewards"
                value={newRank.benefits.bonusRewards}
                onChange={(e) => setNewRank({
                  ...newRank,
                  benefits: {
                    ...newRank.benefits,
                    bonusRewards: e.target.value
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
            Create Rank
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Active Ranks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ranks.map(rank => (
            <div key={rank.id} className="border p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{rank.name}</h3>
                <span className="px-2 py-1 rounded bg-blue-200 text-sm">
                  Level {rank.level}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Requirements:</h4>
                  <ul className="list-disc list-inside">
                    <li>Personal Investment: ${rank.requirements.personalInvestment}</li>
                    <li>Team Investment: ${rank.requirements.teamInvestment}</li>
                    <li>Direct Referrals: {rank.requirements.directReferrals}</li>
                    <li>Team Size: {rank.requirements.teamSize}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Benefits:</h4>
                  <ul className="list-disc list-inside">
                    <li>Direct Commission: {rank.benefits.directCommission}%</li>
                    <li>Level Commission: {rank.benefits.levelCommission}%</li>
                    <li>Bonus Rewards: {rank.benefits.bonusRewards}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEditRank(rank.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRank(rank.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}