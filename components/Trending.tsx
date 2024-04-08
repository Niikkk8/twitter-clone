import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { TwitterShareButton, TwitterTimelineEmbed } from 'react-twitter-embed'

export default function Trending() {
    return (
        <div className='hidden w-[20%] md:flex flex-col overflow-hidden'>
            <div className="flex items-center justify-between p-3 mt-3 ml-3 rounded-full bg-twitter-background">
                <input type="text" placeholder="Search Tweetalk" className="outline-none border-none bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 px-2" />
                <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
            </div>
            <div className="p-4 mt-4 ml-5 rounded-20 bg-twitter-white">
                <h2 className="text-lg font-bold mb-3">What's Happening</h2>
                <TwitterTimelineEmbed sourceType='profile' screenName='elonmusk' options={{ height: 300 }} />
                <TwitterShareButton url='https://Niikkk8.github.io/E-Portfolio/#' options={{ text: "This is a tweet directed from Niket's Twitter Clone", height: 50 }} />
            </div>
        </div>
    )
}
