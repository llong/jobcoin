import axios from 'axios';
import { ITransaction } from '../interfaces/transaction';
import { IWallet } from '../interfaces/wallet';

const baseURL = 'http://jobcoin.gemini.com/rascal-alibi/api';

export const getWalletAddress = async (walletAddress: string): Promise<any> => {
  const data = await axios
    .get(`${baseURL}/addresses/${walletAddress}`)
    .then(res => res.data as IWallet)
    .catch(err => console.log(err));

  return data;
};

// TRANSACTIONS

export const getTransactions = async (): Promise<any> => {
  const data = await axios
    .get(`${baseURL}/transactions`)
    .then(res => res.data as IWallet[])
    .catch(err => console.log(err));

  return data;
};

export const sendTransaction = async (payload: ITransaction): Promise<any> => {
  axios.post(`${baseURL}/transactions`, payload).catch(res => res.error);
};
