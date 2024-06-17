import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

const ApplicationCard = ({companyName, dateApplied, status, role, notes}) => {

  return (
    <div className = "application-card">
      <h3>{companyName}</h3>
      <p>{dateApplied}</p>
      <p>{status}</p>
      <p>{role}</p>
      <p>{notes}</p>
    </div>
  )
}
export default ApplicationCard;