import React from 'react';
import VideoItem from '../VideoItem/VideoItem'

const WatchLater = ({ videos }) => {


    const renderedVideos = videos.map((video) => {

        return <VideoItem key={video.id.videoId} video={video} /* handleVideoSelect={handleVideoSelect}  */ />;
    });
    return (
        <div className="card">
            <p className="h6">WatchLater List</p>
            {renderedVideos}
        </div>
    );

}
export default WatchLater;