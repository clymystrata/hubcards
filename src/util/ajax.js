import axios from 'axios';

export const getFollowing = (user) => {
    return axios.get(`/api/following?user=${user}`);
}