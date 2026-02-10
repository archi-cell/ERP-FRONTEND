import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function SalesOrders() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [customer, setCustomer] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        api.get("/customers").then(res => setCustomers(res.data));
        api.get("/products").then(res => setProducts(res.data));
        api.get("/sales-orders").then(res => setOrders(res.data));
    }, []);

    const createOrder = async () => {
        if (!customer || !product) {
            alert("Select customer & product");
            return;
        }

        await api.post("/sales-orders", {
            customer,
            products: [{ product, quantity }]
        });

        alert("Sales order created");
    };

    return (
        <>
            <Navbar />

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">Sales Orders</h2>
                </div>

                <div className="card">
                    <div className="form-group">
                        <label>Customer</label>
                        <select
                            value={customer}
                            onChange={e => setCustomer(e.target.value)}
                        >
                            <option value="">Select Customer</option>
                            {customers.map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Product</label>
                        <select
                            value={product}
                            onChange={e => setProduct(e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {products.map(p => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </div>

                    <button className="btn primary" onClick={createOrder}>
                        Create Sales Order
                    </button>
                </div>

                <div className="card">
                    <h4 className="page-title" style={{ fontSize: "18px" }}>
                        Existing Sales Orders
                    </h4>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o._id}>
                                    <td>{o.customer?.name}</td>
                                    <td>{o.products.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
