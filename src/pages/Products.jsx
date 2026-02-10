import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");

    const loadProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    const addProduct = async () => {
        await api.post("/products", { name });
        setName("");
        loadProducts();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <Navbar />

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">Products</h2>
                </div>

                <div className="card">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            placeholder="Enter product name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <button className="btn primary" onClick={addProduct}>
                        Add Product
                    </button>
                </div>

                <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p._id}>
                                    <td>{p.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
