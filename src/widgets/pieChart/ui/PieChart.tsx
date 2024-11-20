import { FC } from 'react';
import classNames from 'classnames';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import styles from './styles.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    className?: string;
    categoryType: 'Доходы' | 'Расходы';
}

const PieChart: FC<PieChartProps> = ({ className, categoryType }) => {
    const transactions = useSelector(
        (state: RootState) => state.transactions.transactions
    );

    const filteredTransactions = transactions.filter(
        (transaction) =>
            (categoryType === 'Доходы' &&
                transaction.categoryType === 'Доход') ||
            (categoryType === 'Расходы' &&
                transaction.categoryType === 'Расход')
    );

    const categorySums = filteredTransactions.reduce((acc, transaction) => {
        acc[transaction.category] =
            (acc[transaction.category] || 0) + transaction.amount;
        return acc;
    }, {} as Record<string, number>);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const colors = Object.keys(categorySums).map(() => getRandomColor());

    const data = {
        labels: Object.keys(categorySums),
        datasets: [
            {
                label: 'Сумма',
                data: Object.values(categorySums),
                backgroundColor: colors,
            },
        ],
    };

    return (
        <div className={classNames(styles.chart, className)}>
            <Pie data={data} />
        </div>
    );
};

export { PieChart };
