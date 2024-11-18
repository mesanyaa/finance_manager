import { FC } from 'react';
import classNames from 'classnames';

import expense from '../../../assets/expense.svg';
import income from '../../../assets/income.svg';

import styles from './styles.module.css';

interface TransactionsListItemProps {
    transactionType: string;
    category: string;
    date: string;
    amount: number;
}

const TransactionsListItem: FC<TransactionsListItemProps> = ({
    transactionType,
    category,
    date,
    amount,
}) => {
    return (
        <div
            className={classNames(
                styles.container,
                transactionType === 'Доход' ? styles.income : styles.expense
            )}
        >
            <img src={transactionType === 'Доход' ? income : expense} alt="" />
            <div>{transactionType}</div>
            <div>{category}</div>
            <div>{date}</div>
            <div>{amount}</div>
            <div className={styles.openNotes}>...</div>
        </div>
    );
};

export { TransactionsListItem };
