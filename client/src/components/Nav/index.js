import React from "react";
import { Menu, Dropdown, Icon, notification } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Style from "./index.scss";

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
}
export default Nav;
