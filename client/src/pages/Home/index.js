import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Icon, Input, Dropdown, Menu, notification } from 'antd';
const Search = Input.Search;
import Style from './index.scss';
import API from '@common/api';

@connect(
  store => {
    return {
      userInfo: store.userInfo
    }
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
class Home extends React.Component {
  async signOut () {
    const respones = await API.signOut();
    notification['success']({
      message: respones.message
    });
    setTimeout(() => {
      this.props.history.push('/login');
    }, 500);
  }
  render() {
    const aboutMenu = (
      <Menu>
        <Menu.Item>关于我</Menu.Item>
        <Menu.Item onClick={this.signOut.bind(this)}>退出登录</Menu.Item>
      </Menu>
    );
    return <main className={Style['home']}>
      <header>
        <nav>
          <div>
            <Icon type="android" className="size-30"/>
          </div>
          <div>
            <Search
              placeholder="搜索"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <Icon type="compass" className="icon size-18 pad-right-30"/>
            <Icon type="heart" className="icon size-18 pad-right-30"/>
            <Dropdown overlay={aboutMenu} placement="bottomLeft">
              <Icon type="user" className="icon size-18 pad-right-30"/>
            </Dropdown>
          </div>
        </nav>
      </header>
    </main>;
  }
  componentDidMount() {
    if(!this.props.userInfo.userId) {
      API.getUserInfo().then(respones=>{
        this.props.addUserInfo(respones.data);
      });
    }
  }
}

export default withRouter(Home);
