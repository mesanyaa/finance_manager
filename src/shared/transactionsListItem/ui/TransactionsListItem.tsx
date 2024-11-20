import { FC } from 'react';
import classNames from 'classnames';

import expense from '../../../assets/expense.svg';
import income from '../../../assets/income.svg';

import { TRANSACTION_TYPE_INCOME } from '../consts';

import { notification } from 'antd';

import styles from './styles.module.css';

interface TransactionsListItemProps {
    transactionType: string;
    category: string;
    date: string;
    amount: number;
    notes?: string;
}

const TransactionsListItem: FC<TransactionsListItemProps> = ({
    transactionType,
    category,
    date,
    amount,
    notes,
}) => {
    const openNotification = (type: 'success' | 'error', message: string) => {
        notification[type]({
            message: message,
            placement: 'topRight',
        });
    };

    const openNotes = () => {
        if (notes) {
            openNotification('success', notes);
        } else {
            openNotification(
                'error',
                'У данной транзакции нет заметок'
            );
        }
    };

    return (
        <div
            className={classNames(
                styles.container,
                transactionType === TRANSACTION_TYPE_INCOME
                    ? styles.income
                    : styles.expense
            )}
        >
            <img
                src={
                    transactionType === TRANSACTION_TYPE_INCOME
                        ? income
                        : expense
                }
                alt="transactionType"
            />
            <div>{transactionType}</div>
            <div>{category}</div>
            <div>{date}</div>
            <div>
                {transactionType === TRANSACTION_TYPE_INCOME
                    ? amount
                    : -1 * amount}{' '}
                ₽
            </div>
            <div className={styles.openNotes} onClick={openNotes}>
                ...
            </div>
        </div>
    );
};

export { TransactionsListItem };
