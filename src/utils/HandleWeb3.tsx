import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

interface TokenMetadata {
    decimals: number,
    icon_uri: string,
    name: string,
    project_uri: string,
    symbol: string
}


export const useDisperseAPT = () => {
    const {connected, account, signAndSubmitTransaction } = useWallet()

    const disperseAPT = async (amounts: bigint[], recipients: string[])=> {
        if(!connected || !account?.address){
            alert(`wallet is not connected`);
            return {error: `wallet is not connected`};
        }

        const transaction = await aptos.transaction.build.simple({
            sender: account.address,
            data: {
                function: "0x2d1c7d123fd0503aed57e1d6c62db2ed71130b8e212d333cfebadcf4135637ea::MULTOS_V3::disperseAptos",
                functionArguments: [recipients, amounts]
            }
        })
        console.log(`transaction built: `, transaction);

        const commitedTxn = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: "0x2d1c7d123fd0503aed57e1d6c62db2ed71130b8e212d333cfebadcf4135637ea::MULTOS_V3::disperseAptos",
                functionArguments: [recipients, amounts]
            }
        })

        try {
            console.log("waiting to commit transaction:", commitedTxn.hash)
            const finalizedTxn = await aptos.waitForTransaction({ transactionHash: commitedTxn.hash})
            
            console.log("Transaction Success:", finalizedTxn)
            return finalizedTxn.hash
        } catch (error){
            return error
        }
    };

    return { disperseAPT, connected, account}
}

export const fetchToken = () => {
    const {account, connected} = useWallet()

    const readMetadata = async (tokenAddress: string) => {
        try {
            const metadata = await aptos.view({
                payload: {
                    function: "0x1::fungible_asset::metadata",
                    typeArguments: ["0x1::fungible_asset::Metadata"],
                    functionArguments: [tokenAddress]
                }
            })

            return metadata
        } catch (error) {
            console.error("error fetching FA metadata:", error);
            throw error;
        }
    }

    const getTokenSymbol = async (tokenAddress: string) => {
        try {
            const metadata = await readMetadata(tokenAddress);
            const tokenMetadata = metadata[0] as TokenMetadata
            return tokenMetadata.symbol
        } catch (error){
            console.error("error fetching token symbol:", error);
            throw error;
        }
    }

    const getTokenDecimals = async (tokenAddress: string) => {
        try {
            const metadata = await readMetadata(tokenAddress);
            const tokenMetadata = metadata[0] as TokenMetadata
            return tokenMetadata.decimals
        } catch (error) {
            console.error("error fetching token decimals: ", error);
            throw error
        }
    }

    const getTokenAmount = async (tokenAddress: string) => {
        if(!connected || !account?.address){
            alert(`wallet is not connected`);
            return {error: `wallet is not connected`};
        }

        try {
            const balance = await aptos.view({
                payload: {
                    function: "0x1::primary_fungible_store::balance",
                    typeArguments: ["0x1::object::ObjectCore"],
                    functionArguments: [account.address, tokenAddress]
                }
            });
            
            const amount = balance[0]
            return amount
        } catch (error) {
            console.log("error fetching balance:", error)
            throw error
        }
    }

    return {readMetadata, getTokenSymbol, getTokenAmount, getTokenDecimals}
}

export const useDisperseCustomToken = () => {
    const {connected, account, signAndSubmitTransaction} = useWallet()

    const disperseCustomToken = async (tokenAddress: string, amounts: bigint[], recipients: string[]) => {
        if(!connected || !account?.address){
            alert(`wallet is not connected`);
            return {error: `wallet is not connected`};
        }

        const comittedTxn = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: "0x2d1c7d123fd0503aed57e1d6c62db2ed71130b8e212d333cfebadcf4135637ea::MULTOS_V3::disperseCustomToken",
                functionArguments: [tokenAddress, recipients, amounts]
            }
        })

        try {
            console.log("waiting to commit transaction", comittedTxn.hash);
            const finalizedTxn = await aptos.waitForTransaction({ transactionHash: comittedTxn.hash})

            console.log("transaction success:", finalizedTxn.hash);
            return finalizedTxn.hash
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    return {disperseCustomToken}
}