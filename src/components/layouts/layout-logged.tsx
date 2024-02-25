/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import TopMenu from './top-menu'
import { TbSocial } from 'react-icons/tb'
import { IoHomeOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineLogin } from 'react-icons/ai'

type Props = {
  children: JSX.Element
}

const LayoutLogged = ({ children }: Props) => {
  return (
    <div className='my-container'>
      <div className='grid grid-cols-5'>
        <div className='  hidden md:block col-span-1 border-r'>
          <div className='min-h-screen p-3 px-6'>
            <div className='text-center w-full flex justify-center'>
              <TbSocial size={50} />
            </div>
            <ul className='mt-6 flex flex-col gap-6 '>
              <li>
                <div className='flex gap-3 items-center'>
                  <div><IoHomeOutline size={25} /></div>
                  <div>Home</div>
                </div>
              </li>
              <li>
                <div className='flex gap-3 items-center'>
                  <div><CgProfile size={25} /></div>
                  <div>Profile</div>
                </div>
              </li>
              <li>
                <div className='flex gap-3 items-center'>
                  <div><AiOutlineLogin size={25} /></div>
                  <div>Logout</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-span-5 md:col-span-4 '>
          <TopMenu />
          <div className='max-h-[90vh] p-6 overflow-y-scroll'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutLogged