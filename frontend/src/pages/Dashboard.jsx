import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";

export default function Dashboard() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        vehicles: 0,
        maintenances: 0,
        invoices: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [vRes, mRes, bRes] = await Promise.all([
                    axios.get("/api/vehicles"),
                    axios.get("/api/maintenance"),
                    axios.get("/api/bills"),
                ]);

                setStats({
                    vehicles: vRes.data?.length || 0,
                    maintenances: mRes.data?.length || 0,
                    invoices: bRes.data?.length || 0,
                });
            } catch (err) {
                // NOTE: Fail silently for now; in step 2 we can add toast
                console.error("Dashboard stats error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-600 mt-1">
                            {auth?.user?.username ? `Welcome, ${auth.user.username}!` : "Welcome!"}
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                        {/* NOTE: We navigate to existing pages */}
                        <button
                            onClick={() => navigate("/vehicles")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            🚗 Vehicles
                        </button>
                        <button
                            onClick={() => navigate("/maintenance")}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            🛠️ Maintenance
                        </button>
                        <button
                            onClick={() => navigate("/invoices")}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                        >
                            📄 Invoices
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <StatCard
                        title="Vehicles"
                        value={stats.vehicles}
                        subtitle="Total registered"
                        icon="🚘"
                        loading={loading}
                        color="from-blue-500 to-blue-600"
                    />
                    <StatCard
                        title="Maintenance"
                        value={stats.maintenances}
                        subtitle="All records"
                        icon="🛠️"
                        loading={loading}
                        color="from-green-500 to-green-600"
                    />
                    <StatCard
                        title="Invoices"
                        value={stats.invoices}
                        subtitle="Active (not archived)"
                        icon="🧾"
                        loading={loading}
                        color="from-purple-500 to-purple-600"
                    />
                </div>

                {/* Recent Section (placeholder) */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white border rounded-xl p-4 shadow-sm"
                    >
                        <h2 className="font-semibold text-lg mb-3">Recent Maintenance</h2>
                        {/* NOTE: Keep it simple for now */}
                        <p className="text-gray-500 text-sm">
                            Recent items will appear here. We will populate this in a next step.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 }}
                        className="bg-white border rounded-xl p-4 shadow-sm"
                    >
                        <h2 className="font-semibold text-lg mb-3">Recent Invoices</h2>
                        <p className="text-gray-500 text-sm">
                            Recent items will appear here. We will populate this in a next step.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/* ----------------------------------------------
 * Small, reusable Stat Card component
 * ---------------------------------------------- */
function StatCard({ title, value, subtitle, icon, loading, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border shadow-sm overflow-hidden"
        >
            <div className={`h-2 bg-gradient-to-r ${color}`} />
            <div className="p-5">
                <div className="flex items-center justify-between">
                    <div className="text-2xl">{icon}</div>
                    <div className="text-xs text-gray-500">{subtitle}</div>
                </div>
                <h3 className="mt-3 text-gray-700 font-semibold">{title}</h3>
                <div className="mt-1">
                    {loading ? (
                        // NOTE: Simple skeleton shimmer
                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                    ) : (
                        <p className="text-3xl font-bold">{value}</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
