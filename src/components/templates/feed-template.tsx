/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Row from '../molecules/row';
import Column from '../molecules/column';
import BoxSharePost from '../organisms/box-share-post';
import { mockDataPosts } from '~/mock-data/mock-post';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';
import { TbSocial } from 'react-icons/tb';
import { api } from '~/utils/api';

type Props = {}

const FeedTemplate = (props: Props) => {
  const { data: sessionData } = useSession();
  const [tweetsData, setTweetsData] = useState<any>()
  console.log('%cMyProject%cline:22%ctweetsData', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(217, 104, 49);padding:3px;border-radius:2px', tweetsData)
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    {
      // getNextPageParam: (lastPage) => lastPage?.nextCursor
    }
  )

  console.log(tweets.data?.pages[0]?.tweets)

  // const onGetTweets = async () => {
  //   const res = await tweets
  //   if (res) {
  //     setTweetsData(tweets.data?.pages)
  //   }
  // }
  useEffect(() => {
    if (tweets) {
      setTweetsData(tweets.data?.pages[0]?.tweets)
    }
  }, [tweets])
  return (
    <div>
      <BoxSharePost />

      {/* feed */}
      <Column className='gap-14 pt-6'>
        {tweetsData && tweetsData.length && tweetsData.map((item: any, key: any) => (
          <React.Fragment key={key}>
            <Column gap='3' className='border-b pb-6'>
              <Row>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={`${item.user.image}`}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <Column gap='0'>
                  <div className='font-bold'>{item.user.name} </div>
                  <div className='text-gray-400 text-sm'>
                    {item.createdAt.toDateString()}
                  </div>
                </Column>
              </Row>
              <div>{item.content}</div>
              <Row gap='3'>
                <Row>
                  <FaRegHeart />
                  <div>{item.likeCount}</div>
                </Row>
                <Row>
                  <TbSocial />
                  <div>25</div>
                </Row>
              </Row>
            </Column>
          </React.Fragment>
        ))}
      </Column>

    </div>
  )
}

export default FeedTemplate