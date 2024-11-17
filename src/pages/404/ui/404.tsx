import { Link } from 'react-router-dom';

import styles from './styles.module.css';

const Page404 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.errorCode}>404</div>
                <div className={styles.errorText}>
                    Похоже страница с таким url не найдена
                </div>
                <Link to="/" className={styles.linkToHomePage}>
                    нажмите, чтобы перейти на главную
                </Link>
            </div>
        </div>
    );
};

export { Page404 };
