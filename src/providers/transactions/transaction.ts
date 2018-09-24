import { Wallet } from '../wallets/wallet';

export enum TRANSACTION_TYPE {
    IN,
    OUT
}

export enum TRANSACTION_STATUS {
    VERIFYING,
    COMPLETE,
    REJECT
}

export class Transaction {
    public id: string;
    public type: TRANSACTION_TYPE;
    public date: number;
    public amount: number;
    public status: TRANSACTION_STATUS;
    public coin: Wallet;
}