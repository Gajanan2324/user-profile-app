import React, { useEffect, useState } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=5&seed=abc") // Fetch 5 users
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const nextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const prevUser = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? users.length - 1 : prevIndex - 1
    );
  };

  if (users.length === 0) {
    return <div className="loading">Fetching Users...</div>;
  }

  const user = users[currentIndex];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={user.picture.large} alt="User" />
        </div>
        <div className="profile-info">
          <h2>{user.name.first} {user.name.last}</h2>
          <p className="role">{user.location.city}, {user.location.country}</p>
          <div className="details">
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Birthdate:</strong> {new Date(user.dob.date).toLocaleDateString()}</p>
          </div>
          <div className="buttons">
            <button onClick={prevUser}>&larr; Previous</button>
            <button onClick={nextUser}>Next &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
