import React from 'react';
import '../styles/Widgets.css'
import { TwitterTimelineEmbed, TwitterShareButton } from 'react-twitter-embed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Widgets = () => {
    return (
        <div className="widgets">
            <div className="widgets_input-wrapper">
                <input type="text" placeholder="Search Tweetalk" className="widgets_input" />
                <FontAwesomeIcon icon="search" className="widgets_search"/>
            </div>
            <div className="widgets_widget-container">
                <h2 className="widgets_heading">What's Happening</h2>
                <TwitterTimelineEmbed sourceType='profile' screenName='elonmusk' options={{ height: 300 }} />
                <TwitterShareButton url='https://Niikkk8.github.io/E-Portfolio/#' options={{ text: "This is a tweet directed from Niket's Twitter Clone", height : 50}} style={{padding: '12px 24px'}}/>
            </div>
        </div>
    );
}

export default Widgets;