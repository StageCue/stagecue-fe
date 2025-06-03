import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WhiteLogoSVG from '@assets/icons/white_logo.svg?react';
import HalfBulbSVG from '@assets/icons/half_bulb.svg?react';
import FullBulbSVG from '@assets/icons/full_bulb.svg?react';
import LocationGraySVG from '@assets/icons/location_gray.svg?react';
import BulbImage from '@assets/images/bulb.png';
import Button from '@/components/buttons/button';
import ServiceInfoBackground from '@assets/images/service-info-background.png';
import ServiceInfo1 from '@assets/images/service-info-1.jpg';
import ServiceInfo2 from '@assets/images/service-info-2.jpg';
import ServiceInfoItem1 from '@assets/images/service-info-item1.png';
import ServiceInfoItem2 from '@assets/images/service-info-item2.png';
import ServiceInfoItem3 from '@assets/images/service-info-item3.png';
import ServiceInfoItem4 from '@assets/images/service-info-item4.png';
import ServiceInfoItem5 from '@assets/images/service-info-item5.png';
import ServiceInfoItem6 from '@assets/images/service-info-item6.png';
import ServiceInfoFooter from '@assets/images/service-info-footer.png';

const ServiceInfo = () => {
  const navigate = useNavigate();
  const headSectionHeight = 715;

  const handleRoute = (type?: string) => {
    if (type === 'home') {
      navigate('/');
    } else {
      navigate('/auth/starting');
    }
  };

  return (
    <ServiceInfoContainer>
      <Section $height={headSectionHeight} $imageURL={BulbImage}>
        <Header>
          <WhiteLogoSVG onClick={() => handleRoute('home')} />
        </Header>
        <HeadSectionContent>
          <HeadSectionTitle>극단 활동의 편리를 더해줄</HeadSectionTitle>
          <HeadSectionBlurTitle>
            <BlurText $color="#b8171699" $filter="4px">
              스테이지 큐
            </BlurText>
            <BlurText $color="#ffffffcc" $filter="12px">
              스테이지 큐
            </BlurText>
            <BlurText $color="#ffffffff">스테이지 큐</BlurText>
          </HeadSectionBlurTitle>
        </HeadSectionContent>
        <Chip $height={headSectionHeight}>
          왜,&nbsp;<BoldText>스테이지 큐</BoldText>여야 할까요?
        </Chip>
        <SvgPosition $bottom="0px" $left="50%" $translateX="-50%">
          <HalfBulbSVG />
        </SvgPosition>
      </Section>

      <Section $height={2430}>
        <ImageSection $imageURL={ServiceInfoBackground} />
        <SectionItemContainer>
          <SectionItem $paddingY={120} $backgroundColor="#070707e5">
            <Item>
              <ItemContent>
                <SvgPosition $top="-25%" $left="-30%">
                  <FullBulbSVG />
                </SvgPosition>
                <ContentNumber>01.</ContentNumber>
                <ContentTitle $fontWeight={700} $fontSize={36} $lineHeight={54}>
                  스테이지 큐는
                  <br />
                  불편함은 빼고, 편리함을 더 했어요.
                </ContentTitle>
                <ContentSubTitle $fontWeight={400} $fontSize={18} $lineHeight={27}>
                  기존에 있던 플랫폼의
                  <br />
                  <span>문제점들을 보완하려</span>&nbsp;많은 고민을 했어요.
                </ContentSubTitle>
              </ItemContent>
              <ItemImage src={ServiceInfo1} />
            </Item>

            <Item>
              <ItemImage src={ServiceInfo2} />
              <ItemContent>
                <SvgPosition $top="-25%" $left="-30%">
                  <FullBulbSVG />
                </SvgPosition>
                <ContentNumber>02.</ContentNumber>
                <ContentTitle $fontWeight={700} $fontSize={36} $lineHeight={54}>
                  스테이지 큐는
                  <br />
                  간편하고 쉬워요.
                </ContentTitle>
                <ContentSubTitle $fontWeight={400} $fontSize={18} $lineHeight={27}>
                  극단주는 극단정보 등록 후 모집하는 공고를 올려 단원을 구할 수 있고,
                  <br />
                  일반인들은<span>원하는 조건의 극을 쉽게 지원</span>할 수 있어요.
                </ContentSubTitle>
              </ItemContent>
            </Item>
          </SectionItem>

          <SectionItem $paddingY={120} $backgroundColor="#070707ff">
            <ItemContent>
              <SvgPosition $left="50%" $translateX="-50%" $top="-75%">
                <FullBulbSVG />
              </SvgPosition>
              <ContentTitle $fontWeight={700} $fontSize={36} $lineHeight={54} $textAlign={'center'}>
                스테이지 큐는 여러 극단의 모집공고를
                <br />한 곳에서 볼 수 있어요!
              </ContentTitle>
              <ContentSubTitle $fontWeight={400} $fontSize={18} $lineHeight={26}>
                더이상 SNS에서의 우연히 발견한 극단활동이 아닌, 필연적인 극단활동을 스테이지 큐를
                통해 체험해보세요!
              </ContentSubTitle>
            </ItemContent>
            <ChardContainer>
              <Chard $marginTop={60}>
                <ChardImageContainer>
                  <CardImage src={ServiceInfoItem1} />
                  <CardType>댄스</CardType>
                </ChardImageContainer>
                <CardTitle>서울문화재단과 함께할 발레리나 모집합니다.</CardTitle>
                <CardSubTitle>[2024 한강노들섬클래식] 한강노...</CardSubTitle>
                <CardPosition>
                  <LocationGraySVG width={16} height={16} />
                  서울시 종로구
                </CardPosition>
              </Chard>
              <Chard $marginTop={0}>
                <ChardImageContainer>
                  <CardImage src={ServiceInfoItem2} />
                  <CardType>연극</CardType>
                </ChardImageContainer>
                <CardTitle>연극 옥탑방 고양이의 배우를 모집합니다.</CardTitle>
                <CardSubTitle>옥탑방고양이</CardSubTitle>
                <CardPosition>
                  <LocationGraySVG width={16} height={16} />
                  서울시 종로구
                </CardPosition>
              </Chard>
              <Chard $marginTop={60}>
                <ChardImageContainer>
                  <CardImage src={ServiceInfoItem3} />
                  <CardType>연극</CardType>
                </ChardImageContainer>
                <CardTitle>배우를 찾습니다.</CardTitle>
                <CardSubTitle>'고도를 기다리며'를 기다리며</CardSubTitle>
                <CardPosition>
                  <LocationGraySVG width={16} height={16} />
                  서울시 종로구
                </CardPosition>
              </Chard>
              <Chard $marginTop={118}>
                <ChardImageContainer>
                  <CardImage src={ServiceInfoItem4} />
                  <CardType>연극</CardType>
                </ChardImageContainer>
                <CardTitle>함께갈 배우를 애타게 찾습니다.</CardTitle>
                <CardSubTitle>연극라면</CardSubTitle>
                <CardPosition>
                  <LocationGraySVG width={16} height={16} />
                  서울시 종로구
                </CardPosition>
              </Chard>
              <Chard $marginTop={60}>
                <ChardImageContainer>
                  <CardImage src={ServiceInfoItem5} />
                  <CardType>뮤지컬</CardType>
                </ChardImageContainer>
                <CardTitle>랑데부에 출연하실 전문 배우를 모집합니다.</CardTitle>
                <CardSubTitle>랑데부</CardSubTitle>
                <CardPosition>
                  <LocationGraySVG width={16} height={16} />
                  서울시 종로구
                </CardPosition>
              </Chard>
              <Chard $marginTop={40}>
                <ChardImageContainer>
                  <CardImage src={ServiceInfoItem6} />
                  <CardType>연극</CardType>
                </ChardImageContainer>
                <CardTitle>열정적인 배우분을 모집합니다.</CardTitle>
                <CardSubTitle>나와 할아버지</CardSubTitle>
                <CardPosition>
                  <LocationGraySVG width={16} height={16} />
                  서울시 종로구
                </CardPosition>
              </Chard>
            </ChardContainer>
          </SectionItem>
        </SectionItemContainer>
      </Section>

      <Section $height={580} $imageURL={ServiceInfoFooter}>
        <Content $gap={36} $paddingTop={120}>
          <SubTitle>
            단원을 찾거나, 실시간으로 모집중인 공고를 확인하고 싶다면
            <br />
            지금 바로 <MainLink to={'/'}>스테이지 큐</MainLink>를 이용해보세요!
          </SubTitle>
          <Button
            variation="solid"
            btnClass="primary"
            width={340}
            height={48}
            onClick={() => handleRoute()}
          >
            회원가입 후 이용하기
          </Button>
        </Content>
      </Section>
    </ServiceInfoContainer>
  );
};

