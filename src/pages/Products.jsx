import { useEffect, useState } from "react";
import api from "../services/api";

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
        <div style={{ padding: 40 }}>
            <h2>Products</h2>

            <input
                placeholder="Product name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={addProduct}>Add</button>

            <ul>
                {products.map(p => <li key={p._id}>{p.name}</li>)}
            </ul>
        </div>
    );
}
