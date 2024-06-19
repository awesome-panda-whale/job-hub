import React, { useState, useEffect, useContext } from 'react';
import SidebarBox from './sidebarBox';
import { AuthContext } from "../Contexts/AuthContext";

export default function Sidebar({ onApplicationUpdate: applicationUpdated }) {
  const { userId } = useContext(AuthContext);
  const [totalApplications, setTotalApplications] = useState(0);

  useEffect(() => {
    const fetchTotalApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/total-applications/${userId}`
        );
        const data = await response.json();
        setTotalApplications(data);
      } catch (error) {
        console.error("Error fetching total applications:", error);
      }
    };

    fetchTotalApplications();
  }, [userId, applicationUpdated]);


  return (
    <div className='sidebar-container'>
      <SidebarBox id = "interview-box" boxHeader='Next Interview: ' lowerBox='Wednesday 3 PM EST'/>
      <SidebarBox boxHeader='Total Applications: ' lowerBox={totalApplications} />
      {/* <SidebarBox boxHeader="Today's Applications: " lowerBox='5' /> */}
    </div>
  );
}
