import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './css/style.css';

export default function SocialMediaButtons() {
    return (
        <div>
            <div className="social-media-buttons">
                <SocialIcon url="https://www.google.com" style={{ width: 35, height: 35 }}  />
                <SocialIcon url="https://www.facebook.com" style={{ width: 35, height: 35 }} />
                <SocialIcon url="https://www.twitter.com" style={{ width: 35, height: 35 }} />
                <SocialIcon url="https://www.instagram.com" style={{ width: 35, height: 35 }} />
                <SocialIcon url="https://www.whatsapp.com" style={{ width: 35, height: 35 }} />
                <SocialIcon url="https://www.linkedin.com" style={{ width: 35, height: 35 }} />
            </div>
        </div>
    )
}
