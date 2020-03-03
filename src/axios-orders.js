import axios from 'axios';

const customAxios = axios.create({
    baseURL:'https://burgerbuilder-ea448.firebaseio.com/'
});

export default customAxios;