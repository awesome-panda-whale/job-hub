import React from 'react';

export default function SidebarBox({ boxHeader, lowerBox }) {
  return (
    <div className='sidebar-box'>
      <div className='box-header'>{boxHeader}</div>
      <div className='lower-box'>{lowerBox}</div>
    </div>
  );
}