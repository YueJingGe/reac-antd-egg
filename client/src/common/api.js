import instance from './axiosInstance';

exports.login = (data) => {
  return instance.post('/login', data);
}

exports.signup = (data) => {
  return instance.post('/login/register', data);
}