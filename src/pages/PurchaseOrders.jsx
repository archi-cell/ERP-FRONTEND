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

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">Purchase Orders</h2>
                </div>

                <div className="card">
                    <div className="form-group">
                        <label>Supplier</label>
                        <select
                            value={supplier}
                            onChange={e => setSupplier(e.target.value)}
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map(s => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
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
                        Create Purchase Order
                    </button>
                </div>

                <div className="card">
                    <h4 className="page-title" style={{ fontSize: "18px" }}>
                        Existing Purchase Orders
                    </h4>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o._id}>
                                    <td>{o.supplier?.name}</td>
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
