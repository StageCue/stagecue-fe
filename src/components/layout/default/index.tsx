import { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import DefaultHeader from '@/components/header/default';
import DefaultFooter from '@/components/footer/default';

const DefaultLayout = () => {
  const { pathname } = useLocation();

  const isServicePage = pathname?.includes('service-info');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <DefaultLayoutContainer $isServicePage={isServicePage}>
      {!isServicePage && <DefaultHeader />}
      <Body $paddingTop={isServicePage ? 0 : 60}>
        <Outlet />
      </Body>
      {!isServicePage && <DefaultFooter />}
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;

const DefaultLayoutContainer = styled.div<{ $isServicePage: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-width: ${({ $isServicePage }) => ($isServicePage ? '1440px' : '100%')};

  background-color: ${({ $isServicePage }) => ($isServicePage ? 'black' : 'white')};
`;

const Body = styled.div<{ $paddingTop: number }>`
  height: 100%;
  min-height: calc(100vh - 100px);
  padding-top: ${({ $paddingTop }) => `${$paddingTop}px`};
`;
