import { Link } from 'react-router-dom';

import { Layout } from '../../layout';

import { TransactionsList, PieChart, CustomTabs } from '../../../widgets';

import { Button } from 'antd';
import type { TabsProps } from 'antd';

import styles from './styles.module.css';

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
                <Link to="/add">
                    <Button className={styles.addButton}>Добавить</Button>
                </Link>
            </div>
            <TransactionsList />
        </Layout>
    );
};

export { MainPage };
