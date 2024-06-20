import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import "./styleCSS/application.css";

const Application = () => {
  const { userId } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState(""); 
  const [statuses, setStatuses] = useState([
    // { id: 1, status: "Need to Apply" },
    // { id: 2, status: "Applied" },
    // { id: 3, status: "Phone Interview" },
    // { id: 4, status: "Online Assessment" },
    // { id: 5, status: "Initial Interview" },
    // { id: 6, status: "Second Interview" },
    // { id: 7, status: "Third Interview" },
    // { id: 8, status: "Technical Interview" },
    // { id: 9, status: "Behavioral Interview" },
    // { id: 10, status: "Final Interview" },
    // { id: 11, status: "Have not heard back" },
    // { id: 12, status: "Considering" },
    // { id: 13, status: "Offer" },
    // { id: 14, status: "Rejected" },
    // { id: 15, status: "Ghost" },
    // { id: 16, status: "Other" },
    // { id: 17, status: "STOP" },
  ]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/application/${userId}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        console.error("Invalid response data:", data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3000/statuses`);
        const result = await response.json();
        console.log("result", result);
        setStatuses(result);
      }

      fetchData();
    } catch(err) {
      setError("Couldn't fetch statuses");
    }
  }, [])
  
  useEffect(() => {
    fetchApplications();
  }, [userId]);

  const handleStatusChange = (applicationId, newStatusId) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === applicationId
          ? { ...application, status_id: newStatusId }
          : application
      )
    );
  };

  const handleNotesChange = (applicationId, newNotes) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === applicationId
          ? { ...application, notes: newNotes }
          : application
      )
    );
  };

  const [editing, setEditing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/application/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applications),
        }
      );

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      } else {
        setMessage("Update Successfully!");
      }

      setEditing(false);
    } catch (error) {
      console.error("Error updating applications:", error);
    }
  };

  return (
    <div className="application-container">
      <div className="application-header">
        <h1>Applications</h1>
        <span>{applications.length}</span>
      </div>
      <table className="application-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>URL</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.company}</td>
              <td>{application.position}</td>
              <td>
                <a
                  href={application.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {application.url}
                </a>
              </td>
              <td>{formatDate(application.date_applied)}</td>
              <td>
                <select
                  value={application.status_id}
                  onChange={(e) =>
                    handleStatusChange(application.id, parseInt(e.target.value))
                  }
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{application.contact}</td>
              <td>{application.email}</td>
              <td>
                <textarea
                  value={application.notes}
                  onChange={(e) =>
                    handleNotesChange(application.id, e.target.value)
                  }
                ></textarea>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button onClick={handleSave}>Save</button>
      </div>
      <div className={message !== '' ? 'message-box': 'hidden'}>
        {message}
      </div>
    </div>
  );
};

export default Application;
