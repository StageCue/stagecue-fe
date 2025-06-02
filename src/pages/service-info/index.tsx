import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WhiteLogoSVG from '@assets/icons/white_logo.svg?react';
import HalfBulbSVG from '@assets/icons/half_bulb.svg?react';
import FullBulbSVG from '@assets/icons/full_bulb.svg?react';
import LocationGraySVG from '@assets/icons/location_gray.svg?react';
import BulbImage from '@assets/images/bulb.png';
import Button from '@/components/buttons/button';

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
        <ImageSection />
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
              <ItemImage src="https://s3.stagecue.co.kr/stagecue/recruits/70f32853-d396-4291-b841-4931537d154d.jpg" />
            </Item>

            <Item>
              <ItemImage src="https://s3.stagecue.co.kr/stagecue/recruits/70f32853-d396-4291-b841-4931537d154d.jpg" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/1dd7/ba01/9edadd877ae2f5f1016a39372b3d9285?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=D4rWMr4DB25I~76E3X6qO1qOcb0IMDnhssYAvxGV0bqDPl9Eiwcnr3GUYkPPFus04HPnvo8efvuD1BV1dfHVBltyYb5kgSZYL8sYIgg2Z1gyBhsSID2SyUtcg6Yqr5wt6mqsUckn-BPqBQ3W62SbBO8RV7TkKrUkeA4jwae1IArGhrhv3vqy6CSq4srfyqoxdhm49erMPv73gVvap3GM2K0sC91IcPantJKujMuPfgdMBjV7hDx9R1mlklueguAOe~ORmiAVwM9ln10XF1eDNHRQu1NShzGENYE8xMLvXfXnrtIzvu6fM7GXJmZwGIDDvb10lrfBXY1BNWex-gvpjA__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/3eae/3f3b/0defa6e544ab7d12f573d8a5fbd78224?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eGqrlivt3xME~CaVqhFYnKCRvODWAwo9VqI9B6l~FIhTQp64SXzSx1WZINw-3gV3nPp0mXj493ugwkUuRaMxiLkhsRKmjlJlKU-hgACj1WgxWwiYF1znxiOmp80NoeWH35hvum037PooqtCnWmFi0xx2RDOJSAXr3MNRoWd9hhcotYFSEIAMhYwy8pMiPoWjoyTqgmmkZXctCgUyHRQ-fT4DRO4vFBSN3KEzamTzQeNWBHdzj6XgnKkiGzXI-C5Jc3L3M8gLKgrcFBrBh0umY84JGFMLNwi9i-ffCwFdSka4Gn-kGH3-cFh2WpDegOR2IywCFEO2VfURkEg1a3OFsg__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/262c/ede8/b336c35af4aabda66c205e2886a4fe59?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iEgMnBpS0ppvtL~G1niNqv-ZNzajObCckhSTdxI8Zp1dzOv3fqEt0uN-L3TVoJ5G6Z-YdOILiRKdNDJrg08ToODHwOsTf5oxlKugfxHmET1Ly3OHQYVkehYVOsJTNyStftPeK7ObI0cWLzZOSfGwmISiaY1aBLNmuFty766Cx8AhE1~J~iDSiIPfmVFqDbzorMgryAYqPRMSMXKoK4g1G9JKDd1Sox~fPuGkLQcJecjhbG4ps428tX32loxBvNAlY6T-RZfhGAORQlzfzaUPcGgZFTPB3pI9S7nZVgDWQ7H7BDqNsfMKRNDwv35LqRoZalR1EN0F0ePOHsi9x0aC3Q__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/5c71/4597/ec579622c6bb36d5c7270b2f69325607?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mLjJedUJnc4FWBlpJv0LgCAXrhSyYHfgvI3i8U~7j42GzFGxNWHiCR6f5jTDVTtP-5bV8pnp4otWuGijfamTR8Xz3nqzdWKHGAyE3fpv8HBbTz18-PeZKAqiMLvdBfLrnP~WQbXcqiUe8U6aAfGP4JsQ1qvPxo1OGwNx0CZMKiFkAOr7LinrojwE9nRYT6O25FlzQqSu00zYbOly0j-UEjPNja2YMc48rMbxaMzhk~rMYo5Ccc9~95k-2qlJsmxQOeEITO7R7-nUKJDdFsYFwk0-uPO-b8YHUvqDRAfNoo9J809kGLph63m5zcaIkXOioBnp4yk~cdCFoOb9xd~fAA__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/d789/03e3/7e6bd40c5bbdaed6001a43918a96d91a?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mmXwt6y55V2lYb3Hd7JySCb5Gt540RRhkPu-6pNBpjmia1FMOx5A81r4~WK5q4BMmS7uiw9h3PvzfMC2mCbeO3eDdB-BNpP7pEZ3KNZp1k38V0lORmjRIF3gXwRSJp7i6OAnjO161SknwAlu4IZHVKtpuI0tlZWYYkClj418J5pZ-ngdkBpUkSdlVJXJkLNR3DnnUbwkL~FIHu3AJeNXP7BDo1M-VE1SYuTZkKeRSnaImnAew4ZbRBL4GFBBTxrmCDwfVijdqpBjlFJH7MDmCQKdqkvQ6ij6XEDfw2BVtOS9ziUNUXhlWKjZqzAVYISW02tAin8O-eyHfGaaN8av7w__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/c28e/18a1/85bd82b9f9cbc21841f731a460d02fe9?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AZjhMNuzH2ihw9ozaJtRQzAUx9OC3-aGkXRiNpDEunyS18kYziu2Q~O-ug45e9FiQezj5ijIhV1EJnPs8Lx4jDydL1dTpub8KTP5UAyGsGR6Ld0Jcb8J99xmUQo2K224ExARpo6lRNzb7nnyuIJFpgO2sl8a7V3CstTDhL3IPPvKN9Uf38bJLMGS18EZw2nbVBESi2Fb020-7JBzuvDjfbf08eOkewz7~gBJi7ZpMxxi9kJQYuyaxkrDKQtp7eFReIjkIPViIMsHW3VHNW1dqiSr3RQ4e~t6nvFztCT3a5uPf363X68wi-z88Uh5-x~LsSMv3VfP1zBDPS-Ud-pZeg__" />
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

      <Section
        $height={580}
        $imageURL={
          'https://s3-alpha-sig.figma.com/img/14b0/8390/936d40d7b92750887dccffb7f2c6ff25?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HCmnweJ0AAoj53znZQnVBsMsSFkEIGjwSTd2JHeM5vduoXvjN9jK1FsjeTXsEPVU8OaFthUDK9OCDhfH4AWSdqZHmwuRwcUALbp9MpK0SEHPo~3MKvc3SAic3ajv9s9zyKTklSF0iSvzCYtLzHoPid1U1AujaKfllfoZRrUonZzaJaXTe8NNK-x02VYMBkDrWoeM4w~F-xBSyOGWXjJeKCznzLrEFWtYEOZ6dZmgoznL1HIOpLDELkjD3IkyFPbNBU8aIpoqrlvfGV3wHtKRn8GO47CDAXLJZGdkKIiFPE0jbk08URZsIFDdaaQB-kdZB3Zf62UbKOLtyDtmhtx9Mg__'
        }
      >
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

const ImageSection = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url('https://s3-alpha-sig.figma.com/img/1bb1/6147/68860600b49b9fb24172b9e5cf590419?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lTrX4U-pB7eS0AsGqNVLStcszCVt0ko5srWHVQv5vZlV9IjSIx99n743-bRdSE3ZqAe0rYUhQcRnsEmlUzyXzn2NUwxJjp70GHzTpcCyQpx4k4OxNFelFFQdiw7Okq1cP2XXxZo95z4RbR-9f9sToPyaMH5UgOMZ~-p55fG4ZnH8ayWv1xQqdCf6YC9cqWFNNVFL8a6ksxPatq46SxM2f4LHIRidAXNBIMPFbMgT57rUIXBSdZhOq0XE~O5GgBoTw4~kYjCVWGf2eGQBFVsl6fylGSFB8dYyabZbyBQ9K9qn4FFo1byJCwYQqXE3W5kGb5L7-LfLsBldIAWjUmcS2w__');
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
