const defaultValue = {
  avatarUrl: "",
  username: "",
  account: "",
  abstract: "",
  email: "",
  userId: ""
};

const userInfo = (state = defaultValue, action) => {
  switch (action.type) {
    case "ADD_USERINFO":
      return Object.assign({}, state, action.info);
      break;
    default:
      return state;
      break;
  }
};

export default userInfo;
