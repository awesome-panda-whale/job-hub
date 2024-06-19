import React, { useEffect, useState} from 'react';
import ApplicationCard from '../application-card-component/application-card';

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);

    useEffect(() =>{
      const fetchApplications = async () => {
        try {
          //replace userId with actual ID from authentication or context
          const userId = 2;
          const response = await fetch(`http://localhost:3000/applications/${userId}`);
          const data = await response.json();
          setApplications(data);
        } catch(err) {
          console.error('Error fetching applications:', err);
        }
      };
      
      fetchApplications();
    }, []);  
  return (
    <div className='application-list' id="application_list" >
      {applications.map((app) => (
         <ApplicationCard
        key={app.id}
        companyName={app.company}
        dateApplied={new Date(app.date_applied).toLocaleDateString()}
        status={app.status_id}
        role={app.position}
        notes={app.notes}
        />
      ))}
    </div>
  );
}
