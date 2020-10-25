var axios = require("axios").default;

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 2000,
});




exports.getAllUser = () => instance.get('/users').then(user => user.data);