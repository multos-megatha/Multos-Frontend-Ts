import React, { useState } from 'react';
import { useDisperseAPT, useDisperseCustomToken, fetchToken } from '@/utils/HandleWeb3';

interface TransferItem {
    id: string;
    address: string;
    amount: number;
}

interface Method2Props {
    balance: number; // balance asli dari wallet
    isCustom: boolean;
}

const Method2: React.FC<Method2Props> = ({ balance, isCustom }) => {
    const [transfers, setTransfers] = useState<TransferItem[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');
    const feePercentage = 0.01; // 1%

    const { getTokenAmount, getTokenSymbol, getTokenDecimals } = fetchToken();
    const { account, connected, disperseAPT } = useDisperseAPT();
    const { disperseCustomToken } = useDisperseCustomToken();

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

    const [inputtedTokenAddr, setInputtedTokenAddr] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [tokenDecimals, setTokenDecimals] = useState<number>(0);
    const handleLoad = async () => {
        try {
            const symbol = await getTokenSymbol(inputtedTokenAddr);
            const amount = await getTokenAmount(inputtedTokenAddr);
            const decimals = await getTokenDecimals(inputtedTokenAddr);

            const conversion = 10 ** Number(decimals);
            const convertAmount = Number(amount) / conversion;

            setTokenAmount(convertAmount);
            setTokenSymbol(symbol);
            setTokenDecimals(decimals);
        } catch (error) {
            throw error
        }
    }

    const [transactionHash, setTransactionHash] = useState<string>(``);
    const handleFinalConfirm = async () => {
        // konversi semua amount ke Octa (1 APT = 1e8 Octa)
        const conversion = isCustom ? 10 ** tokenDecimals : 1e8;
        const payload = transfers.map(t => ({
            ...t,
            amount: Math.round(t.amount * conversion), // konversi ke integer Octa
        }));

        let amounts: bigint[] = []
        let recipients: string[] = []

        for (let i = 0; i < payload.length; i++) {
            amounts.push(BigInt(payload[i].amount));
            recipients.push(payload[i].address);
        }

        if (isCustom) {
            try {
                const txnResult = await disperseCustomToken(inputtedTokenAddr, amounts, recipients);
                setTransactionHash(txnResult as string)
            } catch (error) {
                console.error("transaction error", error)
            }
        } else {
            try {
                const txnResult = await disperseAPT(amounts, recipients);
                setTransactionHash(txnResult as string);
            } catch (error) {
                console.error("transaction error: ", error);
            }
        }
        // reset state
        // setShowConfirmation(false);
        // setTransfers([]);
        // setTextareaValue('');
    };


    const handleBatchPaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value.trim();
        setTextareaValue(e.target.value);

        if (!text) {
            setTransfers([]);
            return;
        }

        const lines = text.split('\n').filter(line => line.trim());
        const newTransfers: TransferItem[] = [];

        lines.forEach((line, index) => {
            const parts = line.trim().split(/\s+/);
            if (parts.length >= 2) {
                const address = parts[0];
                const amount = parseFloat(parts[parts.length - 1]);
                if (address && !isNaN(amount)) {
                    newTransfers.push({
                        id: `batch-${Date.now()}-${index}`,
                        address,
                        amount
                    });
                }
            }
        });

        setTransfers(newTransfers);
    };

    const handleClearAll = () => {
        setTransfers([]);
        setTextareaValue('');
    };

    const total = calculateTotal();
    const fee = calculateFee(total);
    const remaining = balance - total - fee;

    if (showConfirmation) {
        const validTransfers = transfers.filter(t => t.address && t.amount > 0);

        return (
            <div className="max-w-2xl mx-auto p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm</h2>

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600 border-b pb-2">
                        <span>Address</span>
                        <span>Amount</span>
                    </div>

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
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
            {/* ini tempat form */}
            {isCustom && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800">Token Address</h2>
                    <div className="flex flex-row items-center gap-2 w-full mb-5">
                        <input
                            type="text"
                            placeholder="Enter token contract address"
                            className="flex-grow min-w-0 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-xs md:text-sm"
                            value={inputtedTokenAddr}
                            onChange={(e) => setInputtedTokenAddr(e.target.value)}
                        />
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                            onClick={handleLoad}
                        >
                            Load
                        </button>
                    </div>
                    <p>
                        you have {tokenAmount} {tokenSymbol}
                    </p>
                </>
            )}
            {/* ---- */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Batch Import</h2>
            </div>

            {/* Batch Import Textarea */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste from spreadsheet (format: address amount)
                </label>
                <textarea
                    placeholder={`Paste your data here, example:
0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 80
0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a 10
0x141ca95b6177615fb1417cf70e930e102bf8f584 10`}
                    value={textareaValue}
                    onChange={handleBatchPaste}
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Each line should contain: wallet_address amount (separated by space or tab)
                </p>
            </div>

            {/* Preview Section */}
            {transfers.filter(t => t.address && t.amount > 0).length > 0 && (
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview Transfers</h3>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                        {transfers.filter(t => t.address && t.amount > 0).map((transfer) => (
                            <div key={transfer.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                <span className="font-mono text-sm text-gray-700 flex-1 mr-4 break-all">
                                    {transfer.address}
                                </span>
                                <span className="font-semibold text-gray-900 whitespace-nowrap">
                                    {transfer.amount} APT
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {total > 0 && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">Amount to send:</span>
                        <span className="font-bold text-black">{total} APT</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                        <span className="font-medium">Estimated fee (1%):</span>
                        <span className="font-bold text-black">{fee.toFixed(2)} APT</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                        <span className="font-medium">Remaining balance:</span>
                        <span className={`font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {remaining.toFixed(2)} APT
                        </span>
                    </div>
                </div>
            )}

            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleClearAll}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                    disabled={transfers.length === 0 && textareaValue === ''}
                >
                    Clear All
                </button>
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

export default Method2;
