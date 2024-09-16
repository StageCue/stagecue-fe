import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Layout from "./components/layout/auth";
import Login from "./pages/auth/login";
import Welcome from "./pages/welcome";
import Signup from "./pages/auth/signup";
import Starting from "./pages/starting";
import ForgotAccount from "./pages/auth/forgotAccount";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import Search from "./pages/post/search";
import Home from "./pages/home";
import MyPage from "./pages/mypage";
import DefaultLayout from "./components/layout/default";
import AuthLayout from "./components/layout/auth";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="starting" element={<Starting />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotAccount" element={<ForgotAccount />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100%;
`;
