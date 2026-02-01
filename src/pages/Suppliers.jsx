import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const loadSuppliers = async () => {
        const res = await api.get("/suppliers");
        setSuppliers(res.data);
    };

    const addSupplier = async () => {
        if (!name || !email) {
            alert("All fields required");
            return;
        }

        await api.post("/suppliers", { name, email });
        setName("");
        setEmail("");
        loadSuppliers();
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ padding: 40 }}>
                <h2>Suppliers</h2>

                <input
                    placeholder="Supplier Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <br /><br />

                <input
                    placeholder="Supplier Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br /><br />

                <button onClick={addSupplier}>Add Supplier</button>

                <hr />

                <ul>
                    {suppliers.map(s => (
                        <li key={s._id}>
                            {s.name} — {s.email}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
