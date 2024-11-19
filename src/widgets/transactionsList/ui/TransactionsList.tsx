import { TransactionsListItem } from '../../../shared/index';

import styles from './styles.module.css';

const mockTotal = 1000;

const mockItems = [
    {
        transactionType: 'Расход',
        category: 'Категория',
        date: 'дд.мм.гг',
        amount: 1000,
    },
    {
        transactionType: 'Доход',
        category: 'Категория',
        date: 'дд.мм.гг',
        amount: 1000,
    },
];

const TransactionsList = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>Список транзакций </div>
                <div>Все</div>
                <div>Итого: {mockTotal} ₽</div>
            </div>
            <div className={styles.list}>
                {mockItems.map((item, index) => {
                    const { transactionType, category, date, amount } = item;
                    return (
                        <TransactionsListItem
                            key={index}
                            transactionType={transactionType}
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
