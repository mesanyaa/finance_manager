import { Link } from 'react-router-dom';

import { Layout } from '../../layout';

import { TransactionsList, PieChart, CustomTabs } from '../../../widgets';
import { ADD_ROUTE } from '../../../consts';

import { Button, Modal, Form, Input } from 'antd';
import type { TabsProps } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTransactions,
    selectBalance,
} from '../../../app/slices/transactionSlice';

import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '../../../app/store';
import {
    createScheduledPayment,
    fetchScheduledPayments,
    selectScheduledPayments,
} from '../../../app/slices/scheduledPaymentsSlice';

const mockItems: TabsProps['items'] = [
    {
        key: '1',
        label: 'Доходы',
        children: <PieChart className={styles.chart} categoryType="Доходы" />,
    },
    {
        key: '2',
        label: 'Расходы',
        children: <PieChart className={styles.chart} categoryType="Расходы" />,
    },
];

const MainPage = () => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.id;

    const dispatch: AppDispatch = useDispatch();

    const scheduledPayments = useSelector(selectScheduledPayments);
    const [newPayment, setNewPayment] = useState({
        date: '15.11.2024',
        category: 'category',
        amount: 150,
    });

    useEffect(() => {
        if (userId) {
            dispatch(fetchScheduledPayments());
        }
    }, [dispatch, userId]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddPayment = () => {
        if (newPayment.date && newPayment.category && newPayment.amount > 0) {
            dispatch(createScheduledPayment(newPayment));
            setNewPayment({ date: '', category: '', amount: 0 });
            setIsModalVisible(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const transactions = useSelector(
        (state: RootState) => state.transactions.transactions
    );
    const transactionStatus = useSelector(
        (state: RootState) => state.transactions.status
    );

    useEffect(() => {
        if (transactionStatus === 'idle' && userId) {
            dispatch(fetchTransactions());
        }
    }, [transactionStatus, dispatch, userId]);

    const balance = useSelector(selectBalance);

    return (
        <Layout>
            <div className={styles.scheduledPaymentContainer}>
                {scheduledPayments.length > 0
                    ? scheduledPayments.map((payment, key) => (
                          <div
                              key={key}
                              className={styles.scheduledPayment}
                          >
                              <div className={styles.scheduledPaymentField}>
                                  Напоминание о регулярном платеже
                              </div>
                              <div className={styles.scheduledPaymentField}>
                                  Вам необходимо совершить транзакцию в
                                  категории {payment.category} на сумму{' '}
                                  {payment.amount} ₽
                              </div>
                              <div className={styles.scheduledPaymentField}>
                                  Дата: {payment.date}
                              </div>
                          </div>
                      ))
                    : null}
            </div>
            <div className={styles.balanceInfo}>
                <div
                    className={styles.toScheduledPayment}
                    onClick={handleOpenModal}
                >
                    Запланировать платёж
                </div>
                <div className={styles.walletBalance}>
                    Баланс кошелька: <span>{balance} ₽</span>
                </div>
            </div>

            {transactions.length > 0 ? (
                <CustomTabs
                    items={mockItems}
                    className={styles.chartContainer}
                />
            ) : null}

            <div className={styles.addButtonLinkContainer}>
                <Link to={ADD_ROUTE}>
                    <Button className={styles.addButton}>Добавить</Button>
                </Link>
            </div>

            <TransactionsList items={transactions} />

            <Modal
                title="Добавить запланированный платёж"
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleAddPayment}>
                    <Form.Item label="Дата" required>
                        <Input
                            value={newPayment.date}
                            onChange={(e) =>
                                setNewPayment({
                                    ...newPayment,
                                    date: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Категория" required>
                        <Input
                            value={newPayment.category}
                            onChange={(e) =>
                                setNewPayment({
                                    ...newPayment,
                                    category: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Сумма" required>
                        <Input
                            type="number"
                            value={newPayment.amount}
                            onChange={(e) =>
                                setNewPayment({
                                    ...newPayment,
                                    amount: Number(e.target.value),
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export { MainPage };
