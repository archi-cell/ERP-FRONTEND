import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
    });

    const loadUsers = async () => {
        const res = await api.get("/users");
        setUsers(res.data);
    };

    const createUser = async () => {
        if (!form.name || !form.email || !form.password) {
            alert("All fields required");
            return;
        }

        await api.post("/users", form);
        setForm({ name: "", email: "", password: "", role: "EMPLOYEE" });
        loadUsers();
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            <Navbar />

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">User Management</h2>
                </div>

                {/* FORM CARD */}
                <div className="card">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select
                            value={form.role}
                            onChange={e => setForm({ ...form, role: e.target.value })}
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                        </select>
                    </div>

                    <button className="btn primary" onClick={createUser}>
                        Create User
                    </button>
                </div>

                {/* USERS TABLE */}
                <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
