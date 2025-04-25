import React, { useState, useEffect } from 'react';
import './StudentList.css';
import Axios from 'axios';
import SearchComponent from './SearchComponent';

const URL = process.env.REACT_APP_SERVER_URL;

function StudentList({ studentList, attendanceData, handleAttendanceChange, isLoggedIn}) {
  const [searchResults, setSearchResults] = useState([]);
  const [defaultAttendanceData, setDefaultAttendanceData] = useState({});
  const [updateMessage, setUpdateMessage] = useState('');

  // Set all students as absent by default when studentList changes
  useEffect(() => {
    const defaultData = {};
    studentList.forEach((student) => {
      defaultData[student._id] = 'absent';
    });
    setDefaultAttendanceData(defaultData);
  }, [studentList]);

  // Apply default attendance data when attendanceData changes
  useEffect(() => {
    setDefaultAttendanceData((prevDefaultData) => ({
      ...prevDefaultData,
      ...attendanceData,
    }));
  }, [attendanceData]);

  // ✅ Show the full student list when it loads
  useEffect(() => {
    setSearchResults(studentList);
  }, [studentList]);

  const handleUpdateAttendance = () => {
    const defaultAttendanceArray = Object.keys(defaultAttendanceData).map((studentId) => ({
      studentId,
      attendance: 'absent',
    }));

    const combinedAttendanceArray = [
      ...defaultAttendanceArray,
      ...Object.entries(attendanceData).map(([studentId, attendance]) => ({
        studentId,
        attendance,
      }))
    ];

    const resultMap = new Map();
    for (let i = combinedAttendanceArray.length - 1; i >= 0; i--) {
      const item = combinedAttendanceArray[i];
      if (!resultMap.has(item.studentId)) {
        resultMap.set(item.studentId, item);
      }
    }

    const uniqueLastOccurrenceList = Array.from(resultMap.values());

    Axios.post(`${URL}/attendance`, { attendanceData: uniqueLastOccurrenceList })
      .then(() => {
        console.log('Attendance recorded successfully');
        setUpdateMessage('Attendance has been updated successfully!');
        setTimeout(() => setUpdateMessage(''), 3000);
      })
      .catch((error) => {
        console.error('Error recording attendance:', error);
        setUpdateMessage('Failed to update attendance. Please try again.');
        setTimeout(() => setUpdateMessage(''), 3000);
      });
  };

  const [downloadDate, setDownloadDate] = useState('');

  const handleInputChange = (event) => {
    setDownloadDate(event.target.value);
  };

  const handleDownloadToday = () => {
    Axios.get(`${URL}/attendanceToday/${downloadDate}`, {
      responseType: 'arraybuffer',
    })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // ✅ Update search results when a search is performed
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    !isLoggedIn ? (
      <div className="StudentList">
        <p className="not-logged-in-message"> Please log in to view the student list and manage attendance.</p>
      </div>
    ) :
    <div className="StudentList">
      <label>Search by student name:</label>
      <SearchComponent
        data={studentList}
        searchKey="Name"
        setSearchResults={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Register Number</th>
            <th style={{ textAlign: 'center' }}>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((student) => (
            <tr key={student._id}>
              <td>{student.Name}</td>
              <td>{student.Register_number}</td>
              <td>
                <div className="attendance-container">
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student._id}`}
                      value="present"
                      checked={defaultAttendanceData[student._id] === 'present'}
                      onChange={() =>
                        handleAttendanceChange(student._id, 'present')
                      }
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student._id}`}
                      value="absent"
                      checked={defaultAttendanceData[student._id] === 'absent'}
                      onChange={() =>
                        handleAttendanceChange(student._id, 'absent')
                      }
                    />
                    Absent
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="UpdateButton" onClick={handleUpdateAttendance}>
        Update
      </button>

      {updateMessage && <p className="update-message extra-styling">{updateMessage}</p>}

      <label>Enter the Date for downloading the specific date's attendance</label>
      <input type="text" value={downloadDate} onChange={handleInputChange} placeholder='enter date (yyyy-mm-dd)' />
      <button className="downloadTodayAttendance" onClick={handleDownloadToday}>Download</button>
    </div>
  );
}

export default StudentList;
