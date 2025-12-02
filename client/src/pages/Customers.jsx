import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', status: 'New' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch customers on load
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await API.get('/customers');
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/customers', form);
      setForm({ name: '', email: '', phone: '', company: '', status: 'New' }); // Reset form
      fetchCustomers(); // Refresh list
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding customer');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">CRM - Customer List</h1>
          <button onClick={() => navigate('/dashboard')} className="text-blue-500 hover:underline">Back to Dashboard</button>
        </div>

        {/* Input Form */}
        <div className="bg-white p-6 shadow rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
            <input className="border p-2 rounded" placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            <select className="border p-2 rounded" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>New</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="bg-blue-600 text-white p-2 rounded col-span-1 lg:col-span-5 hover:bg-blue-700">Add Customer</button>
          </form>
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust._id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-5 text-sm">{cust.name}</td>
                  <td className="px-5 py-5 text-sm">{cust.email}</td>
                  <td className="px-5 py-5 text-sm">{cust.company}</td>
                  <td className="px-5 py-5 text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${cust.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <button onClick={() => handleDelete(cust._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;