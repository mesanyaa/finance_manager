// categoriesSlice.ts
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

export const fetchCategories = createAsyncThunk<Category[], string>(
    'categories/fetchCategories',
    async (userId) => {
        const categoriesCollection = collection(
            db,
            `users/${userId}/categories`
        );
        const snapshot = await getDocs(categoriesCollection);
        return snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Category)
        );
    }
);

export const createCategory = createAsyncThunk<
    Category,
    { userId: string; category: Category }
>('categories/createCategory', async ({ userId, category }) => {
    const categoriesCollection = collection(db, `users/${userId}/categories`);
    const docRef = await addDoc(categoriesCollection, category);
    return { id: docRef.id, ...category };
});

export const deleteCategory = createAsyncThunk<
    void,
    { userId: string; id: string }
>('categories/deleteCategory', async ({ userId, id }) => {
    const categoryDoc = doc(db, `users/${userId}/categories`, id);
    await deleteDoc(categoryDoc);
});

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
                    (category) => category.id !== action.meta.arg.id
                );
            });
    },
});

export const selectCategories = (state: RootState) =>
    state.categories.categories;

export default categorySlice.reducer;
