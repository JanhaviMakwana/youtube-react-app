import React from 'react';
import styles from './VideoItem.module.css';

const VideoItem = ({ video, handleVideoSelect }) => {
    return (
        <div className="card" style={{ width: '100%', height: '200px', padding: '5px' }}>
            <div onClick={() => handleVideoSelect(video)} className={styles.VideoItem}>
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} className={styles.VideoImage} />
                <div className={styles.VideoTitle}><p className="text-left">{video.snippet.title}</p></div>
            </div>
        </div>
    )
};

export default VideoItem;