/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/button';
import styled from 'styled-components';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import CaretDownSVG from '@assets/icons/caret_down.svg?react';
import PlusSVG from '@assets/icons/plus_circle.svg?react';
import MinusSVG from '@assets/icons/minus.svg?react';
import RadioSVG from '@assets/icons/radio.svg?react';
import RadioCheckedSVG from '@assets/icons/radio_checked.svg?react';
import { useForm } from 'react-hook-form';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import DeleteSVG from '@assets/icons/delete_circle.svg?react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { generateId } from '@/utils/dev';
import { convertFileToURL } from '@/utils/file';
import {
  requestCreateRecruit,
  // requestDeleteRecruit,
  requestRecruitFormData,
  requestUploadRecruitImage,
} from '@/api/biz';
import Checkbox from '@/components/checkbox';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import RangeDatepicker from '@/components/rangeDatepicker';
import { decimalToBinaryArray } from '@/utils/format';
import { CATEGORY, RecruitStatus } from '@/types/biz';
import ModalPortal from '@/components/modal/portal';
import Overlay from '@/components/modal/overlay';
import Datepicker from '@/components/datepicker';

interface EditRecruitInputs {
  title: string;
  introduce: string;
  recruitEnd: string;
  recruitingParts: { value: string; id: string }[];
  monthlyFee: number;
  artworkName: string;
  category: string;
  recruitStatus: keyof typeof RecruitStatus;
  recruitImages?: string[];
  practice: {
    start: string;
    end: string;
    dayOfWeek: number;
    address: string;
    addressDetail: string;
  };
  stage: {
    start: string;
    end: string;
    address: string;
    addressDetail: string;
  };
}

