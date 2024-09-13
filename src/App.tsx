import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Layout from "./components/layout";
import Login from "./pages/login";
import Welcome from "./pages/welcome";
import Signup from "./pages/signup";
import ForgotAccount from "./pages/forgotAccount";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import Starting from "./pages/starting";

function App() {
  return (
    <AppContainer>
      <Layout>
        <Routes>
          <Route path="/" element={<Starting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/forgotAccount" element={<ForgotAccount />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100%;
`;
