import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCategory,
    fetchCategories,
    selectCategories,
} from '../../../app/slices/categorySlice';
import { CategoriesItem } from '../../../shared/index';
import styles from './styles.module.css';
import { AppDispatch, RootState } from '../../../app/store';

import { notification } from 'antd';

interface CategoriesSidePanelProps {
    categoryType: 'Доходы' | 'Расходы';
}

const CategoriesSidePanel: FC<CategoriesSidePanelProps> = ({
    categoryType,
}) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.uid as string;
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories(userId));
    }, [dispatch, userId]);

    const filteredCategories = categories.filter(
        (category) => category.categoryType === categoryType
    );

    const openNotification = (type: 'success' | 'error', message: string) => {
        notification[type]({
            message: message,
            placement: 'topRight',
        });
    };

    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            const newCategory = {
                category: newCategoryName,
                categoryType: categoryType,
            };
            dispatch(createCategory({ userId, category: newCategory }))
                .unwrap()
                .then(() => {
                    openNotification('success', 'Категория успешно добавлена!');
                    setNewCategoryName('');
                })
                .catch(() => {
                    openNotification(
                        'error',
                        'Произошла ошибка при добавлении категории.'
                    );
                });
        } else {
            openNotification(
                'error',
                'Пожалуйста, заполните поле имени категории.'
            );
        }
    };

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
                <Input
                    className={styles.addCategoryInput}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button
                    className={styles.addCategoryButton}
                    onClick={handleAddCategory}
                >
                    Добавить
                </Button>
            </div>
            <div className={styles.existingСategories}>
                <div className={styles.existingСategoriesText}>
                    Существующие категории
                </div>
                <div className={styles.existingСategoriesList}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <CategoriesItem
                                categoryName={category.category}
                                key={category.id}
                            />
                        ))
                    ) : (
                        <span className={styles.noCategories}>
                            Вы пока не добавили ни одной категории
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export { CategoriesSidePanel };