export default ServiceInfo;

const ServiceInfoContainer = styled.div`
  width: 100%;
  min-width: 1440px;
  height: fit-content;
  min-height: inherit;
  background-color: black;
  box-sizing: border-box;
`;

const Section = styled.div<{ $height: number; $imageURL?: string }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
  background-image: ${({ $imageURL }) => ($imageURL ? `url('${$imageURL}')` : 'none')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SectionItemContainer = styled.div`
  position: absolute;
  top: 200px;
  z-index: 2;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 200px;
`;

const SectionItem = styled.div<{ $height?: number; $paddingY?: number; $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => `${$backgroundColor}`};
  width: 100%;
  height: ${({ $height }) => ($height ? `${$height}px` : 'fit-content')};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 160px;

  padding: ${({ $paddingY }) => `${$paddingY}px 0`};
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 100px;

  width: 1060px;
`;

const ItemContent = styled.div`
  position: relative;
  color: #ffffffff;
`;

const ContentNumber = styled.div`
  color: #800100ff;
  font-weight: 900;
  font-size: 52px;
  line-height: 73px;
  padding-bottom: 20px;
`;

const ContentTitle = styled.div<{
  $fontWeight: number;
  $fontSize: number;
  $lineHeight: number;
  $textAlign?: string;
}>`
  font-weight: ${({ $fontWeight }) => `${$fontWeight}px`};
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  line-height: ${({ $lineHeight }) => `${$lineHeight}px`};
  padding-bottom: 16px;
  text-align: ${({ $textAlign }) => `${$textAlign}`};
`;

const ContentSubTitle = styled.div<{ $fontWeight: number; $fontSize: number; $lineHeight: number }>`
  font-weight: ${({ $fontWeight }) => `${$fontWeight}px`};
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  line-height: ${({ $lineHeight }) => `${$lineHeight}px`};

  span {
    font-weight: var(--font-semibold);
  }
`;

const ItemImage = styled.img`
  width: 460px;
  height: 345px;
  border-radius: 11px;
  box-shadow: 0px 0px 4px 0px #ffffff1e;
  backdrop-filter: blur(4px);
  object-fit: cover;
`;

const HeadSectionContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #ffffffff;
`;

const HeadSectionTitle = styled.div`
  font-weight: var(--font-semibold);
  font-size: 48px;
  line-height: 62px;
`;

const HeadSectionBlurTitle = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;

  font-weight: 800;
  font-size: 60px;
  line-height: 78px;
`;

const BlurText = styled.div<{ $color: string; $filter?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  color: ${({ $color }) => $color};
  filter: blur(${({ $filter }) => `${$filter}`});
  pointer-events: none;
  white-space: nowrap;
  transform: translateX(-50%);
`;

const Chip = styled.div<{ $height: number }>`
  position: absolute;
  z-index: 2;
  bottom: -34px; //height의 반을 뺀다.
  left: 50%;
  transform: translateX(-50%);
  border-radius: 999px;

  background-color: #ffffffff;
  width: fit-content;
  height: fit-content;
  min-width: 438px;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 30px;
  white-space: nowrap;

  font-size: 36px;
  line-height: 46px;
  font-weight: 400;
`;

const BoldText = styled.span`
  color: #000000ff;
  font-weight: 700;
`;

const ImageSection = styled.div<{ $imageURL: string }>`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${({ $imageURL }) => $imageURL});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Header = styled.div`
  height: 60px;
  padding: 17.2px 190px;
  background-color: transparent;
  backdrop-filter: blur(4px);

  svg {
    cursor: pointer;
  }
`;

const Content = styled.div<{ $gap: number; $paddingTop: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ $gap }) => `${$gap}px`};

  padding-top: ${({ $paddingTop }) => `${$paddingTop}px`};
  margin-top: 120px;
`;

const SubTitle = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  color: #ffffffff;
`;

const MainLink = styled(Link)`
  color: #b81716ff;
`;

const SvgPosition = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $translateY?: string;
  $translateX?: string;
}>`
  position: absolute;
  z-index: 1;
  top: ${({ $top }) => `${$top}`};
  bottom: ${({ $bottom }) => `${$bottom}`};
  left: ${({ $left }) => `${$left}`};
  right: ${({ $right }) => `${$right}`};
  transform: translateY(${({ $translateY }) => `${$translateY}`});
  transform: translateX(${({ $translateX }) => `${$translateX}`});
`;

const ChardContainer = styled.div`
  display: flex;
  gap: 44px;
  padding: 0 21px;
`;

const Chard = styled.div<{ $marginTop: number }>`
  width: 196px;
  height: fit-content;
  min-height: 394px;

  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: ${({ $marginTop }) => `${$marginTop}px`};

  color: #989ba2;
`;

const ChardImageContainer = styled.div`
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 294px;
  border-radius: 8px;
  object-fit: cover;
`;
const CardType = styled.div`
  position: absolute;
  left: 8px;
  bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 20px;
  border-radius: 3px;
  background-color: #000000ff;

  font-weight: var(--font-semibold);
  font-size: 12px;
  line-height: 17px;
  color: #ffffffff;
`;

const CardTitle = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 24px;
`;

const CardSubTitle = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
`;

const CardPosition = styled.div`
  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`;
