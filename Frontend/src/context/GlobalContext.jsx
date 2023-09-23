import { createContext, useEffect, useState } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import axios from "axios";
// export const contractAddress = "KT1NSMmpfLZUBY4naxi4CKQ4dhU692F59G3t"

export const Context = createContext();
const GlobalContextProvider = ({ children }) => {


    const [walletAddress, setWalletAddress] = useState("");

    // initialization 
    const [userId, setUserId] = useState("");

    const preferredNetwork = "ghostnet";
    const options = {
        name: "NFT",
        preferredNetwork: preferredNetwork,
    };
    const wallet = new BeaconWallet(options);

    const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");
    Tezos.setWalletProvider(wallet);


    // function calls 

    const getActiveAccount = async () => {
        return await wallet.client.getActiveAccount();
    };

    const connectWallet = async () => {
        let account = await wallet.client.getActiveAccount();

        if (!account) {
            await wallet.requestPermissions({
                network: { type: preferredNetwork },
            });
            account = await wallet.client.getActiveAccount();
        }
        return { success: true, wallet: account.address };
    };

    const disconnectWallet = async () => {
        await wallet.clearActiveAccount();
        await wallet.disconnect();
        return { success: true, wallet: null };
    };

    const checkIfWalletConnected = async (wallet) => {
        try {
            const activeAccount = await wallet.client.getActiveAccount();
            if (!activeAccount) {
                await wallet.client.requestPermissions({
                    type: { network: preferredNetwork },
                });
            }
            return {
                success: true,
            };
        } catch (error) {
            console.error(error, 'err')
            return {
                success: false,
                error,
            };
        }
    };

    // backend methods
    const URL = "localhost:4000"

    const getUserId = async () => {
        try {

            const user = await axios.post('http://localhost:5000/user/signup', {
                address: walletAddress
            });
            console.log(user.data._id);
            setUserId(user.data._id);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
    }, [])


    return (
        <Context.Provider value={{
            walletAddress,
            setWalletAddress,
            connectWallet,
            disconnectWallet,
            getActiveAccount,
            checkIfWalletConnected,
            Tezos,
            userId,
            getUserId
        }}>
            {children}
        </Context.Provider>
    );
}

export default GlobalContextProvider