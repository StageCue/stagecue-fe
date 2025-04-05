/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import PlusSVG from '@assets/icons/plus.svg?react';
import AboutSVG from '@assets/images/about.svg';
import { useNavigate } from 'react-router-dom';

interface StageCueProps {
  notices: any[];
}

const StageCue = ({ notices }: StageCueProps) => {
  const navigate = useNavigate();

  const handlePlusClick = () => {
    navigate('/notice');
  };
  return (
    <StageCueContainer>
      <Notice>
        <TitleWrapper>
          <Title>
            공지사항 <Higliting />
          </Title>
          <IconWrapper onClick={handlePlusClick}>
            <PlusSVG />
          </IconWrapper>
        </TitleWrapper>
        <Posts>
          {notices?.map(({ title, createdAt }, index) => (
            <Post key={index}>
              <PostTitle>{title}</PostTitle>
              <Date>{createdAt}</Date>
            </Post>
          ))}
        </Posts>
      </Notice>
      <About src={AboutSVG} />
    </StageCueContainer>
  );
};

export default StageCue;

const StageCueContainer = styled.div`
  width: 100%;
  max-width: 1060px;
  margin-top: 24px;
  display: flex;
  gap: 40px;
`;

const Notice = styled.div`
  width: 591px;
  height: 266px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 54px;
  border-bottom: 1px solid #000000;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  position: relative;
  font-size: 28px;
  font-weight: var(--font-bold);
  line-height: 135.8%;
  letter-spacing: -2.36%;
  color: black;
  z-index: 20;
`;

const Higliting = styled.div`
  position: absolute;
  left: 0px;
  bottom: 7px;
  width: 99px;
  height: 4px;
  background-color: #ff9303;
  z-index: -10;
`;

const Posts = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const PostTitle = styled.div`
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #171719;
`;

const Date = styled.div`
  font-size: 13px;
  line-height: 138.5%;
  letter-spacing: 1.94%;
  color: #989ba2;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const About = styled.img``;
