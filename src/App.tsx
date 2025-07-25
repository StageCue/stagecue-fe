import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Starting from './pages/starting';
import ForgotAccount from './pages/auth/forgotAccount';
import ForgotPassword from './pages/auth/forgotPassword';
import ResetPassword from './pages/auth/resetPassword';
import Home from './pages/home';
import MyPage from './pages/mypage';
import DefaultLayout from './components/layout/default';
import AuthLayout from './components/layout/auth';
import Detail from './pages/post/detail';
import Applied from './pages/post/applied';
import ProfileDetail from './pages/mypage/components/settingProfile/components/profileDetail';
import ProfileForm from './pages/mypage/components/settingProfile/components/profileForm';
import NewProfileForm from './pages/mypage/components/settingProfile/components/newProfileForm';
import TroupeDetail from './pages/troupe/troupeDetail';
import List from './pages/post';
import Search from './pages/post/search';
import EditRecruit from './pages/biz/components/managePost/components/editRecruit';
import ManageTroupe from './pages/biz/components/manageTroupe';
import EditTroupe from './pages/biz/components/manageTroupe/components/editTroupe';
import FindPassword from './pages/auth/resetPassword';
import useSessionStore from './store/session';
import { useEffect } from 'react';
import PrivateRoute from './components/bizRouter';
import CreatedTroupe from './pages/biz/components/manageTroupe/components/createdTroupe';
import Notice from './pages/notice';
import ServiceInfo from './pages/service-info';
import Blog from './pages/blog';
import PrivacyPolicy from './pages/privacy-policy';
import ApplicantPage from './pages/biz/components/applicant';
import BizLayout from './components/layout/biz';
import { ManagePostWrapper } from './pages/biz/components/managePost/components/context/Wrapper';
import { setNavigator } from './utils/navigator';
import { setQueryClient } from './utils/queryClientAccessor';
import { queryClient } from './lib/queryClient';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionStore = useSessionStore();

  const isAuthenticated = sessionStore.isLoggined;

  useEffect(() => {
    setQueryClient(queryClient);
    setNavigator(navigate);
  }, []);

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="notice" element={<Notice />} />
          <Route path="service-info" element={<ServiceInfo />} />
          <Route path="blog" element={<Blog />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="search" element={<Search />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="mypage" element={<MyPage />} />
            <Route path="mypage/profiles/:id" element={<ProfileDetail />} />
            <Route path="mypage/profiles/:id/form" element={<ProfileForm />} />
            <Route path="mypage/profiles/form" element={<NewProfileForm />} />
          </Route>
          <Route path="casts" element={<List />} />
          {/* <Route path="casts/search" element={<Search />} /> */}
          <Route path="casts/:id" element={<Detail />} />
          <Route path="casts/applied" element={<Applied />} />
          <Route path="troupe/:troupeName" element={<TroupeDetail />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="starting" element={<Starting />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="welcome" element={<Welcome />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="forgotAccount" element={<ForgotAccount />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="find-password" element={<FindPassword />} />
        </Route>
        <Route path="/biz" element={<BizLayout />}>
          <Route index element={<ApplicantPage />} />
          <Route path="apply" element={<ApplicantPage />} />
          <Route path="troupe" element={<ManageTroupe />} />
          <Route path="troupe/form" element={<EditTroupe isInitial={false} />} />
          <Route path="troupe/form/new" element={<EditTroupe isInitial={true} />} />
          <Route path="troupe/created" element={<CreatedTroupe />} />
          <Route path="cast" element={<ManagePostWrapper />} />
          <Route path="cast/form" element={<EditRecruit key={location.pathname} />} />
          <Route path="cast/:id/form" element={<EditRecruit />} />
        </Route>
      </Routes>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  height: 100%;
`;
