import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Inventory() {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        api.get("/inventory").then(res => setInventory(res.data));
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ padding: 40 }}>
                <h2>Inventory</h2>

                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(item => (
                            <tr key={item._id}>
                                <td>{item.product?.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
