import { FC } from 'react';
import classNames from 'classnames';

import { Button, Input } from 'antd';

import { CategoriesItem } from '../../../shared/index';

import styles from './styles.module.css';

interface CategoriesSidePanelProps {
    categoryType: 'Доходы' | 'Расходы';
}

const mockCategories: string[] = [
    'Категория 1',
    'Категория 2',
    'Категория 3',
    'Категория 4',
];

const CategoriesSidePanel: FC<CategoriesSidePanelProps> = ({
    categoryType,
}) => {
    return (
        <div className={styles.container}>
            <div
                className={classNames(
                    styles.header,
                    categoryType === 'Доходы'
                        ? styles.greenHeader
                        : styles.redHeader
                )}
            >
                {categoryType}
            </div>
            <div className={styles.addCategory}>
                <div className={styles.addCategoryText}>Название</div>
                <Input className={styles.addCategoryInput} />
                <Button className={styles.addCategoryButton}>Добавить</Button>
            </div>
            <div className={styles.existingСategories}>
                <div className={styles.existingСategoriesText}>
                    Существующие категории
                </div>
                <div className={styles.existingСategoriesList}>
                    {mockCategories.map((category, index) => {
                        return (
                            <CategoriesItem
                                categoryName={category}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export { CategoriesSidePanel };
