/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import TopMenu from './top-menu'
import { TbSocial } from 'react-icons/tb'
import { IoHomeOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineLogin } from 'react-icons/ai'
import SideMenu from './side-menu'

type Props = {
  children: JSX.Element
}

const LayoutLogged = ({ children }: Props) => {
  return (
    <div className='my-container'>
      <div className='grid grid-cols-5'>
        <div className='  hidden md:block col-span-1 border-r'>
          <SideMenu />
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