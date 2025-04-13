import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../../firebaseConfig';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { RootState } from '../store';

interface ScheduledPayment {
    id?: string;
    date: string; // формат дд.мм.гг
    category: string;
    amount: number;
}

interface ScheduledPaymentsState {
    scheduledPayments: ScheduledPayment[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ScheduledPaymentsState = {
    scheduledPayments: [],
    status: 'idle',
};

export const fetchScheduledPayments = createAsyncThunk<
    ScheduledPayment[],
    string
>('scheduledPayments/fetchScheduledPayments', async (userId) => {
    const paymentsCollection = collection(
        db,
        `users/${userId}/scheduledPayments`
    );
    const snapshot = await getDocs(paymentsCollection);
    return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as ScheduledPayment)
    );
});

export const createScheduledPayment = createAsyncThunk<
    ScheduledPayment,
    { userId: string; payment: ScheduledPayment }
>('scheduledPayments/createScheduledPayment', async ({ userId, payment }) => {
    const paymentsCollection = collection(
        db,
        `users/${userId}/scheduledPayments`
    );
    const docRef = await addDoc(paymentsCollection, payment);
    return { id: docRef.id, ...payment };
});

export const deleteScheduledPayment = createAsyncThunk<
    void,
    { userId: string; id: string }
>('scheduledPayments/deleteScheduledPayment', async ({ userId, id }) => {
    const paymentDoc = doc(db, `users/${userId}/scheduledPayments`, id);
    await deleteDoc(paymentDoc);
});

const scheduledPaymentsSlice = createSlice({
    name: 'scheduledPayments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchScheduledPayments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchScheduledPayments.fulfilled,
                (state, action: PayloadAction<ScheduledPayment[]>) => {
                    state.status = 'idle';
                    state.scheduledPayments = action.payload;
                }
            )
            .addCase(fetchScheduledPayments.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(
                createScheduledPayment.fulfilled,
                (state, action: PayloadAction<ScheduledPayment>) => {
                    state.status = 'idle';
                    state.scheduledPayments.push(action.payload);
                }
            )
            .addCase(deleteScheduledPayment.fulfilled, (state, action) => {
                state.scheduledPayments = state.scheduledPayments.filter(
                    (payment) => payment.id !== action.meta.arg.id
                );
            });
    },
});

export const selectScheduledPayments = (state: RootState) =>
    state.scheduledPayments.scheduledPayments;

export default scheduledPaymentsSlice.reducer;
