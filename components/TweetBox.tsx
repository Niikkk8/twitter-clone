import { faCalendar, faChartSimple, faFaceSmile, faImage, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function TweetBox() {
    return (
        <div className='flex space-x-4 p-4 border-b border-twitter-extra-light-gray'>
            <img
                src='/assets/demo_profile-picture.jpg'
                className='w-14 h-14 rounded-full object-cover'
                alt="" />
            <div className='w-full'>
                <textarea
                    className='bg-transparent resize-none outline-none w-full min-h-[48px] text-lg p-2'
                    placeholder="What's on your mind?"
                    name="" id=""
                />
                <div className='flex flex-col sm:flex-row items-end sm:items-start justify-between border-t border-twitter-extra-light-gray pt-3'>
                    <div className='flex justify-around w-full sm:justify-normal'>
                        <FontAwesomeIcon icon={faImage} className='tweetBoxHover p-3 text-twitter-dark-gray text-xl' />
                        <FontAwesomeIcon icon={faChartSimple} className='tweetBoxHover p-3 px-3.5 text-twitter-dark-gray text-xl' />
                        <FontAwesomeIcon icon={faFaceSmile} className='tweetBoxHover p-3 text-twitter-dark-gray text-xl' />
                        <FontAwesomeIcon icon={faCalendar} className='tweetBoxHover p-3 px-3.5   text-twitter-dark-gray text-xl' />
                        <FontAwesomeIcon icon={faLocationDot} className='tweetBoxHover p-3 px-4 text-twitter-dark-gray text-xl' />
                    </div>
                    <button className='bg-twitter-color text-white rounded-full px-8 py-2 mt-2 sm:mt-0'>Tweet</button>
                </div>
            </div>
        </div>
    )
}