import { FC, SetStateAction } from 'react';

import { Select } from 'antd';

import styles from './styles.module.css';

interface Category {
    id: string;
    categoryType: string;
    category: string;
}

interface CustomSelectProps {
    options: Category[] | string[];
    placeholder: string;
    onChange: (value: SetStateAction<string>) => void;
}

type OptionType = string | Category;

const isCategory = (option: OptionType): option is Category => {
    return (
        typeof option === 'object' && option !== null && 'category' in option
    );
};

const CustomSelect: FC<CustomSelectProps> = ({
    options,
    placeholder,
    onChange,
}) => {
    return (
        <Select
            placeholder={placeholder}
            className={styles.customSelect}
            onChange={onChange}
        >
            {options.map((option, index) => {
                const value =
                    typeof option === 'string' ? option : option.category;
                return (
                    <Select.Option key={index} value={value}>
                        {isCategory(option) ? option.category : option}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export { CustomSelect };
