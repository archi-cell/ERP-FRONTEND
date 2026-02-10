import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function GRN() {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [selectedPO, setSelectedPO] = useState("");

    useEffect(() => {
        api.get("/purchase-orders").then(res => setPurchaseOrders(res.data));
    }, []);

    const receiveGoods = async () => {
        if (!selectedPO) {
            alert("Select purchase order");
            return;
        }

        await api.post("/grn", { purchaseOrder: selectedPO });
        alert("GRN created & inventory updated");
    };

    return (
        <>
            <Navbar />

            <div className="page">
                <div className="page-header">
                    <h2 className="page-title">Goods Received Note (GRN)</h2>
                </div>

                <div className="card">
                    <div className="form-group">
                        <label>Select Purchase Order</label>
                        <select
                            value={selectedPO}
                            onChange={e => setSelectedPO(e.target.value)}
                        >
                            <option value="">Select Purchase Order</option>
                            {purchaseOrders.map(po => (
                                <option key={po._id} value={po._id}>
                                    {po.supplier?.name} — {po.products.length} item(s)
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="btn primary" onClick={receiveGoods}>
                        Receive Goods
                    </button>
                </div>
            </div>
        </>
    );
}
