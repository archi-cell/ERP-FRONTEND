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
            <div style={{ padding: 40 }}>
                <h2>Sales Orders</h2>

                <select onChange={e => setCustomer(e.target.value)}>
                    <option value="">Select Customer</option>
                    {customers.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                <br /><br />

                <select onChange={e => setProduct(e.target.value)}>
                    <option value="">Select Product</option>
                    {products.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                </select>

                <br /><br />

                <input type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />

                <br /><br />
                <button onClick={createOrder}>Create Sales Order</button>

                <hr />

                <h4>Existing Sales Orders</h4>
                <ul>
                    {orders.map(o => (
                        <li key={o._id}>
                            {o.customer?.name} — {o.products.length} item(s)
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
