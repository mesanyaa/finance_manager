import { FC } from 'react';

import { Select } from 'antd';

interface CustomSelectProps {
    options: string[];
    placeholder: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ options, placeholder }) => {
    return (
        <Select placeholder={placeholder} style={{ height: '40px' }}>
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
