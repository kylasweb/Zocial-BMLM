import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, Typography, Tabs, Tab } from '@mui/material';
import ContactManager from './ContactManager';
import LeadTracker from './LeadTracker';
import ActivityLog from './ActivityLog';
import CrmMetrics from './CrmMetrics';
import IntegrationSettings from './IntegrationSettings';

export default function CrmDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const { contacts, leads, activities } = useSelector((state: RootState) => state.crm);

  const tabs = [
    { label: 'Overview', component: <CrmMetrics /> },
    { label: 'Contacts', component: <ContactManager contacts={contacts} /> },
    { label: 'Leads', component: <LeadTracker leads={leads} /> },
    { label: 'Activities', component: <ActivityLog activities={activities} /> },
    { label: 'Settings', component: <IntegrationSettings /> }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            CRM Integration
          </Typography>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {tabs[activeTab].component}
      </Grid>
    </Grid>
  );
}