import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import ProtectedRoute from "./components/ProtectedRoute";
import MaintenanceList from "./pages/MaintenanceList";
import InvoiceList from './pages/invoices/InvoiceList';
import AddBill from './pages/invoices/AddBill';
import EditBill from './pages/invoices/EditBill';
import InvoicesPage from './pages/invoices/InvoicesPage';
import EditMaintenance from "./pages/EditMaintenance";
import ArchivedInvoices from "./pages/invoices/ArchivedInvoices";

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
      <Route
        path="/InvoicesPage"
        element={
          <ProtectedRoute>
            <InvoicesPage />
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
      <Route
        path="/edit-maintenance/:id"
        element={
          <ProtectedRoute>
            <EditMaintenance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoices/archived"
        element={
          <ProtectedRoute>
            <ArchivedInvoices />
          </ProtectedRoute>
        }
      />
    </Routes>


  );
}

export default App;
