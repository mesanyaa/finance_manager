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

interface Category {
    id?: string;
    categoryType: string;
    category: string;
}

interface CategoryState {
    categories: Category[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CategoryState = {
    categories: [],
    status: 'idle',
};

export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async () => {
        const categoriesCollection = collection(db, 'categories');
        const snapshot = await getDocs(categoriesCollection);
        return snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Category)
        );
    }
);

export const createCategory = createAsyncThunk<Category, Category>(
    'categories/createCategory',
    async (category) => {
        const categoriesCollection = collection(db, 'categories');
        const docRef = await addDoc(categoriesCollection, category);
        return { id: docRef.id, ...category };
    }
);

export const deleteCategory = createAsyncThunk<void, string>(
    'categories/deleteCategory',
    async (id) => {
        const categoryDoc = doc(db, 'categories', id);
        await deleteDoc(categoryDoc);
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCategories.fulfilled,
                (state, action: PayloadAction<Category[]>) => {
                    state.status = 'idle';
                    state.categories = action.payload;
                }
            )
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(
                createCategory.fulfilled,
                (state, action: PayloadAction<Category>) => {
                    state.status = 'idle';
                    state.categories.push(action.payload);
                }
            )
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (category) => category.id !== action.meta.arg
                );
            });
    },
});

export const selectCategories = (state: RootState) =>
    state.categories.categories;

export default categorySlice.reducer;
