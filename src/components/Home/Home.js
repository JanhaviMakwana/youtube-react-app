import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import VideoList from '../VideoList/VideoList';
import FullVideo from '../FullVideo/FullVideo';
import WatchLater from '../WatchLater/WatchLater';
import { youtube } from '../../axios';
import { firebase } from '../../axios';



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null,
            watchLater: false,
            id: null,
            watchLaterVideos: []
        };
    };

    componentDidMount() {
        this.handleSubmit('shinchan');
        this.getWatchLaterVideos();
    }

    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({ videos: response.data.items })
    };

    getWatchLaterVideos = () => {
        let videos = [];
        firebase.get('/playlist.json').then(res => {

            for (let key in res.data) {
                videos.push(res.data[key].video);
            }

            this.setState({ watchLaterVideos: videos })


        }).catch(err => {
            console.log(err);
        })
    }

    handleVideoSelect = async (video) => {
        const res = await firebase.get('/playlist.json')
        let watchLater = false;
        let id = null;
        for (let key in res.data) {
            if (res.data[key].videoId === video.id.videoId) {
                watchLater = true;
                id = key;
                break;
            }
        }
        this.setState({ selectedVideo: video, watchLater: watchLater, id: id })
    };

    watchLaterClickHandler = async (event) => {
        event.preventDefault();
        const res = await firebase.post('/playlist.json', { video: this.state.selectedVideo, videoId: this.state.selectedVideo.id.videoId });
        console.log(res);
        this.setState({ watchLater: true });
        this.getWatchLaterVideos();
    };

    removeWatchLaterHadler = async (event) => {
        event.preventDefault();
        firebase.delete(`/playlist/${this.state.id}.json`, { data: { videoId: this.state.selectedVideo.id.videoId } }).then(res => {

            this.setState({ watchLater: false })
        })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="container p-3">
                <SearchBar handleFormSubmit={this.handleSubmit} />
                <div className="container">
                    <div className="row">
                        <div className="col col-md-8">
                            <div className="card p-3">
                                <FullVideo video={this.state.selectedVideo} />
                            </div>
                            {this.state.selectedVideo &&
                                <div className="card p-3">
                                    {!this.state.watchLater
                                        ? <button className={"btn btn-primary btn-lg btn-block"} onClick={this.watchLaterClickHandler}>
                                            Add to watch-later
                                        </button>
                                        : <button className={"btn btn-danger btn-lg btn-block"} onClick={this.removeWatchLaterHadler}>
                                            Remove watch-later
                                        </button>
                                    }
                                </div>}
                            <div className="card p-3" style={{ width: '100%' }}>
                                <WatchLater videos={this.state.watchLaterVideos} />
                            </div>

                        </div>
                        <div className="col col-md-4">
                            <div className="container">
                                <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;