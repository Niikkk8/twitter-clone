import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase"
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { setAuthenticationStatus } from "@/redux/authenticationSlice";
interface SignUpData {
    signUpName: string;
    signUpUserName: string;
    signUpEmail: string;
    signUpPassword: string;
}

export default function SignUpForm() {
    const dispatch = useDispatch()
    const [loginInterface, setLoginInterface] = useState(false);
    const [formData, setFormData] = useState<SignUpData>({
        signUpName: "",
        signUpUserName: "",
        signUpEmail: "",
        signUpPassword: "",
    });

    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userCredentials = await createUserWithEmailAndPassword(
            auth, formData.signUpEmail, formData.signUpPassword
        )
        setFormData({
            signUpName: "",
            signUpUserName: "",
            signUpEmail: "",
            signUpPassword: "",
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return
            const userID = currentUser.email?.split("@")[0] || '';
            dispatch(
                setUser({
                    userID,
                    userName: null,
                    userEmail: currentUser.email || '',
                    userUID: currentUser.uid,
                    userPhotoURL: null
                }),
                setAuthenticationStatus({
                    isAuthenticated: true
                })
            );
        });
        return () => unsubscribe();
    }, []);


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
                                    value={formData.signUpName}
                                    onChange={handleSignUpChange}
                                    placeholder="Your Name"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="text"
                                    name="signUpUserName"
                                    value={formData.signUpUserName}
                                    onChange={handleSignUpChange}
                                    placeholder="Username"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="email"
                                    name="signUpEmail"
                                    value={formData.signUpEmail}
                                    onChange={handleSignUpChange}
                                    placeholder="E-mail"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="password"
                                    name="signUpPassword"
                                    value={formData.signUpPassword}
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
                        <form>
                            <div>
                                <input
                                    type="email"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    placeholder="E-mail"
                                />
                                <input
                                    type="password"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    placeholder="Password"
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