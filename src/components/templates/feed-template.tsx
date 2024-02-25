/* eslint-disable @typescript-eslint/ban-types */
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import Row from '../molecules/row';
import Column from '../molecules/column';
import BoxSharePost from '../organisms/box-share-post';
import { mockDataPosts } from '~/mock-data/mock-post';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';
import { TbSocial } from 'react-icons/tb';

type Props = {}

const FeedTemplate = (props: Props) => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <BoxSharePost />

      {/* feed */}
      <Column className='gap-14 pt-6'>
        {mockDataPosts.map((item, key) => (
          <>
            <Column gap='3' className='border-b pb-6'>
              <Row>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={`${item.image}${item.id}`}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <Column gap='0'>
                  <div className='font-bold'>{item.first_name} {item.last_name}</div>
                  <div className='text-gray-400 text-sm'>1 jun 2024</div>
                </Column>
              </Row>
              <div>{item.postConent}</div>
              <Row gap='3'>
                <Row>
                  <FaRegHeart />
                  <div>25</div>
                </Row>
                <Row>
                  <TbSocial />
                  <div>25</div>
                </Row>
              </Row>
            </Column>
          </>
        ))}
      </Column>

    </div>
  )
}

export default FeedTemplate