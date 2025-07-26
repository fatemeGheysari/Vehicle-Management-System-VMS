import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import ProtectedRoute from "./components/ProtectedRoute";
import MaintenanceList from "./pages/MaintenanceList";

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
    </Routes>

  );
}

export default App;
