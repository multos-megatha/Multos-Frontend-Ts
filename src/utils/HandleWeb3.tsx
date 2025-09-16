import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);


export const useDisperseAPT = () => {
    const {connected, account, signAndSubmitTransaction } = useWallet()

    const disperseAPT = async (amounts: bigint[], recipients: string[]) => {
        if(!connected || !account?.address){
            alert(`wallet is not connected`);
            return;
        }

        const transaction = await aptos.transaction.build.simple({
            sender: account.address,
            data: {
                function: "0x2d1c7d123fd0503aed57e1d6c62db2ed71130b8e212d333cfebadcf4135637ea::MULTOS_V2::disperseAptos",
                functionArguments: [recipients, amounts]
            }
        })

        console.log(`transaction built: `, transaction);
    };

    return { disperseAPT, connected, account}
}