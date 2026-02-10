import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const loadCustomers = async () => {
        const res = await api.get("/customers");
        setCustomers(res.data);
    };

    const addCustomer = async () => {
        if (!name || !email) {
            alert("All fields required");
            return;
        }

        await api.post("/customers", { name, email });
        setName("");
        setEmail("");
        loadCustomers();
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <>
            <Navbar />

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">Customers</h2>
                    <button className="btn primary" onClick={addCustomer}>
                        Add Customer
                    </button>
                </div>

                <div className="card">
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            placeholder="Enter customer name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Customer Email</label>
                        <input
                            type="email"
                            placeholder="Enter customer email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(c => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
