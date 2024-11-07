import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "animate.css";
import ForegetPassword from "./pages/ForegetPassword";
import Dashboard from "./Modules/Pages/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import TypeCode from "./pages/TypeCode";
import NewLoginPassword from "./pages/NewLoginPassword";
import Congratulation from "./pages/Congratulation";
import Brief from "./Modules/Pages/Brief";
import PrivacyPolicy from "./Modules/Pages/PrivacyPolicy/index";
import TermsCondition from "./Modules/Pages/Terms&Condition/index";
import Trending from "./Modules/Pages/Trending/index";
import InBox from "./Modules/Pages/InBox/index";
import ResponsiveDrawer from "./Modules/Pages/SearchBar";
import Studio from "./Modules/Pages/Studio";
import Profile from "./Modules/Pages/Profile";
import ChangePassword from "./Modules/Pages/ChangePassword";
import SaveItem from "./Modules/Pages/SaveItem";
import BlockedAccounts from "./Modules/Pages/BlockedAccounts";
import HelpCenter from "./Modules/Pages/HelpCenter";
import Blogs from "./Modules/Pages/Blogs";
import Chats from "./Modules/Pages/Chats";
import Settings from "./Modules/Pages/Settings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <PublicRoute>
                <Login />{" "}
              </PublicRoute>
            }
            path="/"
          />
          <Route
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
            exact
            path="/register"
          />
          <Route
            element={
              <PublicRoute>
                <ForegetPassword />
              </PublicRoute>
            }
            exact
            path="/forgot-passowrd"
          />
          <Route
            element={
              <PublicRoute>
                <TypeCode />
              </PublicRoute>
            }
            exact
            path="/type-code"
          />
          <Route
            element={
              <PublicRoute>
                <NewLoginPassword />
              </PublicRoute>
            }
            exact
            path="/new-login-pasword"
          />
          <Route
            element={
              <PublicRoute>
                <Congratulation />
              </PublicRoute>
            }
            exact
            path="/congratulation"
          />
          <Route
            element={
              <PublicRoute>
                <PrivacyPolicy />
              </PublicRoute>
            }
            path="/privacypolicy"
          />
          <Route
            element={
              <PublicRoute>
                <TermsCondition />
              </PublicRoute>
            }
            path="/terms-condition"
          />

          {/* // ******  pages ********** // */}

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
            path="/dashboard"
          />
          <Route
            element={
              <PrivateRoute>
                <ResponsiveDrawer />
              </PrivateRoute>
            }
            path="/search"
          />
          <Route
            element={
              <PrivateRoute>
                <Blogs />
              </PrivateRoute>
            }
            path="/blogs"
          />
          <Route
            element={
              <PrivateRoute>
                <Brief />
              </PrivateRoute>
            }
            path="/brief"
          />
          <Route
            element={
              <PrivateRoute>
                <Chats />
              </PrivateRoute>
            }
            path="/chats"
          />
          <Route
            element={
              <PrivateRoute>
                <Studio />
              </PrivateRoute>
            }
            path="/studio"
          />
          <Route
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
            path="/settings"
          />
          <Route
            element={
              <PrivateRoute>
                <Trending />
              </PrivateRoute>
            }
            path="/trending"
          />
          <Route
            element={
              <PrivateRoute>
                <InBox />
              </PrivateRoute>
            }
            path="/inbox"
          />
          <Route
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
            path="/profile"
          />
          <Route
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
            path="/changePassword"
          />
          <Route
            element={
              <PrivateRoute>
                <SaveItem />
              </PrivateRoute>
            }
            path="/saveItem"
          />
          <Route
            element={
              <PrivateRoute>
                <BlockedAccounts />
              </PrivateRoute>
            }
            path="/blockedaccounts"
          /> <Route
          element={
            <PrivateRoute>
              <HelpCenter />
            </PrivateRoute>
          }
          path="/helpcenter"
        />
        </Routes>
      </Router>
    </>
  );
}

export default App;
