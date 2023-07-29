import axios from 'axios'

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    params: {
        key:"AIzaSyA-vYrNxxK0xOtEWWgJ7EtMQbGjWLdczq0"
    }
})

export default request;