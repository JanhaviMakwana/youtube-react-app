import React from 'react';
import VideoItem from '../VideoItem/VideoItem';

const VideoList = ({ videos, handleVideoSelect }) => {
    const renderedVideos = videos.map((video) => {
        return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />;
    });

    return (
        <div style={{ width: '120%' }}>
            <p className="h6">Recommendation List</p>
            {renderedVideos}
        </div>
    );
};

export default VideoList;