import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import '../styles/Login.css';
import { auth, db } from '../firebase/Init.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

const Login = ({ onLogin }) => {
    const [createName, setCreateName] = useState('');
    const [createUserName, setCreateUserName] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginInterface, setLoginInterface] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    function showLoginInterface() {
        setLoginInterface(!loginInterface);
    }

    const checkDocumentIdExists = async ({ documentId }) => {
        const docRef = doc(collection(db, 'userData'), documentId);
        try {
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch (error) {
            console.error('Error checking document existence:', error);
            return false;
        }
    }

    async function signIn() {
        const documentExists = await checkDocumentIdExists({ documentId: createUserName });
        if (documentExists) {
            setErrorMessage('Username already exists');
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, createEmail, createPassword);
                const user = userCredential.user;
                console.log(user);
                const userObj = {
                    userName: createName,
                    userEmail: createEmail,
                    userPassword: createPassword,
                    userID: createUserName,
                    userFollowers: [],
                    userFollowing: [],
                };
                const documentId = createUserName;
                const userDocRef = doc(collection(db, 'userData'), documentId);
                setSuccessMessage('Account Successfully Created');
                await setDoc(userDocRef, userObj);
                onLogin(user);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function logIn() {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((user) => {
                console.log(user);
                setSuccessMessage('Logged In successfully');
                onLogin(user);
            })
            .catch((error) => {
                setErrorMessage('Error Logging In');
                console.log(error);
            });
    }

    return (
        <div className="login_page-wrapper">
            <figure className="logo-wrapper">
                <img src={Logo} alt="" className="logo" />
            </figure>
            <div className="user_authentication-wrapper">
                <h1 className="user_authentication-title">Happening now!</h1>
                <h2 className="user_authentication-subtitle">Join today.</h2>
                <span id="error_message" style={{ display: `${(errorMessage === '') ? 'none' : 'inline'}` }}>{errorMessage}</span>
                <span id="successful_message" style={{ display: `${(successMessage === '') ? 'none' : 'inline'}` }}>{successMessage}</span>
                {loginInterface ?
                    (
                        <>
                            <form className="create_account-form" onSubmit={(event) => { event.preventDefault(); signIn(); }}>
                                <div className="create_account-input-wrapper">
                                    <input type="text" name="" id="create_name" placeholder="Your Name" onChange={(event) => setCreateName(event.target.value)} required/>
                                    <input type="text" name="" id="create_username" placeholder="Username" onChange={(event) => setCreateUserName(event.target.value.toLowerCase().replace(/\s/g, ''))} required/>
                                    <input type="email" name="" id="create_email" placeholder="E-mail" onChange={(event) => setCreateEmail(event.target.value)} required/>
                                    <input type="password" name="" id="create_password" placeholder="Password" onChange={(event) => setCreatePassword(event.target.value)} required/>
                                </div>
                                <button type="submit" className="create_account-submit">Sign up</button>
                            </form>
                            <div className="login_difference-wrapper">
                                <hr />
                                <p className="login_difference-text">OR</p>
                                <hr />
                            </div>
                            <span className="login_title">Already a member? <button className="login_create-button" onClick={showLoginInterface}>Sign-in</button></span>
                        </>
                    ) :
                    (
                        <>
                            <form className="login_form" onSubmit={(event) => { event.preventDefault(); logIn(); }}>
                                <div className="login_input-wrapper">
                                    <input type="email" name="" id="login_email" placeholder="E-mail" onChange={(event) => setLoginEmail(event.target.value)} />
                                    <input type="password" name="" id="login_password" placeholder="Password" onChange={(event) => setLoginPassword(event.target.value)} />
                                </div>
                                <button type="submit" className='login_submit'>Sign in</button>
                            </form>
                            <div className="login_difference-wrapper">
                                <hr />
                                <p className="login_difference-text">OR</p>
                                <hr />
                            </div>
                            <span className="login_title">New here? <button className="login_create-button" onClick={showLoginInterface}>Sign-up</button></span>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Login;