import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiWallet, FiActivity, FiUsers, FiAward, FiMessageSquare, FiTarget } from 'react-icons/fi';
import WalletModule from './wallet/WalletModule';
import TransactionHistory from './wallet/TransactionHistory';
import TeamOverview from './team/TeamOverview';
import RewardsHub from './rewards/RewardsHub';
import TaskManager from './tasks/TaskManager';
import SupportHub from './support/SupportHub';
import GamificationCenter from './gamification/GamificationCenter';

export default function UserDashboard() {
  const [activeModule, setActiveModule] = useState('wallet');

  const modules = {
    wallet: {
      component: WalletModule,
      icon: FiWallet,
      label: "Finance Hub",
      features: {
        balance: true,
        deposit: true,
        withdraw: true,
        transfer: true,
        history: true,
        epin: true
      }
    },
    transactions: {
      component: TransactionHistory,
      icon: FiActivity,
      label: "Transactions",
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
      icon: FiUsers,
      label: "Team Hub",
      features: {
        directReferrals: true,
        binaryTree: true,
        teamStats: true,
        communication: true
      }
    },
    tasks: {
      component: TaskManager,
      icon: FiTarget,
      label: "Tasks",
      features: {
        daily: true,
        achievements: true,
        progress: true
      }
    },
    rewards: {
      component: RewardsHub,
      icon: FiAward,
      label: "Rewards",
      features: {
        achievements: true,
        badges: true,
        leaderboard: true,
        gamification: true
      }
    },
    support: {
      component: SupportHub,
      icon: FiMessageSquare,
      label: "Support",
      features: {
        tickets: true,
        faq: true,
        liveChat: true
      }
    }
  };

  const CurrentModule = modules[activeModule].component;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(modules).map(([key, { icon: Icon, label }]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${
              activeModule === key ? 'bg-primary-600 text-white' : 'bg-white'
            }`}
            onClick={() => setActiveModule(key)}
          >
            <Icon className="text-2xl" />
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <CurrentModule />
      </div>
    </div>
  );
}