const EditRecruit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
  } = useForm<EditRecruitInputs>();

  const inputImageFileRef = useRef<HTMLInputElement | null>(null);
  const inputModalRef = useRef<HTMLDivElement | null>(null);

  const [isDetailRecruit, setIsDetailRecruit] = useState(false);

  const open = useDaumPostcodePopup();
  const [part, setPart] = useState<string>('');
  const [isMontlyFee, setIsMontlyFee] = useState<boolean>(false);

  const [imageUrlArray, setImageUrlArray] = useState<{ url: string; id: string }[]>([]);
  const [imageFileArray, setImageFileArray] = useState<{ file: File | null; id: string }[]>([]);

  const [isDaySelectOpen, setIsDaySelectOpen] = useState(false);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [practiceDays, setPracticeDays] = useState(['0', '0', '0', '0', '0', '0', '0']);

  const category = Object.keys(CATEGORY);

  const [daysText, setDaysText] = useState('선택해주세요.');
  const [categoryText, setCategoryText] = useState('');
  const [isNewRecruitModalOpen, setIsNewRecruitModalOpen] = useState(false);

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const [
    titleValue,
    partsValue,
    introduceValue,
    recruitEndValue,
    practiceStartValue,
    practiceEndValue,
    addressValue,
    addressDetailValue,
    monthlyFeeValue,
    categoryValue,
    artworkNameValue,
    stgStartValue,
    stgEndValue,
    stgAddressValue,
    stgAddressDetailValue,
  ] = watch([
    'title',
    'recruitingParts',
    'introduce',
    'recruitEnd',
    'practice.start',
    'practice.end',
    'practice.address',
    'practice.addressDetail',
    'monthlyFee',
    'category',
    'artworkName',
    'stage.start',
    'stage.end',
    'stage.address',
    'stage.addressDetail',
  ]);

  const isSaveDisabled =
    !titleValue ||
    !partsValue ||
    !introduceValue ||
    !recruitEndValue ||
    !practiceStartValue ||
    !practiceEndValue ||
    !practiceDays ||
    !addressValue ||
    !addressDetailValue ||
    !categoryValue ||
    !artworkNameValue ||
    !stgStartValue ||
    !stgEndValue ||
    !stgAddressValue ||
    !stgAddressDetailValue;

  const [recruitStatus, setRecruitStatus] = useState('');
  const [isAlwaysRecruit, setIsAlwaysRecruit] = useState(false);

  const recruitEndDatepickerRef = useRef<DatePicker | null>(null);
  const [recruitEnd, setRecruitEnd] = useState<Date | null>(null);

  const practiceDatepickerRef = useRef<DatePicker | null>(null);
  const [practiceDataRange, setPracticeDataRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const stageDatepickerRef = useRef<DatePicker | null>(null);
  const [stageDateRange, setStageDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleRecruitCalendarClick = () => {
    if (recruitEndDatepickerRef.current) {
      recruitEndDatepickerRef.current.setOpen(true);
    }
  };

  const handlePracticeCalendarClick = () => {
    if (practiceDatepickerRef.current) {
      practiceDatepickerRef.current.setOpen(true);
    }
  };

  const handleStageCalendarClick = () => {
    if (stageDatepickerRef.current) {
      stageDatepickerRef.current.setOpen(true);
    }
  };

  const handleRecruitEndChange = (date: Date | null) => {
    setRecruitEnd(date);
    if (date) {
      const stringDate = date
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\./g, '-')
        .replace(/\s/g, '')
        .replace(/-$/, '');
      setValue('recruitEnd', stringDate);
    }
  };

  const handlePracticeRangeChange = (range: [Date | null, Date | null]) => {
    setPracticeDataRange(range);
    if (range) {
      const stringDate = range.map(date =>
        date
          ?.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\./g, '-')
          .replace(/\s/g, '')
          .replace(/-$/, '')
      );
      setValue('practice.start', stringDate[0]!);
      setValue('practice.end', stringDate[1]!);
    }
  };

  const handleStageRangeChange = (range: [Date | null, Date | null]) => {
    setStageDateRange(range);
    if (range) {
      const stringDate = range.map(date =>
        date
          ?.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\./g, '-')
          .replace(/\s/g, '')
          .replace(/-$/, '')
      );
      setValue('stage.start', stringDate[0]!);
      setValue('stage.end', stringDate[1]!);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitEditRecruit = async (data: EditRecruitInputs) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const recruitImages = (await requestUploadImageFiles())?.map((image: any) => image?.fileName);
      const recruitingParts = partsValue?.map(({ value }) => value);

      const { ...fieldData } = data;

      const res = await requestCreateRecruit({
        ...fieldData,
        monthlyFee: !isMontlyFee ? 0 : monthlyFeeValue,
        recruitingParts,
        recruitImages,
        recruitStatus,
      });

      setIsNewRecruitModalOpen(false);

      if (res?.id) {
        navigate(`/biz/cast/${res?.id}/form`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestUploadImageFiles = async () => {
    try {
      const urls = await Promise.all(
        imageFileArray.map(async item => {
          const formData = new FormData();
          formData.append('file', item.file!);
          const url = (await requestUploadRecruitImage(formData)) as string;
          return url;
        })
      );
      setValue('recruitImages', urls);
      return urls;
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleDayInputClick = (e: React.MouseEvent) => {
    inputModalRef.current = e?.target as HTMLDivElement;
    setIsDaySelectOpen(prev => !prev);
  };

  const handleCategoryInputClick = (e: React.MouseEvent) => {
    inputModalRef.current = e?.target as HTMLDivElement;
    setIsCategorySelectOpen(prev => !prev);
  };

  const handlePartsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      const id = generateId();

      if (partsValue) {
        setValue('recruitingParts', [...partsValue, { value: part, id }]);
      } else {
        setValue('recruitingParts', [{ value: part, id }]);
      }

      setPart('');
    }
  };

  const handlePartChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPart(event.target.value);
  };

  const handleDeleteChipClick = (id: string) => {
    setValue(
      'recruitingParts',
      partsValue.filter(part => part.id !== id)
    );
  };

  const handleAddressComplete = (data: any, input: string) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    if (input === 'practice') {
      setValue('practice.address', fullAddress);
    } else if (input === 'stage') {
      setValue('stage.address', fullAddress);
    }
  };

  const handleAddressInputClick = (input: string) => {
    open({ onComplete: data => handleAddressComplete(data, input) });
  };

  const handleDayClick = (index: number) => {
    setPracticeDays(prevDays => {
      const updatedDays = [...prevDays];
      updatedDays[index] = updatedDays[index] === '0' ? '1' : '0';
      return updatedDays;
    });
  };

  const handleCategoryClick = (category: string) => {
    setValue('category', category);
    setCategoryText(category);
    setIsCategorySelectOpen(false);
  };

  const handleDayResetClick = () => {
    setPracticeDays(['0', '0', '0', '0', '0', '0', '0']);
    setDaysText('선택해주세요.');
  };

  const getActiveDays = (daysArray: string[]): string => {
    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

    return daysArray
      ?.map((day, index) => (day === '1' ? daysOfWeek[index] : null))
      .filter(Boolean)
      .join(', ');
  };

  const daysArrayToDecimal = (daysArray: string[]): number => {
    const binaryString = daysArray.join('');
    return parseInt(binaryString, 2);
  };

  const handleApplyDayClick = (days?: string[]) => {
    const activeDays = getActiveDays(days ?? practiceDays);

    if (activeDays) {
      setDaysText(`매주 / ${activeDays}`);
    } else {
      setDaysText('선택해주세요.');
    }

    setValue('practice.dayOfWeek', daysArrayToDecimal(practiceDays));
    setIsDaySelectOpen(false);
  };

  const handleAddImageClick = () => {
    if (inputImageFileRef.current) {
      inputImageFileRef.current.click();
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const url = convertFileToURL(file);
      const id = generateId();

      setImageUrlArray(prev => [...prev, { url, id }]);
      setImageFileArray(prev => [...prev, { file, id }]);
    }
  };

  const handleDeleteImageClick = (id: string) => {
    setImageUrlArray(prevArray => prevArray.filter(item => item.id !== id));
    setImageFileArray(prevArray => prevArray.filter(item => item.id !== id));
  };

  const handleMontlyFeeRadioClick = (isMontlyFee: boolean) => {
    setIsMontlyFee(isMontlyFee);
    if (!isMontlyFee) {
      setValue('monthlyFee', 0);
    }
  };

  const handleDeleteRecruit = async () => {
    // TODO: 추후 개발
    // await requestDeleteRecruit({
    //   applyIds: [id!],
    // });
  };

  const getRecruitFormData = async (id: string) => {
    const res = await requestRecruitFormData(id);
    setValue('title', res.title);
    setValue('introduce', res.introduce);
    setValue(
      'recruitingParts',
      res.recruitingParts.map((part: string) => {
        const id = generateId();
        return { value: part, id };
      })
    );
    setValue('monthlyFee', res.monthlyFee);
    if (res.monthlyFee !== 0) {
      setIsMontlyFee(true);
    }
    setValue('recruitEnd', res.recruitEnd);
    setValue('practice.start', res.practice.start);
    setValue('practice.end', res.practice.end);
    setValue('practice.dayOfWeek', res.practice.dayOfWeek);
    setPracticeDays(decimalToBinaryArray(res.practice.dayOfWeek));
    setValue('practice.address', res.practice.address);
    setValue('practice.addressDetail', res.practice.addressDetail);
    setValue('category', res.category);
    setCategoryText(res.category);
    setValue('artworkName', res.artworkName);
    setValue('stage.start', res.stage.start);
    setValue('stage.end', res.stage.end);
    setValue('stage.address', res.stage.address);
    setValue('stage.addressDetail', res.stage.addressDetail);

    handleRecruitEndChange(new Date(res.recruitEnd));
    handlePracticeRangeChange([new Date(res.practice.start), new Date(res.practice.end)]);
    handleApplyDayClick(decimalToBinaryArray(res.practice.dayOfWeek));
    handleStageRangeChange([new Date(res.stage.start), new Date(res.stage.end)]);

    const currentImagesArray: { id: string; url: string }[] = res.recruitImages.map(
      (url: string) => {
        const id = generateId();
        return { id, url };
      }
    );

    const currentFileArray = currentImagesArray.map(({ id }) => {
      return { id, file: null };
    });

    setImageUrlArray(currentImagesArray);
    setImageFileArray(currentFileArray);
  };

  useEffect(() => {
    if (id) {
      setIsDetailRecruit(true);
      getRecruitFormData(id!);
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputModalRef?.current && !inputModalRef?.current?.contains(event?.target as Node)) {
        setIsDaySelectOpen(false);
        setIsCategorySelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDaySelectOpen]);

  return (
    <EditRecruitContainer>
      <Form onSubmit={handleSubmit(onSubmitEditRecruit)}>
        <TitleWrapper>
          <Title>
            <Text>{isDetailRecruit ? '공고 상세정보' : '새 모집 공고 올리기'}</Text>
            <SubText>
              <RedDot /> 표시는 필수 입력 항목입니다.
            </SubText>
          </Title>
          <ButtonsWrapper>
            {isDetailRecruit ? (
              <>
                <Button
                  type="button"
                  variation="text"
                  btnClass="assistive"
                  width={58}
                  height={32}
                  fontSize={15}
                  padding="0px 3px"
                  lineHeight={146.7}
                  letterSpacing={0.96}
                  onClick={handleDeleteRecruit}
                >
                  삭제
                </Button>
                <Button
                  type="submit"
                  variation="outlined"
                  btnClass="primary"
                  width={94}
                  height={40}
                  fontSize={15}
                  padding="9px 20px"
                  lineHeight={146.7}
                  letterSpacing={0.96}
                  onClick={() => setRecruitStatus('TEMP')}
                >
                  공고마감
                </Button>
                <Button
                  type="submit"
                  variation="solid"
                  btnClass="primary"
                  width={81}
                  height={40}
                  fontSize={15}
                  padding="9px 20px"
                  lineHeight={146.7}
                  letterSpacing={0.96}
                  onClick={() => setRecruitStatus('RECRUIT')}
                  disabled={isSaveDisabled}
                >
                  저장
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variation="text"
                  btnClass="assistive"
                  width={58}
                  height={32}
                  fontSize={15}
                  padding="0px 3px"
                  lineHeight={146.7}
                  letterSpacing={0.96}
                >
                  미리보기
                </Button>
                <Button
                  type="button"
                  variation="outlined"
                  btnClass="primary"
                  width={94}
                  height={40}
                  fontSize={15}
                  padding="9px 20px"
                  lineHeight={146.7}
                  letterSpacing={0.96}
                  onClick={() => setRecruitStatus('TEMP')}
                  // TODO: <2025-03-02> 백에서 수정이 필요한 부분이여서 disabled true로 설정
                  disabled={true}
                >
                  임시저장
                </Button>
                <Button
                  type="button"
                  variation="solid"
                  btnClass="primary"
                  width={81}
                  height={40}
                  fontSize={15}
                  padding="9px 20px"
                  lineHeight={146.7}
                  letterSpacing={0.96}
                  onClick={() => {
                    setRecruitStatus('RECRUIT');
                    setIsNewRecruitModalOpen(true);
                  }}
                  disabled={isSaveDisabled}
                >
                  올리기
                </Button>
              </>
            )}
          </ButtonsWrapper>
        </TitleWrapper>
        <MiddleTitle>공고정보</MiddleTitle>
        <InputWrapper>
          <RequiredLabel>
            공고명
            <RequiedRedDot />
          </RequiredLabel>
          <Input
            $isDirty={Boolean(dirtyFields.title)}
            $isError={Boolean(errors.title)}
            placeholder="공고명을 입력해주세요"
            {...register('title', { required: true })}
          />
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            모집 배역
            <RequiedRedDot />
          </RequiredLabel>
          <ChipInputWrapper $isDirty={Boolean(dirtyFields.recruitingParts)} $isError={false}>
            {partsValue?.map(({ value, id }) => (
              <Chip key={id}>
                {value}
                <DeleteIconWrapper onClick={() => handleDeleteChipClick(id)}>
                  <DeleteSVG />
                </DeleteIconWrapper>
              </Chip>
            ))}
            <ChipInput
              onChange={handlePartChange}
              onKeyDown={handlePartsKeyDown}
              placeholder="배역명을 입력 후 Enter를 눌러주세요."
              value={part}
            />
          </ChipInputWrapper>
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            공고 상세 내용
            <RequiedRedDot />
          </RequiredLabel>
          <TextAreaWrapper
            $isDirty={Boolean(dirtyFields.introduce)}
            $isError={Boolean(errors.introduce)}
          >
            <TextAreaInput
              placeholder="공고 내용을 작성해주세요"
              {...register('introduce', { required: true, maxLength: 3000 })}
            />
            <Counter>0/ 3000</Counter>
          </TextAreaWrapper>
        </InputWrapper>
        <InputWrapper>
          <Label>공고 관련 이미지</Label>
          <Images>
            {imageUrlArray?.map(({ url, id }, index) => (
              <ImageWrapper key={id}>
                {!imageFileArray[index].file ? (
                  <RecruitImage key={id} src={`https://s3.stagecue.co.kr/stagecue/${url}`} />
                ) : (
                  <RecruitImage key={id} src={url} />
                )}

                <AbsoluteIconWrapper onClick={() => handleDeleteImageClick(id)}>
                  <MinusSVG />
                </AbsoluteIconWrapper>
              </ImageWrapper>
            ))}
            {imageUrlArray?.length < 4 && (
              <>
                <FileInput ref={inputImageFileRef} type="file" onChange={handleImageChange} />
                <AddImageInput onClick={handleAddImageClick}>
                  <IconWrapper>
                    <PlusSVG />
                  </IconWrapper>
                </AddImageInput>
              </>
            )}
          </Images>
        </InputWrapper>
        <PairInputWrapper>
          <InputWrapper>
            <RequiredLabel>
              모집마감
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper $isDirty={Boolean(dirtyFields.practice?.start)} $isError={false}>
              <Datepicker
                ref={recruitEndDatepickerRef}
                selectedDate={recruitEnd}
                onChangeDate={(date: Date | null) => {
                  handleRecruitEndChange(date);
                }}
                pickerText="모집 마감일을 입력해주세요"
              />
              <IconWrapper onClick={handleRecruitCalendarClick}>
                <CalendarSVG />
              </IconWrapper>
            </WithIconInputWrapper>
          </InputWrapper>
          <CheckboxWrapper>
            <Checkbox
              checked={isAlwaysRecruit}
              onChange={() => setIsAlwaysRecruit(!isAlwaysRecruit)}
              label="상시모집"
            />
          </CheckboxWrapper>
        </PairInputWrapper>
        <PairInputWrapper>
          <InputWrapper>
            <RequiredLabel>
              연습기간
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper $isDirty={Boolean(dirtyFields.practice?.start)} $isError={false}>
              <RangeDatepicker
                ref={practiceDatepickerRef}
                selectedRange={practiceDataRange}
                onChangeDate={(range: [Date | null, Date | null]) => {
                  handlePracticeRangeChange(range);
                }}
                pickerText="연습기간을 입력해주세요"
              />
              <IconWrapper onClick={handlePracticeCalendarClick}>
                <CalendarSVG />
              </IconWrapper>
            </WithIconInputWrapper>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              연습요일
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper
              $isDirty={Boolean(dirtyFields.practice?.dayOfWeek)}
              $isError={false}
              onClick={handleDayInputClick}
            >
              {daysText}
              <IconWrapper>
                <CaretDownSVG />
              </IconWrapper>
              {isDaySelectOpen && (
                <DaySelector>
                  <DaysWrapper>
                    {days?.map((day, index) => (
                      <Day
                        key={day}
                        $isSelected={practiceDays[index] === '1'}
                        onClick={e => {
                          e?.stopPropagation();
                          handleDayClick(index);
                        }}
                      >
                        {day}
                      </Day>
                    ))}
                  </DaysWrapper>
                  <SelelctorActionWrapper onClick={e => e?.stopPropagation()}>
                    <Button
                      type="button"
                      variation="text"
                      btnClass="assistive"
                      width={38}
                      height={28}
                      padding="0px"
                      fontSize={14}
                      lineHeight={142.9}
                      letterSpacing={1.45}
                      onClick={handleDayResetClick}
                    >
                      초기화
                    </Button>
                    <Button
                      type="button"
                      variation="text"
                      btnClass="primary"
                      width={25}
                      height={28}
                      padding="0px"
                      fontSize={14}
                      lineHeight={142.9}
                      letterSpacing={1.45}
                      onClick={() => handleApplyDayClick()}
                    >
                      적용
                    </Button>
                  </SelelctorActionWrapper>
                </DaySelector>
              )}
            </WithIconInputWrapper>
          </InputWrapper>
        </PairInputWrapper>
        <InputWrapper>
          <RequiredLabel>
            연습위치
            <RequiedRedDot />
          </RequiredLabel>
          <FakeInput
            onClick={() => handleAddressInputClick('practice')}
            $isDirty={Boolean(dirtyFields.practice?.address)}
          >
            {addressValue || '클릭해서 주소를 검색해주세요.'}
          </FakeInput>
          <Input
            type="text"
            $isDirty={Boolean(dirtyFields.practice?.addressDetail)}
            $isError={Boolean(errors.practice?.addressDetail)}
            {...register('practice.addressDetail', { required: true })}
          />
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            월회비
            <RequiedRedDot />
          </RequiredLabel>

          <RadioInputs>
            <RadioInputWrapper onClick={() => handleMontlyFeeRadioClick(false)}>
              {!isMontlyFee ? <RadioCheckedSVG /> : <RadioSVG />}
              회비가 없어요
            </RadioInputWrapper>
            <WithTextInputWrapper>
              <RadioInputWrapper onClick={() => handleMontlyFeeRadioClick(true)}>
                {isMontlyFee ? <RadioCheckedSVG /> : <RadioSVG />}
                회비가 있어요
              </RadioInputWrapper>
              <FeeInputWrapper
                $isDirty={Boolean(dirtyFields.monthlyFee)}
                $isError={false}
                $isDisabled={!isMontlyFee}
              >
                <FeeInput disabled={!isMontlyFee} {...register('monthlyFee')} />원
              </FeeInputWrapper>
            </WithTextInputWrapper>
          </RadioInputs>
        </InputWrapper>
        <Divider />
        <MiddleTitle>작품정보</MiddleTitle>
        <PairInputWrapper>
          <InputWrapper onClick={handleCategoryInputClick}>
            <RequiredLabel>
              카테고리
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconShortInputWrapper $isDirty={Boolean(dirtyFields.category)} $isError={false}>
              {categoryText ? CATEGORY[categoryText] : '선택해주세요'}
              <IconWrapper>
                <CaretDownSVG />
              </IconWrapper>
              {isCategorySelectOpen && (
                <CategorySelector>
                  {category?.map(key => (
                    <Category
                      key={key}
                      onClick={e => {
                        e?.stopPropagation();
                        handleCategoryClick(key);
                      }}
                    >
                      {CATEGORY[key]}
                    </Category>
                  ))}
                </CategorySelector>
              )}
            </WithIconShortInputWrapper>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              작품명
              <RequiedRedDot />
            </RequiredLabel>
            <MiddleInput
              $isDirty={Boolean(dirtyFields.artworkName)}
              $isError={false}
              type="text"
              placeholder="작품명을 입력해주세요"
              {...register('artworkName', { required: true })}
            />
          </InputWrapper>
        </PairInputWrapper>
        <InputWrapper>
          <RequiredLabel>
            공연기간
            <RequiedRedDot />
          </RequiredLabel>
          <WithIconInputWrapper $isDirty={Boolean(dirtyFields.stage?.start)} $isError={false}>
            <RangeDatepicker
              ref={stageDatepickerRef}
              selectedRange={stageDateRange}
              onChangeDate={(range: [Date | null, Date | null]) => {
                handleStageRangeChange(range);
              }}
              pickerText="공연기간을 입력해주세요"
            />
            <IconWrapper onClick={handleStageCalendarClick}>
              <CalendarSVG />
            </IconWrapper>
          </WithIconInputWrapper>
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            공연위치
            <RequiedRedDot />
          </RequiredLabel>
          <FakeInput onClick={() => handleAddressInputClick('stage')} $isDirty={false}>
            {stgAddressValue || '클릭해서 주소를 검색해주세요.'}
          </FakeInput>
          <Input
            type="text"
            $isDirty={Boolean(dirtyFields.practice?.addressDetail)}
            $isError={Boolean(errors.practice?.addressDetail)}
            {...register('stage.addressDetail', { required: true })}
          />
        </InputWrapper>
        {isNewRecruitModalOpen && (
          <ModalPortal>
            <Overlay>
              <Modal>
                <ModalTitle>공고 올리기</ModalTitle>
                <ModalSubTitle>작성하신 내용으로 공고를 올려볼까요?</ModalSubTitle>
                <ButtonContainer>
                  <Button
                    type="button"
                    variation="outlined"
                    btnClass="assistive"
                    width={146}
                    height={48}
                    onClick={() => setIsNewRecruitModalOpen(false)}
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    variation="solid"
                    btnClass="primary"
                    width={146}
                    height={48}
                    onClick={handleSubmit(onSubmitEditRecruit)}
                  >
                    올리기
                  </Button>
                </ButtonContainer>
              </Modal>
            </Overlay>
          </ModalPortal>
        )}
      </Form>
    </EditRecruitContainer>
  );
};

export default EditRecruit;

const Modal = styled.div`
  width: 340px;
  height: fit-content;
  min-height: 176px;
  border-radius: 16px;
  padding: 24px 20px 20px 20px;

  background: var(--Background-Normal-Normal, #ffffffff);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
`;

const ModalTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #171719ff;
  text-align: center;
`;

const ModalSubTitle = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #2e2f33e0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const EditRecruitContainer = styled.div`
  width: 692px;
  margin: 88px 244px 100px 244px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 64px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const SubText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RedDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #b81716;
  border-radius: 50%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 17px;
  align-items: center;
`;

const MiddleTitle = styled.div`
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  color: #000000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RequiredLabel = styled.div`
  position: relative;
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #171719;
`;

const RequiedRedDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #b81716;
  border-radius: 50%;
  position: absolute;
  left: -2px;
  top: -2px;
`;

const Input = styled.input<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
  outline: none;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const TextAreaWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 692px;
  height: 302px;
  border: 1px solid #e0e0e2;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const TextAreaInput = styled.textarea`
  width: 660px;
  height: 248px;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const Counter = styled.div`
  color: #dfdfe0;
  font-size: 13px;
  font-weight: var(--font-regular);
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const Label = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #171719;
`;

const PairInputWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const WithIconInputWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  cursor: pointer;
  position: relative;
  width: 340px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
`;

const WithIconShortInputWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  position: relative;
  width: 220px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
`;

const FakeInput = styled.div<{ $isDirty: boolean }>`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  border: ${({ $isDirty }) => ($isDirty ? '1px solid #000000' : '1px solid #e0e0E2')};
  color: ${({ $isDirty }) => ($isDirty ? '#171719;' : '#dadada;')};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e2;
`;

const MiddleInput = styled.input<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 460px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
  outline: none;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const ChipInputWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  display: flex;
  align-items: center;
  color: #171719;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
  outline: none;
  display: flex;
  gap: 12px;
  overflow: scroll;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const Chip = styled.div`
  width: fit-content;
  height: 32px;
  display: flex;
  gap: 3px;
  padding: 6px 12px;
  background-color: #f8f8f8;
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
  letter-spacing: 1.45%;
  color: #171719;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChipInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: none;
  outline: none;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const DeleteIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const DaySelector = styled.div`
  position: absolute;
  width: 340px;
  height: 108px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: white;
  bottom: -111px;
  left: 0;
  border-radius: 10px;
`;

const DaysWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 32px;
`;

const Day = styled.div<{ $isSelected: boolean }>`
  width: 40px;
  height: 32px;
  border: ${({ $isSelected }) => ($isSelected ? '1px solid #B81716' : '1px solid #e1e2e4')};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: var(--font-semibold);
  line-height: 138.5%;
  letter-spacing: 1.94%;
  color: ${({ $isSelected }) => ($isSelected ? ' #B81716' : '1px solid #171719')};
  cursor: pointer;
  z-index: 200;
`;

const SelelctorActionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CategorySelector = styled.div`
  position: absolute;
  width: 220px;
  height: 124px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 200;
  left: 0;
  bottom: -128px;
`;

const Category = styled.div`
  width: 188px;
  height: 28px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #858688;
  cursor: pointer;
`;

const AddImageInput = styled.div`
  width: 160px;
  height: 240px;
  border-radius: 8px;
  background-color: #f4f4f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Images = styled.div`
  width: 692px;
  height: 240px;
  display: flex;
  gap: 17px;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const RecruitImage = styled.img`
  width: 160px;
  height: 240px;
  border-radius: 8px;
`;

const AbsoluteIconWrapper = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  background-color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RadioInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RadioInputWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const WithTextInputWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const FeeInputWrapper = styled.div<{ $isDirty: boolean; $isError: boolean; $isDisabled: boolean }>`
  width: 120px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: ${({ $isDirty, $isDisabled }) =>
    $isDisabled ? ' #e0e0E2' : $isDirty ? ' #171719;' : ' #e0e0E2'};
  border: ${({ $isDirty, $isError, $isDisabled }) =>
    $isDisabled
      ? '1px solid #e0e0E2'
      : $isError
      ? '1px solid #FF4242'
      : $isDirty
      ? '1px solid #000000'
      : '1px solid #e0e0E2'};

  display: flex;
  gap: 5px;

  input {
    color: ${({ $isDisabled }) => ($isDisabled ? ' #e0e0E2' : '')};
  }
`;

const FeeInput = styled.input`
  width: 70px;
  height: 24px;
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #171719;
  text-align: end;
`;

const CheckboxWrapper = styled.div`
  margin-top: auto;
  height: 40px;
`;
