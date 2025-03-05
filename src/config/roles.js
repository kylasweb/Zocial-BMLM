export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  LEADER: 'leader',
  USER: 'user'
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    '*', // Wildcard for all permissions
    'manage_admins',
    'manage_system_config',
    'access_all_data',
    ...Object.values(ROLES).flatMap(role => 
      ROLE_PERMISSIONS[role] || []
    )
  ],
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
    'access_admin_tools',
    'access_stealth_monitoring',
    'access_system_optimization',
    'access_predictive_analytics',
    'manage_tax_compliance'
  ],
  [ROLES.LEADER]: [
    'view_team',
    'manage_team',
    'view_finance',
    'manage_tasks',
    'access_rewards',
    'access_support',
    'access_advanced_team_analytics',
    'create_custom_reports',
    'view_engagement_metrics'
  ],
  [ROLES.USER]: [
    'view_profile',
    'manage_profile',
    'view_network',
    'view_finance',
    'access_rewards',
    'access_support',
    'customize_dashboard',
    'view_3d_matrix',
    'access_advanced_gamification'
  ]
};

export const SUPER_ADMIN_CREDENTIALS = {
  email: 'kailaspnair@yahoo.com',
  password: '@Cargo123#'
};
