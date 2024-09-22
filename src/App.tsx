import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
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
import Biz from "./pages/biz";
import BizLayout from "./components/layout/biz";
import Detail from "./pages/post/detail";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="post" element={<Detail />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="starting" element={<Starting />} />
          <Route path="signup" element={<Signup />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotAccount" element={<ForgotAccount />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
        <Route path="/biz" element={<BizLayout />}>
          <Route index element={<Biz />} />
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100%;
`;
