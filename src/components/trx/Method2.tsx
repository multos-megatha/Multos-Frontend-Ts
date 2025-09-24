import React, { useState } from 'react';
import { useDisperseAPT, useDisperseCustomToken, fetchToken } from '@/utils/HandleWeb3';
import LoaderPopup from '../LoaderPopup';
import { motion, AnimatePresence } from "framer-motion";

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);



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
        setTransactionHash(null);
    };

    const [inputtedTokenAddr, setInputtedTokenAddr] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [tokenDecimals, setTokenDecimals] = useState<number>(0);
    const [error, setError] = useState(false); 
    const handleLoad = async () => {
        setLoading(true)
        setError(false);
        try {
            const symbol = await getTokenSymbol(inputtedTokenAddr);
            const amount = await getTokenAmount(inputtedTokenAddr);
            const decimals = await getTokenDecimals(inputtedTokenAddr);

            const conversion = 10 ** Number(decimals);
            const convertAmount = Number(amount) / conversion;

            setTokenAmount(convertAmount);
            setTokenSymbol(symbol);
            setTokenDecimals(decimals);
            setIsLoaded(true);

        } catch (error) {
            // throw error
            console.error(error);
            setError(true);
        }
        setLoading(false)

    }

    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const handleFinalConfirm = async () => {
        setLoading(true);
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
        setLoading(false);

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
            <div className="max-w-2xl mx-auto p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm</h2>

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600 border-b pb-2">
                        <span>Address</span>
                        <span>Amount</span>
                    </div>

                    {validTransfers.map((transfer) => (
                        <div
                            key={transfer.id}
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                            {/* Address */}
                            <span className="font-mono text-sm text-gray-700 flex-1 mr-4 break-all">
                                {transfer.address}
                            </span>

                            {/* Amount + Symbol (rapi, truncate, tidak pecah) */}
                            <div className="flex flex-wrap justify-end max-w-[40%]">
                                <span className="font-semibold truncate min-w-0 text-right">
                                    {transfer.amount}
                                </span>
                                <span className="ml-1 font-bold shrink-0">
                                    {isCustom ? tokenSymbol : "APT"}
                                </span>
                            </div>
                        </div>
                    ))}


                    <div className="mt-6 space-y-3 text-sm">
                        {/* Total */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Total</span>
                            <span className="font-semibold flex items-center gap-1 max-w-[60%] sm:max-w-none truncate">
                                <span className="truncate">{total}</span>
                                <span className="shrink-0">{isCustom ? tokenSymbol : "APT"}</span>
                            </span>
                        </div>

                        {/* Fee */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Fee {(feePercentage * 100)}%</span>
                            <span className="font-semibold flex items-center gap-1 max-w-[60%] sm:max-w-none truncate">
                                <span className="truncate">{fee.toFixed(2)}</span>
                                <span className="shrink-0">{isCustom ? tokenSymbol : "APT"}</span>
                            </span>
                        </div>

                        {/* Balance */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Your Balance</span>
                            <span className="font-semibold flex items-center gap-1 max-w-[60%] sm:max-w-none truncate">
                                <span className="truncate">
                                    {isCustom ? tokenAmount : shortenNumber(balance)}
                                </span>
                                <span className="shrink-0">{isCustom ? tokenSymbol : "APT"}</span>
                            </span>
                        </div>

                        {/* Remaining */}
                        <div className="flex justify-between items-center border-t pt-2">
                            <span className="font-medium">Remaining</span>
                            <span
                                className={`font-semibold flex items-center gap-1 max-w-[60%] sm:max-w-none truncate ${(isCustom ? remainingToken : remainingAPT) >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                <span className="truncate">
                                    {isCustom ? remainingToken : shortenNumber(remainingAPT)}
                                </span>
                                <span className="shrink-0">{isCustom ? tokenSymbol : "APT"}</span>
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
                            disabled={isDisabled}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${!isDisabled
                                ? "bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 text-white hover:shadow-xl transition-all duration-200"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                                }`}
                        >
                            Confirm Transfer
                        </button>
                        {loading && (
                            <LoaderPopup
                                onClose={() => setLoading(false)}
                                message="Confirming transaction..."
                            />
                        )}
                    </div>



                    {transactionHash && (
                        <AnimatePresence>
                            <motion.div
                                key="tx-success"
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 shadow-sm"
                            >
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
                                        className="ml-2 text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}


                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-6 bg-white rounded-lg">
            {/* ini tempat form */}
            {isCustom && (
                <div className="bg-white  space-y-4 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
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
                            onClick={handleLoad}
                            disabled={!inputtedTokenAddr} // disable jika kosong
                            className={`px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition
                                ${inputtedTokenAddr
                                    ? "bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 text-white hover:scale-105 transition-all duration-200"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Load
                        </button>
                    </div>

                    <div className="text-sm text-gray-600">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.span
                                    key="loading"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="font-semibold text-gray-900"
                                >
                                    Loading, please wait...
                                </motion.span>
                            ) : error ? (
                                <motion.span
                                    key="error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="font-semibold text-red-600"
                                >
                                    Invalid token address
                                </motion.span>
                            ) : isLoaded ? (
                                <motion.div
                                    key="loaded"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    You have{" "}
                                    <span className="font-semibold text-gray-900">
                                        {tokenAmount} {tokenSymbol}
                                    </span>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>
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
                            <div
                                key={transfer.id}
                                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                            >
                                {/* Address */}
                                <span className="font-mono text-sm text-gray-700 flex-1 mr-4 break-all">
                                    {transfer.address}
                                </span>

                                {/* Amount + Symbol */}
                                <div className="flex flex-wrap justify-end max-w-[40%]">
                                    <span className="font-semibold truncate min-w-0 text-right">
                                        {transfer.amount}
                                    </span>
                                    <span className="ml-1 font-bold shrink-0">
                                        {isCustom ? tokenSymbol : "APT"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}



            {total > 0 && (
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
            )}

            <div className="flex flex-col md:flex-row gap-3 mt-6">
                <button
                    onClick={handleClearAll}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                    disabled={transfers.length === 0 && textareaValue === ''}
                >
                    Clear All
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={
                        total === 0 ||
                        (isCustom ? remainingToken < 0 : remainingAPT < 0)
                    }
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${total > 0 &&
                        (isCustom ? remainingToken >= 0 : remainingAPT >= 0)
                        ? "bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 text-white hover:shadow-xl transition-all duration-200"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Method2;
