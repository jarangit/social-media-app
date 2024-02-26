/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react'
import Column from '../molecules/column'
import Row from '../molecules/row'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'

type Props = {}

const BoxSharePost = (props: Props) => {
  const { data: sessionData } = useSession();
  const [content, setContent] = useState('')
  const createTweet = api.tweet.create.useMutation()

  const onCreateTweet = (value: string) => {
    createTweet.mutate({
      content: value
    })
  }
  return (
    <div className='border-b pb-3'>
      <Column gap={"3"}>
        <Row gap='3' className=' w-full'>
          <div className="relative min-w-10 min-h-10 rounded-full overflow-hidden">
            <Image
              src={sessionData?.user.image ?? ''}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} name="" id="" placeholder='Share something...' rows={1} className='w-full border p-3 rounded-full'></textarea>
        </Row>
        <div className='w-ful text-right'>
          <button
            onClick={() => onCreateTweet(content)}
          >Post</button>
        </div>
      </Column>
    </div>
  )
}

export default BoxSharePost