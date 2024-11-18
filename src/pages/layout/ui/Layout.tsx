import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import userIcon from '../../../assets/user-icon.svg';
import logo from '../../../assets/logo.svg';

import styles from './styles.module.css';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to="/" className={styles.clickable}>
                    <img src={logo} alt="" className={styles.icon} />
                </Link>
                <img
                    src={userIcon}
                    alt=""
                    className={classNames(styles.clickable, styles.icon)}
                />
            </div>
            {children}
        </div>
    );
};

export { Layout };
