import axios from 'axios';

const getFollowing = () => {
    return axios.get('/api');
};

export default getFollowing;