import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import '../styles/Login.css';
import { auth, db } from '../firebase/Init.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const Login = () => {
    const [createName, setCreateName] = useState({});
    const [createUserName, setCreateUserName] = useState({});
    const [createEmail, setCreateEmail] = useState({});
    const [createPassword, setCreatePassword] = useState({});
    const [loginEmail, setLoginEmail] = useState({});
    const [loginPassword, setLoginPassword] = useState({});
    const [loginInterface, setLoginInterface] = useState(false);

    function showLoginInterface() {
        setLoginInterface(!loginInterface);
    }

    function signIn() {
        createUserWithEmailAndPassword(auth, createEmail, createPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                const userObj = {
                    Name: createName,
                    Email: createEmail,
                    Password: createPassword,
                    Username: createUserName,
                };

                // Generate a unique document ID based on the username
                const documentId = createUserName; // You can use any logic to generate a unique ID

                // Reference to the 'userData' collection and the generated document ID
                const userDocRef = doc(collection(db, "userData"), documentId);

                // Set the document with the provided data
                setDoc(userDocRef, userObj)
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    function logIn() {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="login_page-wrapper">
            <figure className="logo-wrapper">
                <img src={Logo} alt="" className="logo" />
            </figure>
            <div className="user_authentication-wrapper">
                <h1 className="user_authentication-title">Happening now!</h1>
                <h2 className="user_authentication-subtitle">Join today.</h2>
                <span id="error_message"></span>
                <span id="successful_message"></span>
                {loginInterface ?
                    (
                        <>
                            <form className="create_account-form" onSubmit={(event) => { event.preventDefault(); signIn(); }}>
                                <div className="create_account-input-wrapper">
                                    <input type="text" name="" id="create_name" placeholder="Your Name" onChange={(event) => setCreateName(event.target.value)} />
                                    <input type="text" name="" id="create_username" placeholder="Username" onChange={(event) => setCreateUserName(event.target.value)} />
                                    <input type="email" name="" id="create_email" placeholder="E-mail" onChange={(event) => setCreateEmail(event.target.value)} />
                                    <input type="password" name="" id="create_password" placeholder="Password" onChange={(event) => setCreatePassword(event.target.value)} />
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
                                <button type="submit">Sign in</button>
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