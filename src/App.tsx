import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Login from "./pages/auth/login";
import Welcome from "./pages/welcome";
import Signup from "./pages/auth/signup";
import Starting from "./pages/starting";
import ForgotAccount from "./pages/auth/forgotAccount";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import Home from "./pages/home";
import MyPage from "./pages/mypage";
import DefaultLayout from "./components/layout/default";
import AuthLayout from "./components/layout/auth";
import Biz from "./pages/biz";
import BizLayout from "./components/layout/biz";
import Detail from "./pages/post/detail";
import Applied from "./pages/post/applied";
import ProfileDetail from "./pages/mypage/components/settingProfile/components/profileDetail";
import ProfileForm from "./pages/mypage/components/settingProfile/components/profileForm";
import NewProfileForm from "./pages/mypage/components/settingProfile/components/newProfileForm";
import TroupeDetail from "./pages/troupe/troupeDetail";
import List from "./pages/post/list";
import Search from "./pages/post/search";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/profiles/:id" element={<ProfileDetail />} />
          <Route path="mypage/profiles/:id/form" element={<ProfileForm />} />
          <Route path="mypage/profiles/form" element={<NewProfileForm />} />
          <Route path="casts" element={<List />} />
          <Route path="casts/search" element={<Search />} />
          <Route path="casts/:id" element={<Detail />} />
          <Route path="casts/applied" element={<Applied />} />
          <Route path="troupe/:troupeName" element={<TroupeDetail />} />
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
