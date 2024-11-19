import { FC } from 'react';

import { TransactionsListItem } from '../../../shared/index';

import styles from './styles.module.css';

const mockTotal = 1000;

interface Transaction {
    categoryType: string;
    category: string;
    date: string;
    amount: number;
}

interface TransactionsListProps {
    items: Transaction[];
}

const TransactionsList: FC<TransactionsListProps> = ({ items }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>Список транзакций </div>
                <div>Все</div>
                <div>Итого: {mockTotal} ₽</div>
            </div>
            <div className={styles.list}>
                {items.map((item, index) => {
                    const { categoryType, category, date, amount } = item;
                    return (
                        <TransactionsListItem
                            key={index}
                            transactionType={categoryType}
                            category={category}
                            date={date}
                            amount={amount}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export { TransactionsList };
