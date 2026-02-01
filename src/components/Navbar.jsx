import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav style={{ padding: 10 }}>
            <Link to="/grn">GRN</Link> |{" "}
            <Link to="/invoices">Invoices</Link> |{" "}

            <Link to="/inventory">Inventory</Link> |{" "}

            <Link to="/sales">Sales Orders</Link> |{" "}
            <Link to="/purchase">Purchase Orders</Link> |{" "}

            <Link to="/customers">Customers</Link> |{" "}
            <Link to="/suppliers">Suppliers</Link> |{" "}

            <Link to="/dashboard">Dashboard</Link> |{" "}
            <Link to="/products">Products</Link> |{" "}
            <Link to="/customers">Customers</Link> |{" "}
            <Link to="/sales">Sales</Link> |{" "}
            {role === "ADMIN" && <Link to="/users">Users</Link>} |{" "}
            <button onClick={logout}>Logout</button>
        </nav>
    );
}
