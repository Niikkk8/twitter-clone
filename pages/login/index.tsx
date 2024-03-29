"use client";

import React, { useState } from "react";

export default function Page() {
    const [loginInterface, setLoginInterface] = useState(false);

    function toggleLoginInterface() {
        setLoginInterface(!loginInterface);
    }

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
                        <form>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    className="w-[80%] border border-twitter-black p-2.5 m-1 rounded-lg focus:border-twitter-color outline-none"
                                    required
                                />
                                <input
                                    type="password"
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