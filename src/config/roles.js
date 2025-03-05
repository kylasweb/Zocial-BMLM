export const ROLES = {
  ADMIN: 'admin',
  LEADER: 'leader',
  USER: 'user'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    'manage_users',
    'manage_finance',
    'manage_crm',
    'manage_rewards',
    'manage_commissions',
    'manage_investment_plans',
    'manage_pools',
    'manage_ranks',
    'manage_tasks',
    'manage_frontend',
    'manage_tokens',
    'access_admin_tools'
  ],
  [ROLES.LEADER]: [
    'view_team',
    'manage_team',
    'view_finance',
    'manage_tasks',
    'access_rewards',
    'access_support'
  ],
  [ROLES.USER]: [
    'view_profile',
    'manage_profile',
    'view_network',
    'view_finance',
    'access_rewards',
    'access_support'
  ]
};