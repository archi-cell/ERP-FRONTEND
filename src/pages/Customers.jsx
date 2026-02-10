import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get("/dashboard").then(res => setStats(res.data));
    }, []);

    if (!stats) return <p className="page">Loading...</p>;

    return (
        <>
            <Navbar />

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">ERP Dashboard</h2>
                </div>

                <div className="dashboard-grid">
                    <Card title="Products" value={stats.products} />
                    <Card title="Customers" value={stats.customers} />
                    <Card title="Suppliers" value={stats.suppliers} />
                    <Card title="Sales Orders" value={stats.salesOrders} />
                    <Card title="Purchase Orders" value={stats.purchaseOrders} />
                    <Card title="Inventory Items" value={stats.inventoryItems} />
                    <Card title="Invoices" value={stats.invoices} />
                </div>
            </div>
        </>
    );
}

function Card({ title, value }) {
    return (
        <div className="dashboard-card">
            <h4>{title}</h4>
            <span>{value}</span>
        </div>
    );
}
