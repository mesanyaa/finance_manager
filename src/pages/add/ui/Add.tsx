import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

import { Layout } from '../../layout';
import { CustomSelect } from '../../../shared';

import { Button, Input, DatePicker } from 'antd';

const { TextArea } = Input;

import { transactionTypeOptions } from '../consts';

import styles from './styles.module.css';
import { addTransaction } from '../../../app/slices/transactionSlice';
import {
    fetchCategories,
    selectCategories,
} from '../../../app/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { SetStateAction, useEffect, useState } from 'react';

// TODO: вынести priceInput в shared (заметки скорее всего тоже в shared или widgets)

const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString('ru-RU');
};

interface Transaction {
    categoryType: string;
    category: string;
    amount: number;
    date: string;
    notes?: string;
}

const AddPage = () => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.uid as string;
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector(selectCategories);

    const navigate = useNavigate();

    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');

    const handleTransactionTypeChange = (value: SetStateAction<string>) => {
        setTransactionType(value);
    };

    const handleCategoryChange = (value: SetStateAction<string>) => {
        setCategory(value);
    };

    const handleDateChange = (date: SetStateAction<string>) => {
        setDate(date);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleNotesChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNotes(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddTransaction = () => {
        if (!transactionType || !amount || !date) {
            notification.error({
                message: 'Ошибка',
                description: 'Пожалуйста, заполните все поля.',
            });
            return;
        }

        const newTransaction: Transaction = {
            categoryType: transactionType,
            category: 'Категория',
            amount: Number(amount),
            date: formatDate(date),
        };

        if (notes) newTransaction.notes = notes;

        dispatch(addTransaction({ userId, transaction: newTransaction }));

        navigate('/');

        notification.success({
            message: 'Успех',
            description: 'Транзакция успешно добавлена.',
        });
    };

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>Добавить транзакцию</div>
                <div className={styles.pickers}>
                    <CustomSelect
                        placeholder="Вид транзакции"
                        options={transactionTypeOptions}
                        onChange={handleTransactionTypeChange}
                    />
                    <CustomSelect
                        placeholder="Категория"
                        options={categories}
                        onChange={handleCategoryChange}
                    />
                    <DatePicker
                        placeholder="Дата"
                        onChange={handleDateChange}
                    />
                </div>
                <div className={styles.price}>
                    <div className={styles.addPriceInputText}>Сумма</div>
                    <Input
                        className={styles.addPriceInput}
                        value={amount}
                        onChange={handleAmountChange}
                    ></Input>
                    <div className={styles.addPriceInputText}>₽</div>
                </div>
                <div className={styles.notes}>
                    <div className={styles.notesHeader}>Заметки</div>
                    <TextArea
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={notes}
                        onChange={handleNotesChange}
                    />
                </div>
                <Button
                    className={styles.addButton}
                    onClick={handleAddTransaction}
                >
                    Добавить
                </Button>
            </div>
        </Layout>
    );
};

export { AddPage };
