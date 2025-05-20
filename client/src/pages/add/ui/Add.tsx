import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';

import { Layout } from '../../layout';
import { CustomSelect } from '../../../shared';

import { Button, Input, DatePicker } from 'antd';

const { TextArea } = Input;

import { transactionTypeOptions } from '../consts';

import styles from './styles.module.css';
import { addTransaction } from '../../../app/slices/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { CATEGORIES_ROUTE } from '../../../consts';
import { fetchCategories } from '../../../widgets/categoriesSidePanel/model/categoriesSlice';
import { Category } from '../../../widgets/categoriesSidePanel/model/categoriesSlice';

// TODO: вынести priceInput in shared (заметки скорее всего тоже в shared или widgets)

const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString('ru-RU');
};

interface Transaction {
    categoryType: string;
    category: string;
    amount: number;
    date: string;
    notes?: string;
    userId: string;
}

const AddPage = () => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.id as string;
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categoriesSidePanel.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const navigate = useNavigate();

    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');

    const filteredCategories = useMemo(() => {
        return categories.filter((cat: Category) => cat.type === transactionType.toLowerCase());
    }, [categories, transactionType]);

    const handleTransactionTypeChange = (value: SetStateAction<string>) => {
        setTransactionType(value as string);
        setCategory('');
    };

    const handleCategoryChange = (value: SetStateAction<string>) => {
        setCategory(value as string);
    };

    const handleDateChange = (date: SetStateAction<string>) => {
        setDate(date as string);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleNotesChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNotes(event.target.value);
    };

    const handleAddTransaction = () => {
        if (!transactionType || !category || !date || !amount) {
            notification.error({
                message: 'Ошибка',
                description: 'Пожалуйста, заполните все обязательные поля',
            });
            return;
        }

        const transaction: Omit<Transaction, 'id'> = {
            categoryType: transactionType,
            category,
            amount: Number(amount),
            date,
            notes,
            userId
        };

        dispatch(addTransaction(transaction));
        navigate('/');
    };

    return (
        <Layout>
            <div className={styles.addPage}>
                <h1>Добавить транзакцию</h1>
                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Тип транзакции</label>
                        <CustomSelect
                            value={transactionType}
                            onChange={handleTransactionTypeChange}
                            options={transactionTypeOptions}
                            placeholder="Выберите тип транзакции"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Категория</label>
                        <CustomSelect
                            value={category}
                            options={filteredCategories}
                            placeholder="Выберите категорию"
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Дата</label>
                        <DatePicker
                            onChange={(date) => handleDateChange(date?.toISOString() || '')}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Сумма</label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Введите сумму"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Заметки</label>
                        <TextArea
                            value={notes}
                            onChange={handleNotesChange}
                            placeholder="Введите заметки"
                            rows={4}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <Button type="primary" onClick={handleAddTransaction} block>
                            Добавить транзакцию
                        </Button>
                    </div>
                </div>
                <Link
                    to={CATEGORIES_ROUTE}
                    className={styles.addCategory}
                >
                    Добавить категорию
                </Link>
            </div>
        </Layout>
    );
};

export { AddPage };
