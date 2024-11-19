import { useEffect, useState } from 'react';
import { auth } from '../../../../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../../../app/slices/userSlice';
import { RootState } from '../../../app/store';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from '../../../consts';
import { Button, Input } from 'antd';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import styles from './styles.module.css';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({ uid: user.uid, email: user.email }));
            } else {
                dispatch(clearUser());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            console.log('Регистрация пользователя:', user.uid);

            const userData = {
                email: user.email,
            };
            await setDoc(doc(db, 'users', user.uid), userData);
            console.log('Данные пользователя добавлены в Firestore');

            dispatch(setUser({ uid: user.uid, email: user.email }));
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    };

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                const userData = {
                    email: user.email,
                };
                await setDoc(doc(db, 'users', user.uid), userData);
            }

            dispatch(setUser({ uid: user.uid, email: user.email }));
        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    };

    const logout = async () => {
        await signOut(auth);
        dispatch(clearUser());
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {user.uid ? (
                    <>
                        Добро пожаловать,{' '}
                        <span className={styles.headerEmail}>{user.email}</span>
                    </>
                ) : (
                    'Войдите или зарегистрируйтесь'
                )}
            </div>
            {user.uid ? (
                <div className={styles.buttonContainer}>
                    <Link to={MAIN_ROUTE} className={styles.linkToHomePage}>
                        Перейти на главную страницу
                    </Link>
                    <Button onClick={logout} className={styles.logoutButton}>
                        Выйти
                    </Button>
                </div>
            ) : (
                <div className={styles.loginFieldsContainer}>
                    <Input
                        className={styles.loginField}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        className={styles.loginField}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.loginButtons}>
                        <Button className={styles.loginButton} onClick={login}>
                            Войти
                        </Button>
                        <Button
                            className={styles.loginButton}
                            onClick={register}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export { AuthPage };
