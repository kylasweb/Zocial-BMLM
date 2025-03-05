export const securityConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  },
  
  ddosProtection: {
    blacklist: [], // IP blacklist
    whitelist: [], // IP whitelist
    threshold: 1000, // requests per minute threshold
    banTime: 24 * 60 * 60 * 1000 // 24 hours
  },

  smartContractAudit: {
    automaticAuditInterval: 7 * 24 * 60 * 60 * 1000, // 7 days
    criticalFunctions: [
      'transfer',
      'mint',
      'burn',
      'updateConfig'
    ],
    auditReportPath: '/audit-reports/'
  },

  backupConfig: {
    database: {
      interval: 24 * 60 * 60 * 1000, // 24 hours
      retention: 30, // days
      path: '/backups/db/'
    },
    smartContract: {
      interval: 12 * 60 * 60 * 1000, // 12 hours
      retention: 90, // days
      path: '/backups/contracts/'
    },
    config: {
      interval: 7 * 24 * 60 * 60 * 1000, // 7 days
      retention: 60, // days
      path: '/backups/config/'
    }
  }
};