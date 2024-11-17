import { FC } from 'react';

import trashBin from '../../../assets/trash-bin.svg';

import styles from './styles.module.css';

interface CategoriesItemProps {
    categoryName: string;
}

const CategoriesItem: FC<CategoriesItemProps> = ({ categoryName }) => {
    return (
        <div className={styles.container}>
            <div className={styles.categoryName}>{categoryName}</div>
            <img src={trashBin} alt="" className={styles.trashBin} />
        </div>
    );
};

export { CategoriesItem };
