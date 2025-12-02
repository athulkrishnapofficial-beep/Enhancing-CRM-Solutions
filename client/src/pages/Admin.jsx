import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data } = await API.get('/admin'); 
        setMessage(data.message);
      } catch (err) {
        alert('Access Denied: You are not an Admin');
        navigate('/dashboard');
      }
    };
    fetchAdminData();
  }, [navigate]);

  return (
    <div className="p-8 bg-sky-400 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded border border-red-200">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Admin Panel </h1>
        <p className="text-lg">{message}</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-500 underline"
        >
          Back to Dashboard
        </button>

      </div>
      <video
          src="https://cdn.pixabay.com/video/2023/03/27/156277-812085336_large.mp4"
          autoPlay
          loop
          muted
          className="w-100 h-100 mx-auto mb-4 rounded"
        ></video>

    </div>
  );
};

export default Admin;