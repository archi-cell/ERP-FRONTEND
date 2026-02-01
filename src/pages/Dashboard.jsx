import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get("/dashboard").then(res => setStats(res.data));
    }, []);

    if (!stats) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <div style={{ padding: 40 }}>
                <h2>ERP Dashboard</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
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
        <div style={{
            border: "1px solid #ccc",
            padding: 20,
            borderRadius: 8,
            textAlign: "center"
        }}>
            <h4>{title}</h4>
            <h2>{value}</h2>
        </div>
    );
}
