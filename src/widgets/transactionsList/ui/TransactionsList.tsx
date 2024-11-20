import { FC } from 'react';

import { TransactionsListItem } from '../../../shared/index';

import { selectBalance } from '../../../app/slices/transactionSlice';

import styles from './styles.module.css';
import { useSelector } from 'react-redux';

interface Transaction {
    categoryType: string;
    category: string;
    date: string;
    amount: number;
    notes?: string;
}

interface TransactionsListProps {
    items: Transaction[];
}

const TransactionsList: FC<TransactionsListProps> = ({ items }) => {
    const balance = useSelector(selectBalance);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>Список транзакций </div>
                <div>Все</div>
                <div>Итого: {balance} ₽</div>
            </div>
            <div className={styles.list}>
                {items.length > 0 ? (
                    items.map((item, index) => {
                        const { categoryType, category, date, amount, notes } = item;
                        return (
                            <TransactionsListItem
                                key={index}
                                transactionType={categoryType}
                                category={category}
                                date={date}
                                amount={amount}
                                notes={notes}
                            />
                        );
                    })
                ) : (
                    <span className={styles.noTransactions}>
                        Вы ещё не добавили транзакций
                    </span>
                )}
            </div>
        </div>
    );
};

export { TransactionsList };
