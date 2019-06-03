import React from "react";
import { Icon, Input } from 'antd';
const Search = Input.Search;
import Style from './index.scss';

class Home extends React.Component {
  render() {
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
            <Icon type="compass" className="icon size-18 pad-left-30"/>
            <Icon type="heart" className="icon size-18 pad-left-30"/>
            <Icon type="user" className="icon size-18 pad-left-30"/>
          </div>
        </nav>
      </header>
    </main>;
  }
}

export default Home;
