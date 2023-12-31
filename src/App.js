import { Container } from "react-bootstrap";
import "./_app.scss";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import { useState, useEffect } from "react";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/slices/userslices";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";
import Loader from "./components/loader/Loader";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";

export const Layout = ({ homescreen }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const { displayName } = useSelector((state) => state?.userinfo);
  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        {/*Here fluid is used to remove default padding inside the container*/}
        {/*Here we are using container to  make our homescreen responsive*/}
        <Container fluid className="app__main">
          {homescreen}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userinfo);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          // setUser(resObject.user);
          // console.log(resObject.user);
          dispatch(addUser(resObject.user));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  // console.log({displayName});
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <Layout homescreen={<HomeScreen />} />
              ) : (
                <LoginScreen />
              )
            }
          />

          <Route path="/auth" element={<LoginScreen />} />
          <Route
            exact
            path="/watch/:id"
            element={
              isAuthenticated ? (
                <Layout homescreen={<WatchScreen />} />
              ) : (
                <LoginScreen />
              )
            }
          />

          <Route
            path="/search/:query"
            element={
              isAuthenticated ? (
                <Layout homescreen={<SearchScreen />} />
              ) : (
                <LoginScreen />
              )
            }
          />
          <Route
            path="/feed/subscription"
            element={
              isAuthenticated ? (
                <Layout homescreen={<SubscriptionsScreen />} />
              ) : (
                <LoginScreen />
              )
            }
          />
          <Route
            path="/channel/:channelId"
            element={
              isAuthenticated ? (
                <Layout homescreen={<ChannelScreen />} />
              ) : (
                <LoginScreen />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
