import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import EditVehicleModal from "../components/EditVehicleModal";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [owners, setOwners] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);


  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchAll = async () => {
    try {
      const [vehiclesRes, categoriesRes, ownersRes] = await Promise.all([
        axios.get("/api/vehicles"),
        axios.get("/api/categories"),
        axios.get("/api/customers")
      ]);
      setVehicles(vehiclesRes.data);
      setCategories(categoriesRes.data);
      setOwners(ownersRes.data);
    } catch (err) {
      setError("❌ Error fetching data: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const confirmDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/vehicles/${vehicleToDelete._id}`);
      setVehicles(prev => prev.filter(v => v._id !== vehicleToDelete._id));
      setConfirmVisible(false);
      setVehicleToDelete(null);
      toast.success("Vehicle deleted successfully!");
    } catch (err) {
      alert("❌ Failed to delete vehicle: " + (err.response?.data?.message || err.message));
    }
  };


  const handleUpdate = async (updatedVehicle) => {
    try {
      const res = await axios.put(`/api/vehicles/${updatedVehicle._id}`, updatedVehicle);
      const updated = res.data;

      const owner = owners.find(o => o._id === updated.ownerId);
      const category = categories.find(c => c._id === updated.categoryId);

      updated.ownerId = owner;
      updated.categoryId = category;

      setVehicles(prev =>
        prev.map(v => (v._id === updated._id ? updated : v))
      );

      setShowEditModal(false);
      toast.success("Vehicle updated successfully!");
    } catch (err) {
      alert("❌ Failed to update vehicle: " + (err.response?.data?.message || err.message));
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10">🚗 Vehicles List</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">👋 Welcome, {auth?.user?.username}</p>
        <div className="flex gap-4">
          <button onClick={() => navigate("/vehicles/new")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Vehicle</button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          <button onClick={() => navigate("/maintenance")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"> 🛠️ Maintenance </button>
          <button onClick={() => navigate('/invoices')} className="bg-purple-500 text-white px-4 py-2 rounded" > 📄 Invoices </button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {vehicles.map((vehicle) => {
          const isOpen = expandedId === vehicle._id;
          const owner = vehicle.ownerId;
          const category = vehicle.categoryId;

          return (
            <li
              key={vehicle._id}
              className="bg-white border rounded shadow-lg transition-transform transform hover:scale-[1.018] hover:shadow-lg">
              <button
                onClick={() => toggleExpand(vehicle._id)}
                className="w-full text-left flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
              >
                <div className="font-semibold text-lg flex items-center gap-2">
                  {isOpen ? "➖" : "➕"} 🚘 {vehicle.brand} – {vehicle.model}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 pt-2 overflow-hidden text-sm text-gray-700"
                  >
                    <p className="mb-1"><span className="font-medium">🆔 Plate:</span> {vehicle.plateNumber}</p>
                    <p className="mb-1"><span className="font-medium">📅 Year:</span> {vehicle.year}</p>
                    <p className="mb-1"><span className="font-medium">👤 Owner:</span> {owner?.firstName} {owner?.lastName}</p>
                    <p className="mb-3"><span className="font-medium">📁 Category:</span> {category?.name}</p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingVehicle(vehicle);
                          setShowEditModal(true);
                        }}
                        className="bg-yellow-400 text-black px-3 py-1 rounded flex items-center gap-1 hover:bg-yellow-500"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(vehicle)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Edit Modal */}
      <EditVehicleModal
        visible={showEditModal}
        vehicle={editingVehicle}
        categories={categories}
        owners={owners}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
      {/* Confirm Modal */}
      <ConfirmModal
        visible={confirmVisible}
        title="Delete Vehicle"
        message={`Are you sure you want to delete ${vehicleToDelete?.brand} ${vehicleToDelete?.model}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmVisible(false);
          setVehicleToDelete(null);
        }}
      />

    </div>
  );
}
