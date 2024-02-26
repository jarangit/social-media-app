/* eslint-disable @typescript-eslint/ban-types */
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { IoHomeOutline } from 'react-icons/io5'
import { TbSocial } from 'react-icons/tb'

type Props = {}


const SideMenu = (props: Props) => {
  const { data: sessionData } = useSession()
  const menus = [
    {
      text: 'Home',
      url: '/',
      icon: <IoHomeOutline size={25} />
    },
    {
      text: 'Profile',
      url: `/profiles/${sessionData?.user.id}`,
      icon: <CgProfile size={25} />
    },
    {
      text: 'Logout',
      url: '/logout',
      icon: <AiOutlineLogin size={25} />
    },
  ]
  return (
    <div>
      <div className='min-h-screen p-3 px-6'>
        <div className='text-center w-full flex justify-center'>
          <TbSocial size={50} />
        </div>
        <ul className='mt-6 flex flex-col gap-6 '>
          {menus.map((item, key) => (
            <React.Fragment key={key}>
              <li>
                <Link href={item.url}>
                  <div className='flex gap-3 items-center'>
                    <div>{item.icon}</div>
                    <div>{item.text}</div>
                  </div>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideMenu