/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./App.less";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";

import Login from "./pages/login";
import Reg from "./pages/reg";
import Creatordashboard from "./pages/creatordashboard";
import Createitem from "./pages/createitem";
import Myassets from "./pages/myassets";
import UserProfile from "./pages/userProfile";
import Shop from "./pages/shop";
import Main from "./pages/main";
import Help from "./pages/Help";
import Dashboard from "./pages/dashboard";
import Myassets1 from "./pages/myassets1";
import {
  createFromIconfontCN,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Input, Drawer, Select } from "antd";
import { base } from "./index";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    // icon-User, icon-qianbao
    "//at.alicdn.com/t/font_2627135_7dpj1ach3kp.js",
  ],
});

export const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

const App = () => {
  const [visible, setvisible] = useState(false);
  const [text, setText] = useState("");
  const [user, setUser] = useState({});
  const userid = localStorage.getItem("userid");

  const { name } = getURLParameters(window.location.href);
  const showName = decodeURIComponent(name || "");
/*
  useEffect(() => {
    const getData = () => {
      fetch(base + "/users/getUser?_id=" + userid)
        .then((params) => params.json())
        .then((params) => {
          console.log("params -> :", params);
          setUser(params.data);
        });
    };
    userid && visible && getData();
    setText(showName || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid, visible]);
*/
  const handleChange = (e) => {
    if (e.keyCode == 13) {
      //   window.location.href = "/assets";
      var name = e.target.value ? "?name=" + e.target.value : "";
      window.location.href = "/shop" + name;
    }
  };

  return (
    <div>
      <Router>
        <div className="top-header">
          <div className="logo">
            <Link to="/">
              <div style={{ width: "36px", height: "36px" }}>
                <img
                  alt="Opensea"
                  width="100%"
                  src="https://img-blog.csdnimg.cn/2021071710554115.jpg"
                />
              </div>
              &nbsp;
              <span className="Navbar--brand-name">Not For TheRich</span>
            </Link>
          </div>
          <ul className="nav" id="navs">
            <li>
              <NavLink exact activeClassName="act" to="/shop">
                Marketplace
              </NavLink>
            </li>
            </ul>
          <div className="serach">
            <Input
              size="large"
              style={{
                height: "60px",
                borderRadius: "6px",
                width: "800px",
                padding: "0px 10px",
                fontSize: "22px",
              }}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyDown={(e) => handleChange(e)}
              placeholder="搜索名字或标签"
              allowClear
              prefix={<SearchOutlined />}
            />
          </div>
          <ul className="nav" id="navs">
         
            
            <li>
            <NavLink exact activeClassName="act" to="/myassets1">
            Creator Gallary
              </NavLink>
            </li>
            <li>
            <NavLink exact activeClassName="act" to="/dashboard">
                Bought
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="act" to="/Help">
                Doc
              </NavLink>
            </li>
            <li className="icon">
              <NavLink exact activeClassName="act" to="/creatordashboard">
                <IconFont type="icon-User" />
              </NavLink>
            </li>
            <li className="icon">
              <a
                onClick={(e) => {
                  if (!userid) {
                    window.location.href = "/login";
                    return;
                  }
                  setvisible(true);
                }}
              >
                <IconFont type="icon-qianbao" />
              </a>
            </li>
          </ul>
        </div>
        <br />
        <div className="content">
          <Switch>
          <Route path="/Myassets1">
              <Myassets1 />
            </Route>
          <Route path="/Dashboard">
              <Dashboard />
            </Route>
          <Route path="/Help">
              <Help />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/createitem">
              <Createitem />
            </Route>
            <Route path="/creatordashboard">
              <Creatordashboard />
            </Route>
            <Route path="/myassets">
              <Myassets />
            </Route>
            <Route path="/profile/:_id">
              <UserProfile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/reg">
              <Reg />
            </Route>
            <Route path="/" exact>
              <Main />
            </Route>
            <Redirect to="/" exact />
            {/* <Route component={Main} /> */}
          </Switch>
        </div>
      </Router>
      <Drawer
        title={user.name + "'s  wallet"}
        placement="right"
        closable={false}
        getContainer={false}
        onClose={() => {
          setvisible(false);
        }}
        visible={visible}
        key="right"
      >
        <p className="m-wallet">
          Wallet balance: <span>{user.wallet}</span>
        </p>
      </Drawer>
    </div>
  );
};

export default App;
