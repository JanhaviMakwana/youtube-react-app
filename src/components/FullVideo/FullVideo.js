import React from 'react';
import ReactPlayer from 'react-player';
import './FullVideo.css';

const FullVideo = ({ video }) => {
    if (!video) {
        return <div><p className="h5">Loading...</p></div>;
    }

    console.log(video.id);
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <div className="card" >
            <div className="p-3">
                <ReactPlayer url={videoSrc} loop={false} config={{ youtube: { playerVars: { disablekb: 1, controls: 0 } } }} />
            </div>
            <div>
                <p className="text-left pl-3 h5"> {video.snippet.title}</p>
                <p className="text-left">{video.snippet.description}</p>
            </div>
        </div>
    );
};

export default FullVideo;