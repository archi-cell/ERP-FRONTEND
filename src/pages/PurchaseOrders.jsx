import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function PurchaseOrders() {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [supplier, setSupplier] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        api.get("/suppliers").then(res => setSuppliers(res.data));
        api.get("/products").then(res => setProducts(res.data));
        api.get("/purchase-orders").then(res => setOrders(res.data));
    }, []);

    const createOrder = async () => {
        if (!supplier || !product) {
            alert("Select supplier & product");
            return;
        }

        await api.post("/purchase-orders", {
            supplier,
            products: [{ product, quantity }]
        });

        alert("Purchase order created");
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: 40 }}>
                <h2>Purchase Orders</h2>

                <select onChange={e => setSupplier(e.target.value)}>
                    <option value="">Select Supplier</option>
                    {suppliers.map(s => (
                        <option key={s._id} value={s._id}>{s.name}</option>
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
                <button onClick={createOrder}>Create Purchase Order</button>

                <hr />

                <h4>Existing Purchase Orders</h4>
                <ul>
                    {orders.map(o => (
                        <li key={o._id}>
                            {o.supplier?.name} — {o.products.length} item(s)
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
