import instance from './axiosInstance';

exports.login = (data) => {
  return instance.post('/login', data);
}

exports.signup = (data) => {
  return instance.post('/login/register', data);
}

exports.getUserInfo = (data) => {
  return instance.get('/user/info', data);
}

exports.signOut = () => {
  return instance.get('/login/signout');
}