import styled from 'styled-components';
import WhiteLogoSVG from '@assets/icons/white_logo.svg?react';
import HalfBulbSVG from '@assets/icons/half_bulb.svg?react';
import FullBulbSVG from '@assets/icons/full_bulb.svg?react';
import LocationGraySVG from '@assets/icons/location_gray.svg?react';
import BulbImage from '@assets/images/bulb.png';
import Button from '@/components/buttons/button';
import { Link, useNavigate } from 'react-router-dom';

const ServiceInfo = () => {
  const navigate = useNavigate();
  const headSectionHeight = 715;

  const handleRoute = () => {
    navigate('/auth/starting');
  };

  return (
    <ServiceInfoContainer>
      <Section $height={headSectionHeight} $imageURL={BulbImage}>
        <Header>
          <WhiteLogoSVG />
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

      <Section $height={2310}>
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
              <ItemImage src="https://s3-alpha-sig.figma.com/img/94fe/6580/c74315d43f2494af859e96133685ff31?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RIbUgB7IeqzbLoC2PEAXmkrt7Wl-RsrUpR4QLEsowIbtKxGYDNPNInqRhW~ZsZqNrQJWFgiiZzyS4-lyx0h3DUmKRfpPpMzPBzUeaEMUUSAgHOQg6crXooSDbd278q6hZcsGh-tIVqRXsaDYUeeIj1ziou3i-xdD8JVklDg2QnjKMwMxN1~t2gqD-BJ8oqHEwqC3579F4IXo4kv-UrUpq~vxZAYD~6LKqZ5g0pMhnEiInYxgum-DbrbJuR4bAI88KhP5C5RXYpoYChuAtymRIVinumGcSAZ-647rr~g4uYul2rrxwpdsVpmW-wG3ehrOWtiS0D2gEfyXUClv1KN4xg__" />
            </Item>

            <Item>
              <ItemImage src="https://s3-alpha-sig.figma.com/img/7ccf/cd62/67d7a579389d9d215c61d3b5d13a098f?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AZSY7dZEu16HRRyQcDE8Bb5jVsAhBfZzN3HfUvDZqg5XQs67X0CHaPbPsDLEwPKaiCoTaXHyYd9gkan2LAkr~qrcXemKu~oGznEuV7soEL5M~P8bDas8h2MQJfefybonQ7Imw~bFhnXC22NedmOrg2jxu0MldB6~hTpO0ZNvLEnqpsZY7oVfP3SSFxycU1mPnYyUsV4m9kAGgM9oODiKK1EHzuNY3gteUKj91SpbWhPHYknDQKQcJAVKDlC5GLJYmYBCv95EAz1TDioNn7X2FL5sdT9wGzPd0d4Atn6ukFeJDYqExmzOKjjgv3gF0fdtbB7mXwPS~f0Sjtqz5N5h4A__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/1dd7/ba01/9edadd877ae2f5f1016a39372b3d9285?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uMjeJ5cauElboM1PcFhusXHFFX7~c4w8SLKQxdXWgGkT16AENRWu1JheGT6xXq7hgCIoAajKAwY0O8YfRxmqLaPSoC5g3RgxUPdTDCsPLp9~FTwrqhDhWlAV7KYA9ahrKRSIniqT2U2BNmWZMsTSgpQ8vqtwWykv8wIR0rFYNucTe2U~Q~yFbhkpDQlsxREhAgzRDFd5Mdvf37K83TJUSX3w5eFvH6DltUJg-vH66FclaRzEb59yAfbE1K2p6x4ECJzmT6npsqaC-J0i2lpTDci-SZjmo4jTGqNHVru15LyFLkDEYPIdfDBrJsuilrp1Q~wSDpLKoCUgjDgKRgQ8Qg__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/3eae/3f3b/0defa6e544ab7d12f573d8a5fbd78224?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WDQJgcoBj9kM5tRd5Vxf6EMK~L1Ac20W42z9VjVhg9XM1XACXm6lTGZ25OVUWoJFmIX-aLdoyARLUWhW1bxHxod9xfEmuxNS-QFVRkszC5iVhvEKJDpGg~uTEkdI0cWQpFjphj6eSGtTQnZoULKReq~XXMD6gBAugeK5RxopJVN-gkKuWirRq7al9~8wkPU9PVB6zjzbWtkXTk5GF2okfgEYSf-Bcm55sK63WH1Jq7qwANOPi0SqMN5d5ufA5Z6u5LFW2J2PT5VZXpzxgarbxMwJfjtVWQAyDGT~4~HW9T2MPAqBNNJLW98-IM-JrEozcnnbqrCY~Pf5jF2xMEnl-w__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/262c/ede8/b336c35af4aabda66c205e2886a4fe59?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DXnK2Fbt1VvzM51LJc5MGYniZHWtFiqmvLjALoFQNbt31-FsbTjxM7DdzsfoBY5Gjl4gem8JKdyCOXy~kE-3te8iireAKEWBRpMN25cNExq86kuG5D0WM0VTUDx9Tafu4AYRpIQM-JCyIewzklPNojCkBTAJfGB1VxgAIs77nd4EiWo6t5YL-IE02Pd7mMcaLcvsJOpO5Uzn0r1WYA1wsx8Wx~MecjiBCuMew2xwZRB8ACMk6JLk8eYdSMYNscLA2kGi-HUKV75CjzgP5Q2uIVaaKu7jHlIXY9lZAZ0S~CpqNE3hWqbjVx9z0-CTyX7UKSOWNW7bLoOYaaEsXHrDpA__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/5c71/4597/ec579622c6bb36d5c7270b2f69325607?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=boMDIwHkozigeKx5ffF0ZSmV8Rmga2tll-WUxdmV13B4pSiVa~FNqCDgu6nRElwH2yJgjv-Ew3KhcB1NH2vPFzryrDmXDLMC~INenjGHCm~xcsQOnV4rmxaM3NjjK0PDJMITF64ugkRBdaNpyVkkTzQdd0BsmOjCi65LOOo69yvoik4DsgN5XL-IEEntFig0zv-0bnxdkmWZnQJ59D2OyacmrD40-qF-vaszqcLBmB04ydFfHlRgkZ-tlBnRc13s29K18ek8U7ipJLYuPMQ2ncgoFZMoERD0OUE0GvlA~Lw-pMUIoTtbbS4yK~JieLDmgF-JP6mOw43FaYPm9OMy4Q__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/d789/03e3/7e6bd40c5bbdaed6001a43918a96d91a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oxNBn8gVIBCkVdVhJxGl0b0LOxHP44oU0OVV~QhtsxSZ6VDaxHA6TC9wR8iEF8r1xcnOtRBvNKwMOnYPPLu7Prws58PVONj1DoKu~n0lGONNJlr8e1~Yq8yLl4~zbwRQfxnqVZ7OoRcvn9Cuk8y-iLEet~mJPJt-R0iGnSAaz6pZrHeBH-2P4rFwO0AekOcqekhhMRdciPv4isQ2r~QASjwAcTzlv2~UCsJmMfDdTa6TA~c3APXJANWOMzJ3n~Vm3zy5095WDTYw1gnSpx8I7WSeZB35ADKpo9PE0g1tjA1JPGw7DUsnv2s3oGVmOADlU-7dRSqfYvdsy~6B92KPzw__" />
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
                  <CardImage src="https://s3-alpha-sig.figma.com/img/c28e/18a1/85bd82b9f9cbc21841f731a460d02fe9?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tf7Bq31-sPEE03Rx9TL48ZSd6XD6pjfHmSb7atyvZXzlw8j1Mf1rFYzEQf89PzSYbM66SNpMHHyNh5lRLOta8aKuRN1dDcrdhdWrG2t6OUO4pyYVLUgGV3kJQg6R7Xu4qkR-h4U-6Lu9zjhiXRUkJtm~-mXIyoN7UhN2BUnGv0c4jUKXezvtkkFWSzBjv~Skof2tHIr~pKKywkjp5v4oYe-qOsq-4AvionopUIVIVhY9PQ8TzFFFHrPKK3gAateQSfbcOr5PY6zQu9oP-~brOOALDvtE45Mo6XYR~EwWPD20HMaVpJXTX8~OmGjYqfy1WEJRbC-cwPSNwE2nGnbRww__" />
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
          'https://s3-alpha-sig.figma.com/img/14b0/8390/936d40d7b92750887dccffb7f2c6ff25?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a5TIklDusPwRhnJvIKxlvQ0Ue9VLK0XdZpNmp~cWRnkl2G~XH88x-0vvktfnryWQRcqiNL6sZcFdJRS5Z6-XBUDN2qgYt2TWn3wHLQZe7emfRd5L6IY~70mAP0fBD8~HXuRxo3KqKGhns2--G8LP4VyRCuHUHaVGitZxbtY20o75zPdmZfYJiDBdFtaXLI0MVie1GI-4TW4J60xVG4BtMxt1d0BkqN9ZVHhmT-bsARbx3Ryi48p3jMfi0FuSBfOKl-a9KghQ-N7jT7ueh7FFw-h-r4kZWSVUwxE3UO3Dnzid9pjfNmuLAu7GV-VXxCNdEIC~GF~Uuo39cOipbCkf6A__'
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
            onClick={handleRoute}
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
  width: 1440px;
  height: fit-content;
  min-height: inherit;
  background-color: black;
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
    font-weight: 600;
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
  font-weight: 600;
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

  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  color: #ffffffff;
`;

const CardTitle = styled.div`
  font-weight: 600;
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
