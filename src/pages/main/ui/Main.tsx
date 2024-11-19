import { Link } from 'react-router-dom';

import { Layout } from '../../layout';

import { TransactionsList, PieChart, CustomTabs } from '../../../widgets';
import { ADD_ROUTE } from '../../../consts';

import { Button } from 'antd';
import type { TabsProps } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../../app/slices/transactionSlice';

import styles from './styles.module.css';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../../app/store';

const mockBalance = 1000;

const mockOnChange = (key: string) => {
    console.log(key);
};

const chart = <PieChart className={styles.chart} />;

const mockItems: TabsProps['items'] = [
    {
        key: '1',
        label: 'Доходы',
        children: chart,
    },
    {
        key: '2',
        label: 'Расходы',
        children: chart,
    },
];

const MainPage = () => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.uid;
    const dispatch: AppDispatch = useDispatch();
    const transactions = useSelector(
        (state: RootState) => state.transactions.transactions
    );
    const transactionStatus = useSelector(
        (state: RootState) => state.transactions.status
    );

    useEffect(() => {
        if (transactionStatus === 'idle') {
            dispatch(fetchTransactions(userId as string));
        }
    }, [transactionStatus, dispatch, userId]);

    return (
        <Layout>
            <div className={styles.scheduledPayment}></div>
            <div className={styles.balanceInfo}>
                <div className={styles.toScheduledPayment}>
                    Запланировать платёж
                </div>
                <div className={styles.walletBalance}>
                    Баланс кошелька: <span>{mockBalance} ₽</span>
                </div>
            </div>

            <CustomTabs
                items={mockItems}
                onChange={mockOnChange}
                className={styles.chartContainer}
            />

            <div className={styles.addButtonLinkContainer}>
                <Link to={ADD_ROUTE}>
                    <Button className={styles.addButton}>Добавить</Button>
                </Link>
            </div>

            <TransactionsList items={transactions} />
        </Layout>
    );
};

export { MainPage };
