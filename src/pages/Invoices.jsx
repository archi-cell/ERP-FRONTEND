import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Invoices() {
    const [salesOrders, setSalesOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("");

    useEffect(() => {
        api.get("/sales-orders").then(res => setSalesOrders(res.data));
        api.get("/invoices").then(res => setInvoices(res.data));
    }, []);

    const generateInvoice = async () => {
        if (!selectedOrder) {
            alert("Select sales order");
            return;
        }

        await api.post("/invoices", { salesOrder: selectedOrder });
        alert("Invoice generated");
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: 40 }}>
                <h2>Invoices</h2>

                <select onChange={e => setSelectedOrder(e.target.value)}>
                    <option value="">Select Sales Order</option>
                    {salesOrders.map(so => (
                        <option key={so._id} value={so._id}>
                            {so.customer?.name} — {so.products.length} item(s)
                        </option>
                    ))}
                </select>

                <br /><br />
                <button onClick={generateInvoice}>Generate Invoice</button>

                <hr />

                <h4>Generated Invoices</h4>
                <ul>
                    {invoices.map(inv => (
                        <li key={inv._id}>
                            Invoice #{inv._id.slice(-5)} — {inv.customer?.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
