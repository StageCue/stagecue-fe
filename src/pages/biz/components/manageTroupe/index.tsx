import styled from "styled-components";
import { useEffect, useState } from "react";
import TroupeDetail from "./components/troupeDetail";
import EditTroupe from "./components/editTroupe";
import { requestTroupeInfo } from "@/api/biz";
import Button from "@/components/buttons/button";

export interface TroupeInfo {
  name: "string";
  description: "string";
  logoImg: "string";
  coverImg: "string";
  followerCount: 0;
  publishDate: "string";
  website: "string";
  address: "string";
  email: "string";
  picName: "string";
  picCell: "string";
}

const ManageTroupe = () => {
  const [troupeInfo, setTroupeInfo] = useState<TroupeInfo>();
  const [isEditTroupe, setIsEditTroupe] = useState(false);

  const handleEditTroupe = () => {
    setIsEditTroupe(true);
  };

  const getTroupeInfo = async () => {
    const res = await requestTroupeInfo();

    setTroupeInfo(res);
  };

  useEffect(() => {
    getTroupeInfo();
  }, []);

  const handleRegisterTroupeClick = () => {
    setIsEditTroupe(true);
  };

  return (
    <ManageTroupeContainer>
      {!isEditTroupe && troupeInfo && (
        <TroupeDetail onClick={handleEditTroupe} troupe={troupeInfo!} />
      )}
      {isEditTroupe && <EditTroupe isInitial={Boolean(!troupeInfo)} />}
      {!troupeInfo && (
        <NoTroupeInfo>
          <RegisterWrapper>
            <RegisterText>
              우리 극단을 소개하고, 단원을 모집해보세요!
            </RegisterText>
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

const ManageTroupeContainer = styled.div``;

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
