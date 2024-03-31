import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

interface SignUpData {
    signUpName: string;
    signUpUserName: string;
    signUpEmail: string;
    signUpPassword: string;
}

interface LoginData {
    loginEmail: string,
    loginPassword: string
}

export default function SignUpForm() {
    const dispatch = useDispatch();
    const [loginInterface, setLoginInterface] = useState(false);
    const [signUpFormData, setSignUpFormData] = useState<SignUpData>({
        signUpName: "",
        signUpUserName: "",
        signUpEmail: "",
        signUpPassword: "",
    });

    const [loginFormData, setLoginFormData] = useState<LoginData>({
        loginEmail: "",
        loginPassword: ""
    });

    const db = getFirestore();

    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let transformedValue = value;
        if (name === 'signUpUserName') {
            transformedValue = value.trim().toLowerCase().replace(/\s/g, '');
        }
        setSignUpFormData((prevData) => ({
            ...prevData,
            [name]: transformedValue,
        }));
    };


    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { signUpName, signUpUserName, signUpEmail, signUpPassword } = signUpFormData;
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
            await setDoc(doc(db, "users", userCredentials.user.uid), {
                userID: signUpUserName,
                userName: signUpName,
                userEmail: signUpEmail,
                userPassword: signUpPassword,
                userPhotoURL: null
            });
            dispatch(
                setUser({
                    userID: signUpUserName,
                    userName: signUpName,
                    userEmail: signUpEmail,
                    userUID: userCredentials.user.uid,
                    userFollowers: [],
                    userFollowing: [],
                    userPosts: [],
                })
            );
            setSignUpFormData({
                signUpName: "",
                signUpUserName: "",
                signUpEmail: "",
                signUpPassword: "",
            });
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) return;
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            const userData = userDoc.data();
            if (!userData) return;
            dispatch(
                setUser({
                    userID: userData.userID || "",
                    userName: userData.userName || "",
                    userEmail: userData.userEmail || "",
                    userUID: currentUser.uid,
                    userFollowers: userData.userFollowers,
                    userFollowing: userData.userFollowing,
                    userPosts: userData.userPosts
                })
            );
        });
        return () => unsubscribe();
    }, []);

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(loginFormData);
        await signInWithEmailAndPassword(auth, loginFormData.loginEmail, loginFormData.loginPassword)
    }


    const toggleLoginInterface = () => {
        setLoginInterface(!loginInterface);
    };

    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center max-w-[1400px] m-auto h-screen">
            <figure className="w-[40%] mb-12 md:mb-2">
                <img src="/assets/logo.png" alt="Logo" />
            </figure>
            <div className="w-[80%] text-center md:w-[50%]">
                <h1 className="text-5xl md:text-7xl font-normal mb-6">Happening now!</h1>
                <h2 className="text-2xl md:text-4xl font-normal mb-4">Join today.</h2>
                {loginInterface ? (
                    <>
                        <form onSubmit={handleSignUpSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="signUpName"
                                    value={signUpFormData.signUpName}
                                    onChange={handleSignUpChange}
                                    placeholder="Your Name"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="text"
                                    name="signUpUserName"
                                    value={signUpFormData.signUpUserName}
                                    onChange={handleSignUpChange}
                                    placeholder="Username"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="email"
                                    name="signUpEmail"
                                    value={signUpFormData.signUpEmail}
                                    onChange={handleSignUpChange}
                                    placeholder="E-mail"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="password"
                                    name="signUpPassword"
                                    value={signUpFormData.signUpPassword}
                                    onChange={handleSignUpChange}
                                    placeholder="Password"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 text-medium bg-twitter-color w-[80%] py-2 text-white rounded-full border-[1px] border-twitter-color focus:bg-transparent focus:text-twitter-black"
                            >
                                Sign up
                            </button>
                        </form>
                        <div className="flex justify-around items-center w-[90%] mt-4 mb-2 m-auto">
                            <hr className="w-[40%]" />
                            <p>OR</p>
                            <hr className="w-[40%]" />
                        </div>
                        <span>
                            Already a member?
                            <button className="underline ml-2" onClick={toggleLoginInterface}>Sign-in</button>
                        </span>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleLoginSubmit}>
                            <div>
                                <input
                                    type="email"
                                    value={loginFormData.loginEmail}
                                    name="loginEmail"
                                    onChange={handleLoginChange}
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    placeholder="E-mail"
                                    required
                                />
                                <input
                                    type="password"
                                    name="loginPassword"
                                    value={loginFormData.loginPassword}
                                    onChange={handleLoginChange}
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 text-medium bg-twitter-color w-[80%] py-2 text-white rounded-full border-[1px] border-twitter-color focus:bg-transparent focus:text-twitter-black"
                            >
                                Sign in
                            </button>
                        </form>
                        <div className="flex justify-around items-center w-[90%] mt-4 mb-2 m-auto">
                            <hr className="w-[40%]" />
                            <p>OR</p>
                            <hr className="w-[40%]" />
                        </div>
                        <span className="text-[16px]">
                            New here?
                            <button className="underline ml-2" onClick={toggleLoginInterface}>
                                Sign-up
                            </button>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}