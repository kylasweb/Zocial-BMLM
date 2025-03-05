import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiWallet, FiActivity, FiUsers, FiAward } from 'react-icons/fi';
import WalletModule from './wallet/WalletModule';
import TransactionHistory from './wallet/TransactionHistory';
import TeamOverview from './team/TeamOverview';
import RewardsHub from './rewards/RewardsHub';

export default function UserDashboard() {
  const [activeModule, setActiveModule] = useState('wallet');

  const modules = {
    wallet: {
      component: WalletModule,
      features: {
        balance: true,
        deposit: true,
        withdraw: true,
        transfer: true,
        history: true
      }
    },
    transactions: {
      component: TransactionHistory,
      features: {
        all: true,
        deposits: true,
        withdrawals: true,
        commissions: true,
        rewards: true,
        filters: true
      }
    },
    team: {
      component: TeamOverview,
      features: {
        directReferrals: true,
        binaryTree: true,
        teamStats: true
      }
    },
    rewards: {
      component: RewardsHub,
      features: {
        achievements: true,
        badges: true,
        leaderboard: true
      }
    }
  };

  const CurrentModule = modules[activeModule].component;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(modules).map(([key, module]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg cursor-pointer ${
              activeModule === key ? 'bg-primary-600 text-white' : 'bg-white'
            }`}
            onClick={() => setActiveModule(key)}
          >
            {/* Module selection cards */}
          </motion.div>
        ))}
      </div>
      
      <CurrentModule features={modules[activeModule].features} />
    </div>
  );
}