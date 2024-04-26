// SettingsPage.tsx
import React, { useState } from 'react';

type UserInfo = {
  name: string;
  email: string;
  password: string; // In a real application, handle passwords more securely
};

const initialUserInfo: UserInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123', // Reminder: Just for demonstration
};

function SettingsPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveChanges = () => {
    // In a real app, save changes to a server
    alert('Changes saved');
    toggleEditMode();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <p>{userInfo.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <p>{userInfo.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password:</label>
        {editMode ? (
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <p>********</p>
        )}
      </div>
      <button
        onClick={editMode ? saveChanges : toggleEditMode}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
      >
        {editMode ? 'Save Changes' : 'Edit'}
      </button>
    </div>
  );
}

export default SettingsPage;
