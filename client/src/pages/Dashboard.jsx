import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded border">
          <h2 className="text-xl font-semibold mb-2">User Profile</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> <span className="uppercase text-blue-600 font-bold">{user.role}</span></p>
          <p><strong>ID:</strong> {user._id}</p>
        </div>
        
        {user.role === 'admin' && (
          
           <><button
            onClick={() => navigate('/admin')}
            className="mt-6  mr-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Go to Admin Panel
          </button><button
            onClick={() => navigate('/customers')}
            className="mt-4 mr-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
              Manage Customers (CRM)
            </button></>
           
        )}
      </div>
    </div>
  );
};

export default Dashboard;