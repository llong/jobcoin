import {
  getTransactions,
  sendTransaction,
  getWalletAddress,
} from '../api/apiService';
import { ITransaction } from '../interfaces/transaction';
import { IWallet } from '../interfaces/wallet';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const SEND_TRANSACTION = 'SEND_TRANSACTION';
export const FETCH_WALLET = 'FETCH_WALLET';
export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS';
export const SIGN_OUT = 'SIGN_OUT';

export const fetchTransactionss = () => {
  return (dispatch: any) => {
    getTransactions().then(payload => {
      dispatch({ type: FETCH_TRANSACTIONS, payload });
    });
  };
};

export const postTransaction = (payload: ITransaction) => {
  return (dispatch: any) => {
    sendTransaction(payload).then(res =>
      dispatch({ type: SEND_TRANSACTION, payload: res }),
    );
    getWalletAddress(payload.fromAddress).then((payload: IWallet) => {
      dispatch({ type: FETCH_WALLET, payload });
    });
  };
};

export const fetchWallet = (walletAddress: string) => {
  return (dispatch: any) => {
    getWalletAddress(walletAddress).then((payload: IWallet) => {
      dispatch({ type: FETCH_WALLET, payload });
    });
  };
};

export const setWalletAddress = (walletAddress: string) => {
  return {
    type: SET_WALLET_ADDRESS,
    payload: walletAddress,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
