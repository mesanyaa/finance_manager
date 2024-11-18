import { FC } from 'react';
import classNames from 'classnames';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import styles from './styles.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Категория 1', 'Категория 2', 'Категория 3'],
    datasets: [
        {
            label: 'Сумма',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
        },
    ],
};

interface PieChartProps {
    className?: string;
}

const PieChart: FC<PieChartProps> = ({ className }) => {
    return (
        <div className={classNames(styles.chart, className)}>
            <Pie data={data} />
        </div>
    );
};

export { PieChart };
