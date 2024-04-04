'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faMagnifyingGlass,
    faBell,
    faEnvelope,
    faUser,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";


export default function Sidebar() {
    const pathname = usePathname();
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)

    async function handleSignOut() {
        await signOut(auth)
        dispatch(signOutUser())
    }
    return (
        <div className="fixed bg-white bottom-0 sm:static sm:pt-8 sm:pl-6 w-full sm:border-r sm:h-screen sm:border-twitter-extra-light-gray sm:w-[20%] sm:min-w-fit sm:pr-2 z-10">
            <div className="hidden sm:flex mb-2 p-3">
                <Image src="/assets/logo.png" alt="Logo" width={48} height={48} className="m-auto lg:ml-2" />
            </div>
            <nav className="flex justify-around border-t pt-4 mb-4 border-twitter-extra-light-gray sm:border-none sm:flex-col">
                <SidebarLink link="/" text="Home" iconName="house" active={pathname.endsWith('/')} />
                <SidebarLink link="/explore" text="Explore" iconName="magnifyingGlass" active={pathname.includes('/explore')} />
                <SidebarLink link="/messages" text="Messages" iconName="envelope" active={pathname.endsWith('/messages')} />
                <SidebarLink link="/notifications" text="Notifications" iconName="bell" active={pathname.includes('/notifications')} />
                <SidebarLink link={`/profile/${user.userID}`} text="Profile" iconName="user" active={pathname.endsWith(`/profile/${user.userID}`)} />
            </nav>
            <button className="hidden lg:inline text-center text-white ml-2 bg-twitter-color w-[220px] p-[12px] rounded-[40px] mt-2">
                Tweet
            </button>
            <div onClick={handleSignOut} className="hidden sm:flex absolute bottom-4 justify-between items-center p-4 space-x-4 px-4 hover:bg-twitter-extra-light-gray hover:bg-opacity-70 rounded-full cursor-pointer">
                <img src="/assets/demo_profile-picture.jpg" className="w-12 h-12 rounded-full object-cover" alt="" />
                <div className="hidden lg:block">
                    <h2 className="font-bold text-lg whitespace-nowrap">{user.userName}</h2>
                    <h3 className="color-twitter-gray">@{user.userID}</h3>
                </div>
                <FontAwesomeIcon icon={faEllipsis} className="hidden lg:block" />
            </div>
        </div>
    );
}

function SidebarLink({ link, text, iconName, active }: { link: string, text: string; iconName: string, active: boolean }) {
    const iconComponents: { [key: string]: any } = {
        house: faHouse,
        magnifyingGlass: faMagnifyingGlass,
        envelope: faEnvelope,
        bell: faBell,
        user: faUser,
    };
    const iconComponent = iconComponents[iconName];
    return (
        <Link
            href={link}
            className={`flex items-center text-2xl space-x-4 px-6 lg:pl-4 py-3.5 m-auto lg:ml-2 navHoverAnimation w-fit ${active ? 'text-twitter-color' : ''}`} >
            <FontAwesomeIcon icon={iconComponent} height={30} className="p-0.5" />
            <span className="hidden lg:inline font-bold">{text}</span>
        </Link >
    );
}
