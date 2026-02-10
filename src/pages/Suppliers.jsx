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

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">Suppliers</h2>
                </div>

                <div className="card">
                    <div className="form-group">
                        <label>Supplier Name</label>
                        <input
                            placeholder="Enter supplier name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Supplier Email</label>
                        <input
                            type="email"
                            placeholder="Enter supplier email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button className="btn primary" onClick={addSupplier}>
                        Add Supplier
                    </button>
                </div>

                <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Supplier Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map(s => (
                                <tr key={s._id}>
                                    <td>{s.name}</td>
                                    <td>{s.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
