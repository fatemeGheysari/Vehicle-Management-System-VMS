import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import ProtectedRoute from "./components/ProtectedRoute";
import MaintenanceList from "./pages/MaintenanceList";
import InvoiceList from './pages/InvoiceList';
import AddBill from './pages/AddBill';
import EditBill from './pages/EditBill';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <Vehicles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicles/new"
        element={
          <ProtectedRoute>
            <AddVehicle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/maintenance"
        element={
          <ProtectedRoute>
            <MaintenanceList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <InvoiceList />
          </ProtectedRoute>
        }
      />
      <Route path="/add-bill"
        element={
          <ProtectedRoute>
            <AddBill />
          </ProtectedRoute>}
      />
      <Route path="/edit-bill/:id"
        element={
          <ProtectedRoute>
            <EditBill />
          </ProtectedRoute>}
      />
    </Routes>

  );
}

export default App;
