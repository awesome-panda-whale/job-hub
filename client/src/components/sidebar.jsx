import React from 'react';
import SidebarBox from './sidebarBox';

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <SidebarBox id = "interview-box" boxHeader='Next Interview: ' lowerBox='Wednesday 3 PM EST'/>
      <SidebarBox boxHeader='Total Applications: ' lowerBox='105' />
      <SidebarBox boxHeader="Today's Applications: " lowerBox='5' />
    </div>
  );
}
