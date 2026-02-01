import { useEffect, useState } from "react";
import api from "../services/api";

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
        <div style={{ padding: 40 }}>
            <h2>User Management (Admin)</h2>

            <h4>Create User</h4>
            <input placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <br /><br />

            <input placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <br /><br />

            <input type="password" placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <br /><br />

            <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
            >
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
            <br /><br />

            <button onClick={createUser}>Create User</button>

            <hr />

            <h4>Existing Users</h4>
            <ul>
                {users.map(u => (
                    <li key={u._id}>
                        {u.name} — {u.email} — {u.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}
