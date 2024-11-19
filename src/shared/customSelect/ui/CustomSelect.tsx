import { FC } from 'react';

import { Select } from 'antd';

import styles from './styles.module.css';

interface CustomSelectProps {
    options: string[];
    placeholder: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ options, placeholder }) => {
    return (
        <Select placeholder={placeholder} className={styles.customSelect}>
            {options.map((option, index) => {
                return (
                    <Select.Option key={index} value={option}>
                        {option}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export { CustomSelect };
