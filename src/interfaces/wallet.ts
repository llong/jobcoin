export interface IWallet {
  balance: string;
  transactions: {
    timestamp: Date;
    toAddress: string;
    amount: string;
  }[];
}
