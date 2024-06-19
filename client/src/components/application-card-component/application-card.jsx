import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// Import User's Job Application Form Input
// import JobApplicationForm from './JobApplicationForm';


const ApplicationCard = ({companyName, dateApplied, status, position, compContInfo, notes}) => {

  const [applications, setApplications] = useState([]);

  const handleAddApplication = (newApplication) => {
    setApplications([...applications, newApplication]);
  };

  return (
    // <div className = "application-card">
    //   <h3>{companyName}</h3>
    //   <p>Date Applied: {dateApplied}</p>
    //   <p>Status: {status}</p>
    //   <p>Role: {role}</p>
    //   <p>Notes: {notes}</p>
    // <div>

    <div className="applications-list">
      {applications.map((app, index) => (
        <ApplicationCard
          key={index}
          companyName={app.companyName}
          dateApplied={app.dateApplied}
          status={app.status}
          position={app.position}
          compContInfo={app.compContInfo}
          notes={app.notes}
        />
      ))}
    </div>
  );
};
export default ApplicationCard;