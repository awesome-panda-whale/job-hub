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
    <div>
      {/* Job Application Form Component */}
    {/* <JobApplicationForm onSubmit={handleAddApplication} /> */}

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
  </div>
  );
};
export default ApplicationCard;