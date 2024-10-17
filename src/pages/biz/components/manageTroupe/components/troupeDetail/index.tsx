import styled from "styled-components";
import CalendarSVG from "@assets/icons/calendar_xs.svg?react";
import LinkSVG from "@assets/icons/link.svg?react";
import LocationSVG from "@assets/icons/location.svg?react";
import PersonSVG from "@assets/icons/person.svg?react";
import MailSVG from "@assets/icons/mail.svg?react";
import Button from "@/components/buttons/button";
import { TroupeInfo } from "../..";

interface TroupeDetailInterface {
  onClick: () => void;
  troupe: TroupeInfo;
}

const TroupeDetail = ({ onClick, troupe }: TroupeDetailInterface) => {
  return (
    <TroupeDetailContainer>
      <CoverImageWrapper>
        <CoverImageWrapper>
          <Cover />
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </CoverImageWrapper>
      </CoverImageWrapper>
      <Content>
        <ButtonWapper>
          <Button
            variation="outlined"
            btnClass="secondary"
            width={129}
            height={40}
            fontSize={15}
            padding="9px 20px"
            onClick={onClick}
          >
            극단 정보 수정
          </Button>
        </ButtonWapper>
        <ContentWrapper>
          <TextColumn>
            <TextTitleWrapper>
              <Title>{troupe.name}</Title>
              <FollowerWrapper>
                <FollowerText>팔로워</FollowerText>
                <FollowerValue>{troupe.followerCount}</FollowerValue>
              </FollowerWrapper>
            </TextTitleWrapper>
            <Description>소개 내용</Description>
          </TextColumn>
          <SummaryColumn>
            <SummaryPropertyWrapper>
              <Property>
                <CalendarSVG />
                극단 설립일
              </Property>
              <Value>{troupe.publishDate}</Value>
            </SummaryPropertyWrapper>
            <SummaryPropertyWrapper>
              <Property>
                <LinkSVG />
                극단 웹사이트
              </Property>
              <Value>{troupe.website}</Value>
            </SummaryPropertyWrapper>
            <SummaryPropertyWrapper>
              <Property>
                <LocationSVG />
                극단 위치
              </Property>
              <Value>{troupe.address}</Value>
            </SummaryPropertyWrapper>
            <Divider />
            <SummaryPropertyWrapper>
              <Property>
                <PersonSVG />
                담당자 연락처
              </Property>
              <Value>{troupe.picCell}</Value>
            </SummaryPropertyWrapper>
            <SummaryPropertyWrapper>
              <Property>
                <MailSVG />
                극단 이메일
              </Property>
              <Value>{troupe.email}</Value>
            </SummaryPropertyWrapper>
          </SummaryColumn>
        </ContentWrapper>
      </Content>
    </TroupeDetailContainer>
  );
};

export default TroupeDetail;

const TroupeDetailContainer = styled.div`
  padding: 24px 40px;
`;

const CoverImageWrapper = styled.div`
  position: relative;
`;

const Cover = styled.div`
  width: 1100px;
  height: 300px;
  background-color: gray;
  border-radius: 12px;
`;

const LogoWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  left: 25px;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: black;
`;

const Content = styled.div`
  width: 1100px;
  margin-top: 30px;
  padding: 0px 24px 20px 24px;
`;

const ButtonWapper = styled.div`
  width: 100%;
  margin-right: 24px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

const ContentWrapper = styled.div`
  width: 1100px;
  display: flex;
  gap: 35px;
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 716px;
`;

const TextTitleWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const Title = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const FollowerWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FollowerText = styled.div`
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #000000;
`;

const FollowerValue = styled.div`
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #000000;
  font-weight: var(--font-bold);
`;

const SummaryColumn = styled.div`
  width: 301px;
  min-height: 368px;
  border: 1px solid #e0e0e2;
  padding: 24px 22px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Description = styled.div`
  width: 700px;
  min-height: 286px;
  word-break: break-all;
  font-size: 16px;
`;

const SummaryPropertyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 40px;
`;

const Property = styled.div`
  display: flex;
  gap: 8px;
`;

const Value = styled.div`
  margin-left: 24px;
`;

const Divider = styled.div`
  width: 255px;
  height: 1px;
  background-color: #f4eaf3;
`;
