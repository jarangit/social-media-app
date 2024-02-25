/* eslint-disable @typescript-eslint/ban-types */
import { useSession } from 'next-auth/react';
import React from 'react'
import { data } from 'tailwindcss/defaultTheme';
import LayoutLogged from './layout-logged';

type Props = {
  children: JSX.Element;
}

const LayoutWrapper = ({ children }: Props) => {
  const { data: sessionData } = useSession();
  console.log(sessionData)
  return (
    <div>
      {sessionData ? (
        <LayoutLogged>
          {children}
        </LayoutLogged>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  )
}

export default LayoutWrapper