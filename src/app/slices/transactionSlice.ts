import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { RootState } from '../store';

interface Transaction {
    id?: string;
    categoryType: string;
    category: string;
    amount: number;
    date: string;
    notes?: string;
}

interface TransactionState {
    transactions: Transaction[];
    balance: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    balance: 0,
    status: 'idle',
    error: null,
};

export const fetchTransactions = createAsyncThunk<Transaction[], string>(
    'transactions/fetchTransactions',
    async (userId) => {
        const transactionsRef = collection(db, `users/${userId}/transactions`);
        const querySnapshot = await getDocs(transactionsRef);
        const transactions: Transaction[] = [];

        querySnapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() } as Transaction);
        });

        return transactions;
    }
);

export const addTransaction = createAsyncThunk<
    Transaction,
    { userId: string; transaction: Transaction }
>('transactions/addTransaction', async ({ userId, transaction }) => {
    const transactionsRef = collection(db, `users/${userId}/transactions`);
    const docRef = await addDoc(transactionsRef, transaction);
    return { id: docRef.id, ...transaction };
});

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        calculateBalance(state) {
            state.balance = state.transactions.reduce((total, transaction) => {
                if (transaction.categoryType === 'Доход') {
                    return total + transaction.amount;
                } else if (transaction.categoryType === 'Расход') {
                    return total - transaction.amount;
                }
                return total;
            }, 0);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchTransactions.fulfilled,
                (state, action: PayloadAction<Transaction[]>) => {
                    state.status = 'succeeded';
                    state.transactions = action.payload;
                    state.balance = action.payload.reduce(
                        (total, transaction) => {
                            if (transaction.categoryType === 'Доход') {
                                return total + transaction.amount;
                            } else if (transaction.categoryType === 'Расход') {
                                return total - transaction.amount;
                            }
                            return total;
                        },
                        0
                    );
                }
            )
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message || 'Ошибка при получении транзакций';
            })
            .addCase(
                addTransaction.fulfilled,
                (state, action: PayloadAction<Transaction>) => {
                    state.transactions.push(action.payload);
                    state.balance += action.payload.amount;
                }
            );
    },
});

export const { calculateBalance } = transactionSlice.actions;

export const selectTransactions = (state: RootState) =>
    state.transactions.transactions;
export const selectBalance = (state: RootState) => state.transactions.balance;

export default transactionSlice.reducer;
