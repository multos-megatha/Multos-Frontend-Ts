import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface TransferItem {
    id: string;
    address: string;
    amount: number;
}

interface BalanceProps {
    balance: number; // balance asli dari wallet
}

const Method1: React.FC<BalanceProps> = ({ balance }) => {
    const [transfers, setTransfers] = useState<TransferItem[]>([
        { id: '1', address: '', amount: 0 }
    ]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const feePercentage = 0.01; // 1%

    const addTransferRow = () => {
        const newId = Date.now().toString();
        setTransfers([...transfers, { id: newId, address: '', amount: 0 }]);
    };

    const removeTransferRow = (id: string) => {
        if (transfers.length > 1) {
            setTransfers(transfers.filter(t => t.id !== id));
        }
    };

    const updateTransfer = (id: string, field: keyof TransferItem, value: string | number) => {
        setTransfers(transfers.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        ));
    };

    const calculateTotal = () => {
        return transfers.reduce((sum, t) => sum + (t.amount || 0), 0);
    };

    const calculateFee = (total: number) => {
        return total * feePercentage;
    };

    const handleConfirm = () => {
        const validTransfers = transfers.filter(t => t.address && t.amount > 0);
        if (validTransfers.length === 0) return;
        setShowConfirmation(true);
    };

    const handleBack = () => {
        setShowConfirmation(false);
    };

    const handleFinalConfirm = () => {
        alert('Transfer berhasil diproses!');
        setShowConfirmation(false);
        setTransfers([{ id: '1', address: '', amount: 0 }]); // reset
    };

    const total = calculateTotal();
    const fee = calculateFee(total);
    const remaining = balance - total - fee;

    const shortenNumber = (num: number, decimals = 2): string => {
        if (isNaN(num)) return "0";
        // kalau terlalu panjang, dipotong pakai toFixed
        if (Math.abs(num) < 1) {
            return num.toFixed(decimals);
        }
        return num.toFixed(decimals).replace(/\.?0+$/, ""); // hapus trailing zero
    };


    if (showConfirmation) {
        const validTransfers = transfers.filter(t => t.address && t.amount > 0);

        return (
            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm</h2>

                <div className="space-y-4">
                    {/* daftar transfer */}
                    {validTransfers.map((transfer) => (
                        <div key={transfer.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-mono text-sm text-gray-700 flex-1 mr-4 break-all">
                                {transfer.address}
                            </span>
                            <span className="font-semibold text-gray-900 whitespace-nowrap">
                                {transfer.amount} APT
                            </span>
                        </div>
                    ))}

                    <div className="mt-6 space-y-3 text-right">
                        <div className="flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-semibold">{total} APT</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Fee {(feePercentage * 100)}%</span>
                            <span className="font-semibold">{shortenNumber(fee)} APT</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Your Balance</span>
                            <span className="font-semibold">{shortenNumber(balance)} APT</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                            <span className="font-medium">Remaining</span>
                            <span className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {shortenNumber(remaining)} APT
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 mt-6">
                        <button
                            onClick={handleBack}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleFinalConfirm}
                            disabled={remaining < 0}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium ${remaining >= 0
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Confirm Transfer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 rounded-lg ">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Address</h2>
                <button
                    onClick={addTransferRow}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                >
                    <Plus size={16} />
                    Add Row
                </button>
            </div>

            <div className="space-y-4">
                {transfers.map((transfer) => (
                    <div
                        key={transfer.id}
                        className="flex flex-row items-center gap-2 w-full"
                    >
                        <input
                            type="text"
                            placeholder="Enter receiving address"
                            value={transfer.address}
                            onChange={(e) => updateTransfer(transfer.id, "address", e.target.value)}
                            className="flex-grow min-w-0 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-xs md:text-sm"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={transfer.amount || ""}
                            onChange={(e) =>
                                updateTransfer(
                                    transfer.id,
                                    "amount",
                                    parseFloat(e.target.value) || 0
                                )
                            }
                            className="w-20 sm:w-28 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-center text-xs md:text-sm"
                            min="0"
                            step="0.01"
                        />
                        <button
                            onClick={() => removeTransferRow(transfer.id)}
                            disabled={transfers.length === 1}
                            className={`p-2 rounded-md transition ${transfers.length === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-red-600 hover:bg-red-50"
                                }`}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                ))}
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Amount to send:</span>
                    <span className="font-bold text-black">{total} APT</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="font-medium">Estimated fee (1%):</span>
                    <span className="font-bold text-black">{shortenNumber(fee)} APT</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="font-medium">Remaining balance:</span>
                    <span className={`font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {shortenNumber(remaining)} APT
                    </span>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleConfirm}
                    disabled={total === 0 || remaining < 0}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${total > 0 && remaining >= 0
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Method1;
