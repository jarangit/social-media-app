/* eslint-disable @typescript-eslint/ban-types */
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import { AiOutlineLogin } from "react-icons/ai";

type Props = {}

const TopMenu = (props: Props) => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <div className="flex justify-end items-end p-3 border-b">
        <div className="flex gap-2 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={sessionData?.user.image ?? ''}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div onClick={() => void signIn()} className='rounded-full p-1 cursor-pointer hover:bg-black hover:text-white'>
            <>
              <AiOutlineLogin size={30} />
            </>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TopMenu