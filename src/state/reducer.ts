import {
  FETCH_TRANSACTIONS,
  SET_WALLET_ADDRESS,
  FETCH_WALLET,
  SIGN_OUT,
} from './actions';

const initialState = {
  walletAddress: '',
  walletData: {},
  transactions: [],
};

export default (
  state = initialState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case FETCH_WALLET:
      return { ...state, walletData: action.payload };
    case SET_WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload };
    case FETCH_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    case SIGN_OUT:
      return { ...state, walletAddress: '' };
    default:
      return state;
  }
};
