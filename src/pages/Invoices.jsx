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

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">Invoices</h2>
                </div>

                <div className="card">
                    <div className="form-group">
                        <label>Select Sales Order</label>
                        <select
                            value={selectedOrder}
                            onChange={e => setSelectedOrder(e.target.value)}
                        >
                            <option value="">Select Sales Order</option>
                            {salesOrders.map(so => (
                                <option key={so._id} value={so._id}>
                                    {so.customer?.name} — {so.products.length} item(s)
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="btn primary" onClick={generateInvoice}>
                        Generate Invoice
                    </button>
                </div>

                <div className="card">
                    <h4 className="page-title" style={{ fontSize: "18px" }}>
                        Generated Invoices
                    </h4>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => (
                                <tr key={inv._id}>
                                    <td>#{inv._id.slice(-5)}</td>
                                    <td>{inv.customer?.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
