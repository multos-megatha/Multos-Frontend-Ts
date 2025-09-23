import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { useDisperseAPT, fetchToken, useDisperseCustomToken } from '@/utils/HandleWeb3';
import LoaderPopup from '../LoaderPopup';

interface TransferItem {
    id: string;
    address: string;
    amount: number;
}

interface Method1Props {
    balance: number; // balance asli dari wallet
    isCustom: boolean;
}

const Method1: React.FC<Method1Props> = ({ balance, isCustom }) => {
    const { disperseAPT, connected, account } = useDisperseAPT()
    const { getTokenSymbol, getTokenAmount, getTokenDecimals } = fetchToken()
    const { disperseCustomToken } = useDisperseCustomToken()
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(false)

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
        setTransactionHash(null);
    };

    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    async function handleFinalConfirm() {
        setLoading(true);
        const validTransfers = transfers.filter(t => t.address && t.amount > 0);

        const conversion = isCustom ? 10 ** tokenDecimals : 1e8;
        // Data yang dikirim ke blockchain -> dikali 10^8 (Octa)
        const payload = validTransfers.map(t => ({
            ...t,
            amount: Math.round(t.amount * conversion), // convert ke Octa (integer)
        }));

        let amounts: bigint[] = []
        let recipients: string[] = []

        for (let i = 0; i < payload.length; i++) {
            amounts.push(BigInt(payload[i].amount));
            recipients.push(payload[i].address);
        }

        if (isCustom) {
            try {
                const txnResult = await disperseCustomToken(inputtedTokenAddr, amounts, recipients)
                setTransactionHash(txnResult as string)
            } catch (error) {
                console.log(`transaction failed: `, error)
            }
        } else {
            try {
                const txnResult = await disperseAPT(amounts, recipients);
                console.log(txnResult)
                console.log(typeof txnResult)
                setTransactionHash(txnResult as string)
                // setShowConfirmation(false);
                // setTransfers([{ id: '1', address: '', amount: 0 }]); // reset
            } catch (error) {
                console.error(`transaction failed: `, error);
            }
        }
        setLoading(false);
    }



    const [inputtedTokenAddr, setInputtedTokenAddr] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [tokenDecimals, setTokenDecimals] = useState<number>(0);
    const handleLoad = async () => {
        try {
            const metadata = await getTokenSymbol(inputtedTokenAddr);
            const amount = await getTokenAmount(inputtedTokenAddr);
            const decimals = await getTokenDecimals(inputtedTokenAddr);

            const conversion = 10 ** Number(decimals);
            const convertedAmount = Number(amount) / conversion;

            setTokenAmount(convertedAmount);
            setTokenSymbol(metadata);
            setTokenDecimals(decimals);
            setIsLoaded(true);
        } catch (error) {
            throw error
        }
    }

    const total = calculateTotal();
    const fee = calculateFee(total);
    // const remaining = balance - total - fee;

    // hitung khusus APT
    const remainingAPT = balance - total - fee;

    // hitung khusus custom token
    const remainingToken = tokenAmount - total - fee;

    const shortenNumber = (num: number, decimals = 2): string => {
        if (isNaN(num)) return "0";
        // kalau terlalu panjang, dipotong pakai toFixed
        if (Math.abs(num) < 1) {
            return num.toFixed(decimals);
        }
        return num.toFixed(decimals).replace(/\.?0+$/, ""); // hapus trailing zero
    };

    const isDisabled =
        (isCustom ? remainingToken < 0 : remainingAPT < 0) || !!transactionHash;



    if (showConfirmation) {
        const validTransfers = transfers.filter(t => t.address && t.amount > 0);

        return (
            <div className="max-w-2xl mx-auto py-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm</h2>

                <div className="space-y-4">
                    {/* daftar transfer */}
                    {validTransfers.map((transfer) => (
                        <div
                            key={transfer.id}
                            className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                            <span className="font-mono text-sm text-gray-700 flex-1 mr-4 break-all">
                                {transfer.address}
                            </span>

                            <div className="flex flex-wrap justify-end max-w-[50%]">
                                <span className="font-semibold text-gray-900 truncate min-w-0 text-right">
                                    {transfer.amount}
                                </span>
                                <span className="ml-1 font-bold text-gray-600 shrink-0">
                                    {isCustom ? tokenSymbol : "APT"}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 space-y-3 text-right">
                        <div className="flex justify-between">
                            <span className="font-medium">Total</span>
                            <div className="flex flex-wrap justify-end max-w-[60%]">
                                <span className="font-semibold truncate min-w-0 text-right">
                                    {total}
                                </span>
                                <span className="ml-1 font-bold shrink-0">
                                    {isCustom ? tokenSymbol : "APT"}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Fee {feePercentage * 100}%</span>
                            <div className="flex flex-wrap justify-end max-w-[60%]">
                                <span className="font-semibold truncate min-w-0 text-right">
                                    {shortenNumber(fee)}
                                </span>
                                <span className="ml-1 font-bold shrink-0">
                                    {isCustom ? tokenSymbol : "APT"}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Your Balance</span>
                            <div className="flex flex-wrap justify-end max-w-[60%]">
                                <span className="font-semibold truncate min-w-0 text-right">
                                    {isCustom ? tokenAmount : shortenNumber(balance)}
                                </span>
                                <span className="ml-1 font-bold shrink-0">
                                    {isCustom ? tokenSymbol : "APT"}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between border-t pt-2">
                            <span className="font-medium">Remaining</span>
                            <div
                                className={`flex flex-wrap justify-end max-w-[60%] ${(isCustom ? remainingToken : remainingAPT) >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                <span className="font-semibold truncate min-w-0 text-right">
                                    {isCustom ? remainingToken : shortenNumber(remainingAPT)}
                                </span>
                                <span className="ml-1 font-bold shrink-0">
                                    {isCustom ? tokenSymbol : "APT"}
                                </span>
                            </div>
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
                            disabled={isDisabled}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${!isDisabled
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                                }`}
                        >
                            Confirm Transfer
                        </button>
                    </div>

                    {loading && (
                        <LoaderPopup onClose={() => setLoading(false)} message="Confirming transaction..." />
                    )}


                    {transactionHash && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                            <h3 className="text-sm font-medium text-green-800 mb-2">
                                Transaction Successful
                            </h3>

                            <div className="flex items-center justify-between">
                                {/* Hash dengan truncate */}
                                <span className="text-xs font-mono text-gray-700 truncate max-w-[80%]">
                                    {transactionHash}
                                </span>


                                {/* Copy button */}
                                <button
                                    onClick={() => navigator.clipboard.writeText(transactionHash)}
                                    className="ml-2 text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto pb-6 rounded-lg ">

            {isCustom && (
                <div className="bg-white space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Token Address
                    </h2>

                    <div className="flex flex-col sm:flex-row items-stretch gap-3">
                        <input
                            type="text"
                            placeholder="Enter token contract address"
                            className="flex-grow min-w-0 px-3 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm"
                            value={inputtedTokenAddr}
                            onChange={(e) => setInputtedTokenAddr(e.target.value)}
                        />
                        <button
                            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                   transition font-medium text-sm whitespace-nowrap"
                            onClick={handleLoad}
                        >
                            Load
                        </button>
                    </div>

                    {isLoaded && (
                        <div className="text-sm text-gray-600">
                            You have{" "}
                            <span className="font-semibold text-gray-900">
                                {tokenAmount} {tokenSymbol}
                            </span>
                        </div>
                    )}
                </div>
            )}




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
                {/* Amount */}
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Amount to send:</span>
                    <div className="flex flex-wrap justify-end max-w-[60%]">
                        <span className="font-bold text-black truncate text-right min-w-0">
                            {total}
                        </span>
                        <span className="ml-1 font-bold text-gray-600 shrink-0">
                            {isCustom ? tokenSymbol : "APT"}
                        </span>
                    </div>
                </div>

                {/* Fee */}
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="font-medium">Fee (1%):</span>
                    <div className="flex flex-wrap justify-end max-w-[60%]">
                        <span className="font-bold text-black truncate text-right min-w-0">
                            {shortenNumber(fee)}
                        </span>
                        <span className="ml-1 font-bold text-gray-600 shrink-0">
                            {isCustom ? tokenSymbol : "APT"}
                        </span>
                    </div>
                </div>

                {/* Remaining */}
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="font-medium">Remaining balance:</span>
                    <div
                        className={`flex flex-wrap justify-end max-w-[60%] ${(isCustom ? remainingToken : remainingAPT) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >
                        <span className="font-bold truncate text-right min-w-0">
                            {shortenNumber(isCustom ? remainingToken : remainingAPT)}
                        </span>
                        <span className="ml-1 font-bold shrink-0">
                            {isCustom ? tokenSymbol : "APT"}
                        </span>
                    </div>
                </div>
            </div>



            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleConfirm}
                    disabled={
                        total === 0 ||
                        (isCustom ? remainingToken < 0 : remainingAPT < 0)
                    }
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${total > 0 &&
                        (isCustom ? remainingToken >= 0 : remainingAPT >= 0)
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Continue
                </button>
            </div>

        </div>
    );
};

export default Method1;
