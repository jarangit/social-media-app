/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import Column from '../molecules/column'
import Row from '../molecules/row'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

type Props = {}

const BoxSharePost = (props: Props) => {
  const { data: sessionData } = useSession();
  return (
    <div className='border-b pb-3'>
      <Column gap={"3"}>
        <Row gap='3' className=' w-full'>
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={sessionData?.user.image ?? ''}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <textarea name="" id="" placeholder='Share something...' rows={1} className='w-full border p-3 rounded-full'></textarea>
        </Row>
        <div className='w-ful text-right'>
          <button>Post</button>
        </div>
      </Column>
    </div>
  )
}

export default BoxSharePost