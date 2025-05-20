import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, List, message } from 'antd';
import { addCategory, fetchCategories, deleteCategory } from '../model/categoriesSlice';
import { RootState, AppDispatch } from '../../../app/store';
import { Category } from '../model/categoriesSlice';
import styles from './styles.module.css';

interface CategoriesSidePanelProps {
    categoryType: 'expense' | 'income';
}

export const CategoriesSidePanel = ({ categoryType }: CategoriesSidePanelProps) => {
    const [newCategory, setNewCategory] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.categoriesSidePanel);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            await dispatch(addCategory({
                name: newCategory.trim(),
                type: categoryType
            }));
            setNewCategory('');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        await dispatch(deleteCategory(id));
    };

    const filteredCategories = categories.filter(cat => cat.type === categoryType);

    return (
        <div className={styles.categoriesPanel}>
            <div className={styles.addCategoryForm}>
                <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Название категории"
                    style={{ marginBottom: 8 }}
                />
                <Button 
                    type="primary" 
                    onClick={handleAddCategory} 
                    block
                    loading={loading}
                >
                    Добавить категорию
                </Button>
            </div>
            <List
                className={styles.categoriesList}
                loading={loading}
                dataSource={filteredCategories}
                renderItem={(category: Category) => (
                    <List.Item
                        actions={[
                            <Button 
                                type="link" 
                                danger 
                                onClick={() => handleDeleteCategory(category.id)}
                            >
                                Удалить
                            </Button>
                        ]}
                    >
                        {category.name}
                    </List.Item>
                )}
            />
        </div>
    );
};
