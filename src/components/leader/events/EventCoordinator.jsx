import React from 'react';

export default function EventCoordinator() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Event & Meeting Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Event Planning</h3>
          <EventManager
            features={{
              createEvents: true,
              scheduleWebinars: true,
              manageAttendees: true,
              trackParticipation: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Meeting Coordination</h3>
          <MeetingManager
            settings={{
              scheduleTeamMeetings: true,
              oneOnOneSessions: true,
              virtualMeetingTools: true,
              attendanceTracking: true
            }}
          />
        </div>
      </div>
    </div>
  );
}