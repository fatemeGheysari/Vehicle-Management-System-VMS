// src/components/TopNav.jsx
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function TopNav() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // NOTE: Clear auth and go to login
        logout?.();
        navigate("/", { replace: true });
    };

    // NOTE: A simple, responsive top bar with Tailwind
    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Left: Brand */}
                <div
                    className="font-bold text-lg cursor-pointer select-none"
                    onClick={() => navigate("/dashboard")}
                    title="Go to Dashboard"
                >
                    VMS <span className="text-blue-600">Dashboard</span>
                </div>

                {/* Middle: Quick links */}
                <nav className="hidden sm:flex items-center gap-3 text-sm">
                    {/* NOTE: NavLink applies an active class automatically, we style it via a function */}
                    <AppLink to="/dashboard">Dashboard</AppLink>
                    <AppLink to="/vehicles">Vehicles</AppLink>
                    <AppLink to="/maintenance">Maintenance</AppLink>
                    <AppLink to="/invoices">Invoices</AppLink>
                </nav>

                {/* Right: User + Logout */}
                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-gray-600 text-sm">
                        {/* NOTE: Show username if available */}
                        {auth?.user?.username ? `Hi, ${auth.user.username}` : "Logged in"}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
                        title="Logout"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

/** Small helper to keep active link styles consistent */
function AppLink({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "px-3 py-1.5 rounded-lg hover:bg-gray-100 transition",
                    isActive ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-600",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}
