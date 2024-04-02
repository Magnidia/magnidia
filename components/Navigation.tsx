"use client";
import Image from 'next/image';

import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
    const {data, status} = useSession();

    const signedIn = status === "authenticated";

    return ( 
        <div className=" pl-4 flex flex-row gap-4 justify-between w-full bg-[#1973C5]  p-4 ">
            <div className='flex flex-row gap-4'>
            <Image src={"/logo_square.png"} width={50} height={50} alt='Logo'/>
            <div className='inline-block align-middle text-xl text-white font-semibold pt-2'>
                Magnidia
            </div>
            </div>
            <div className='flex flex-row gap-4'>
            {signedIn && <div className='flex flex-row px-4 gap-4 '>
                <Image src={data!.user?.image!} width={50} height={50} alt='Profile' className='rounded-full' />
            <div className='text-white pt-2 text-xl'>
                Hello, {data!.user?.name?.split(" ")[0]}

                </div></div>} 
            <button onClick={() => {
                if (signedIn) {
                    signOut()
                } else
                signIn('google')
                }} className='bg-white text-black p-2 rounded-md hover:bg-white/80 transition-all'>
                {signedIn ? <div>
                    Sign out
                </div> : <div>Sign In</div>}
                </button>
            
                </div>
        </div>  
     );
}
 
export default NavBar;