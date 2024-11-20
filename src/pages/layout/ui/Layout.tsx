import { FC, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import userIcon from '../../../assets/user-icon.svg';
import logo from '../../../assets/logo.svg';
import { AUTH_ROUTE, MAIN_ROUTE } from '../../../consts';

import styles from './styles.module.css';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    const redirectToAuthPage = () => {
        navigate(AUTH_ROUTE)
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to={MAIN_ROUTE} className={styles.clickable}>
                    <img src={logo} alt="logotype" className={styles.icon} />
                </Link>
                <img
                    src={userIcon}
                    alt="user"
                    className={classNames(styles.clickable, styles.icon)}
                    onClick={redirectToAuthPage}
                />
            </div>
            {children}
        </div>
    );
};

export { Layout };
