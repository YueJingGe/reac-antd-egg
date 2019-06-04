import React from "react";
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon, notification } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Style from "./index.scss";
import API from '@common/api';

const menu = (
  <Menu>
    <Menu.Item>
      <a>1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a>2nd menu item</a>
    </Menu.Item>
  </Menu>
);

@connect(
  store => {
    return store.userInfo
  },
  dispatch => {
    return {
      addUserInfo: info => {
        dispatch({
          type: 'ADD_USERINFO',
          info
        })
      }
    }
  }
)
class Nav extends React.Component {
  render() {
    return (
      <div className={Style['nav-container']}>
        <Dropdown overlay={menu} className='right-side'>
          <a className="ant-dropdown-link" href="#">
            <Icon type="menu" />
          </a>
        </Dropdown>
      </div>
    );
  }
  componentDidMount() {
    if(!this.props.userInfo.userId) {
      // API.getUserInfo();
    }
  }
}
export default Nav;
