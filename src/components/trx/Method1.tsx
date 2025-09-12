import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface TransferItem {
    id: string;
    address: string;
    amount: number;
}

interface Method1Props {
    balance: number; // balance asli dari wallet
}

const Method1: React.FC<Method1Props> = ({ balance }) => {
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
                            <span className="font-semibold">{fee.toFixed(2)} APT</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Your Balance</span>
                            <span className="font-semibold">{balance.toFixed(2)} APT</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                            <span className="font-medium">Remaining</span>
                            <span className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {remaining.toFixed(2)} APT
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
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
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
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
                <h2 className="text-2xl font-bold text-gray-800">Receiving address</h2>
                <button
                    onClick={addTransferRow}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                    <Plus size={16} />
                    Batch import
                </button>
            </div>

            <div className="space-y-4">
                {transfers.map((transfer) => (
                    <div key={transfer.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <input
                            type="text"
                            placeholder="Enter receiving address"
                            value={transfer.address}
                            onChange={(e) => updateTransfer(transfer.id, 'address', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={transfer.amount || ''}
                            onChange={(e) => updateTransfer(transfer.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                            min="0"
                            step="0.01"
                        />
                        <button
                            onClick={() => removeTransferRow(transfer.id)}
                            disabled={transfers.length === 1}
                            className={`p-2 rounded-md ${transfers.length === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Total yang akan ditransfer:</span>
                    <span className="font-bold text-blue-600">{total} APT</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="font-medium">Estimasi fee (1%):</span>
                    <span className="font-bold text-blue-600">{fee.toFixed(2)} APT</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="font-medium">Saldo tersisa:</span>
                    <span className={`font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {remaining.toFixed(2)} APT
                    </span>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    onClick={addTransferRow}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                    Add Row
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={total === 0 || remaining < 0}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${total > 0 && remaining >= 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
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
