/* eslint-disable @typescript-eslint/ban-types */
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import Column from '~/components/molecules/column'
import Row from '~/components/molecules/row'

type Props = {}

function ProfileDetailPage({ }: Props) {
  const { data: sessionData } = useSession()
  return (
    <div>
      {sessionData?.user ? (
        <Column gap="6">
          <div className='text-3xl font-bold'>Profile</div>
          <Row gap='6'>
            <div>
              <div className='relative w-24 h-24 overflow-hidden  rounded-full'>
                <Image
                  src={sessionData.user.image as ''}
                  alt=''
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div>
              <div className='text-xl font-bold'>
                {sessionData.user.name}
              </div>
              <div className='text-gray-500'>{sessionData.user.email}</div>
            </div>
          </Row>
        </Column>
      ) : ''}
    </div>
  )
}

export default ProfileDetailPage