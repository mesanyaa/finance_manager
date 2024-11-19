import { Layout } from '../../layout';
import { CustomSelect } from '../../../shared';

import { Button, Input, DatePicker } from 'antd';

const { TextArea } = Input;

import { transactionTypeOptions } from '../consts';

import styles from './styles.module.css';

const mockOptions: string[] = [
    'Option',
    'Option',
    'Option',
    'Option',
    'Option',
];

// TODO: вынести priceInput в shared (заметки скорее всего тоже в shared или widgets)

const AddPage = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>Добавить транзакцию</div>
                <div className={styles.pickers}>
                    <CustomSelect
                        placeholder="Вид транзакции"
                        options={transactionTypeOptions}
                    />
                    <CustomSelect
                        placeholder="Категория"
                        options={mockOptions}
                    />
                    <DatePicker placeholder="Дата" />
                </div>
                <div className={styles.price}>
                    <div className={styles.addPriceInputText}>Сумма</div>
                    <Input className={styles.addPriceInput}></Input>
                    <div className={styles.addPriceInputText}>₽</div>
                </div>
                <div className={styles.notes}>
                    <div className={styles.notesHeader}>Заметки</div>
                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </div>
                <Button className={styles.addButton}>Добавить</Button>
            </div>
        </Layout>
    );
};

export { AddPage };
