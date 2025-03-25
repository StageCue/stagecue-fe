import styled from 'styled-components';
import { useEffect, useState } from 'react';
import TroupeDetail from './components/troupeDetail';
import { requestTroupeInfo } from '@/api/biz';
import Button from '@/components/buttons/button';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export interface TroupeInfo {
  name: string;
  description: string;
  logoImg: string;
  coverImg: string;
  followerCount: 0;
  publishDate: string;
  website: string;
  address: string;
  email: string;
  picName: string;
  picCell: string;
}

const ManageTroupe = () => {
  const navigate = useNavigate();
  const [troupeInfo, setTroupeInfo] = useState<TroupeInfo | null>(null);

  const getTroupeInfo = async () => {
    const res = await requestTroupeInfo();
    if (res instanceof AxiosError) {
      return;
    } else {
      setTroupeInfo(res);
    }
  };

  useEffect(() => {
    getTroupeInfo();
  }, []);

  const handleRegisterTroupeClick = () => {
    navigate('/biz/troupe/form/new');
  };

  return (
    <ManageTroupeContainer>
      {troupeInfo?.name ? (
        <TroupeDetail troupe={troupeInfo!} />
      ) : (
        <NoTroupeInfo>
          <RegisterWrapper>
            <RegisterText>우리 극단을 소개하고, 단원을 모집해보세요!</RegisterText>
            <Button
              variation="outlined"
              btnClass="primary"
              width={153}
              height={40}
              fontSize={15}
              padding="9px 20px"
              lineHeight={146.7}
              letterSpacing={0.96}
              onClick={handleRegisterTroupeClick}
            >
              극단소개 등록하기
            </Button>
          </RegisterWrapper>
        </NoTroupeInfo>
      )}
    </ManageTroupeContainer>
  );
};

export default ManageTroupe;

const ManageTroupeContainer = styled.div`
  width: 100%;
`;

const NoTroupeInfo = styled.div`
  width: 100%;
  height: 932px;
  display: flex;
  justify-content: center;
  margin-top: 421px;
`;

const RegisterWrapper = styled.div`
  width: 290px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const RegisterText = styled.div`
  font-size: 16px;
  font-weight: var(--font-regular);
  line-height: 162.5%;
  letter-spacing: 0.57%;
`;
