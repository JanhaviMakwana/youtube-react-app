import axios from 'axios';

const KEY = 'AIzaSyCMWgno2L5_u1OTM1p6rq3IqJ1taIIjMQ4'; 

export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 9,
        key: KEY,
        type: 'video'
    }
});

export const firebase = axios.create({
    baseURL: 'https://react-app-312604-8ade0.firebaseio.com/'
});