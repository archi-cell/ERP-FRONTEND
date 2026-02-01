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
            <div style={{ padding: 40 }}>
                <h2>Customers</h2>

                <input
                    placeholder="Customer Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <br /><br />

                <input
                    placeholder="Customer Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br /><br />

                <button onClick={addCustomer}>Add Customer</button>

                <hr />

                <ul>
                    {customers.map(c => (
                        <li key={c._id}>
                            {c.name} — {c.email}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
