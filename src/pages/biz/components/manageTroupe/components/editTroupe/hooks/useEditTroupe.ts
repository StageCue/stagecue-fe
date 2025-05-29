import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import DatePicker from 'react-datepicker';
import {
  requestPostTroupe,
  requestTroupeEditInfo,
  requestUploadCover,
  requestUploadLogo,
  requestUploadRegistration,
} from '@/api/biz';
import { convertFileToURL, seperateFileNameFromPath } from '@/utils/file';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useGetTroupeInfo } from '../../../hooks/useGetTroupe';

export interface EditTroupeInputs {
  name: string;
  publishDate: string;
  description: string;
  address: string;
  addressDetail: string;
  registrationNumber: string;
  registrationFile: string;
  picName: string;
  picCell: string;
  email: string;
  website: string;
  logoImg: string;
  coverImg: string;
}

interface AddressData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  autoJibunAddress: string;
}

const getCoverFileName = (path: string) => {
  if (path) {
    const parts = path.split('/');
    return parts[parts.length - 1];
  }
  return '';
};

export const useEditTroupe = (isInitial: boolean) => {
  const navigate = useNavigate();
  const open = useDaumPostcodePopup();
  const { refetch: refetchTroupInfo } = useGetTroupeInfo();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    watch,
    setValue,
    control,
    reset,
  } = useForm<EditTroupeInputs>({ mode: 'all' });

  const inputLogoFileRef = useRef<HTMLInputElement | null>(null);
  const inputCoverFileRef = useRef<HTMLInputElement | null>(null);
  const inputRegistrationFileRef = useRef<HTMLInputElement | null>(null);
  const datepickerRef = useRef<DatePicker | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [logoFile, setLogoFile] = useState<File>();
  const [logoImageName, setLogoImageName] = useState<string>();
  const [logoPreview, setLogoPreview] = useState<string>();
  const [coverFile, setCoverFile] = useState<File>();
  const [coverImageName, setCoverImageName] = useState<string>();
  const [coverFileName, setCoverFileName] = useState<string>();
  const [registrationFile, setRegistrationFile] = useState<File>();
  const [registrationFileName, setRegistrationFileName] = useState<string>();
  const [isInvalidaModalShowing, setIsInvalidModalShowing] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const [descriptionValue, addressValue] = watch(['description', 'address']);

  const handleCalendarClick = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(true);
    }
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleLogoInputClick = () => {
    if (inputLogoFileRef.current) {
      inputLogoFileRef.current.click();
    }
  };

  const handleCoverInputClick = () => {
    if (inputCoverFileRef.current) {
      inputCoverFileRef.current.click();
    }
  };

  const handleRegistrationInputClick = () => {
    if (inputRegistrationFileRef.current) {
      inputRegistrationFileRef.current.click();
    }
  };

  const validateFile = (file: File, type: 'logo' | 'cover' | 'registration'): boolean => {
    if (file.size > 1 * 1024 * 1024) {
      return false;
    }

    if (type === 'registration') {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
      if (!allowedExtensions.test(file.name)) {
        return false;
      }
    } else {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.test(file.name)) {
        return false;
      }
    }

    return true;
  };

  const handleInvalidConfirm = () => {
    setIsInvalidModalShowing(false);
  };

  const handleLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const isValidFile = validateFile(file, 'logo');
      if (isValidFile) {
        const url = convertFileToURL(file);
        setLogoFile(file);
        setLogoPreview(url);
        setValue('logoImg', 'temp-placeholder', { shouldValidate: true });
      } else {
        setIsInvalidModalShowing(true);
      }
    }
  };

  const handleCoverFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const path = event.target.value;

    if (file) {
      const isValidFile = validateFile(file, 'cover');
      if (isValidFile) {
        setCoverFile(file);
        setCoverFileName(seperateFileNameFromPath(path));
      } else {
        setIsInvalidModalShowing(true);
      }
    }
  };

  const handleRegistrationFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const path = event.target.value;

    if (file) {
      const isValidFile = validateFile(file, 'registration');

      if (isValidFile) {
        const fileName = seperateFileNameFromPath(path);
        setRegistrationFile(file);
        setRegistrationFileName(fileName);
      } else {
        setIsInvalidModalShowing(true);
      }
    }
  };

  const handleAddressComplete = (data: AddressData) => {
    let fullAddress = data?.autoJibunAddress;
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

    setValue('address', fullAddress);
  };

  const handleAddressInputClick = () => {
    open({ onComplete: handleAddressComplete });
  };

  const uploadLogoFile = async () => {
    if (logoFile) {
      const formData = new FormData();
      formData.append('file', logoFile);
      const { result } = await requestUploadLogo(formData);

      setValue('logoImg', result);
      return result;
    } else {
      return logoImageName;
    }
  };

  const uploadCoverFile = async () => {
    if (coverFile) {
      const formData = new FormData();
      formData.append('file', coverFile);
      const { result } = await requestUploadCover(formData);

      setValue('coverImg', result);
      return result;
    } else {
      return coverImageName;
    }
  };

  const requestUploadRegistrationFile = async () => {
    if (registrationFile) {
      const formData = new FormData();
      formData.append('file', registrationFile);
      const { result } = await requestUploadRegistration(formData);

      setValue('registrationFile', result);
      return result;
    } else {
      return registrationFileName;
    }
  };

  const onSubmitEdit = async (data: EditTroupeInputs) => {
    try {
      setIsLoading(true);

      const logoPromise = uploadLogoFile();
      const coverPromise = uploadCoverFile();
      const regPromise = requestUploadRegistrationFile();

      const [logoImg, coverImg, registrationFile] = await Promise.all([
        logoPromise,
        coverPromise,
        regPromise,
      ]);

      await requestPostTroupe({
        ...data,
        logoImg,
        coverImg,
        registrationFile,
      });
      refetchTroupInfo();
      navigate('/biz/troupe/created');
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const getTroupeFormData = async () => {
    const viewData = await requestTroupeEditInfo();

    setLogoImageName(viewData.logoImg);
    setLogoPreview(viewData.logoImg);
    setCoverImageName(viewData.coverImg);
    setCoverFileName(getCoverFileName(viewData.coverImg));
    setDate(new Date(viewData.publishDate));
    setRegistrationFileName(viewData.registrationFile);
    reset(viewData);
  };

  useEffect(() => {
    if (!isInitial) {
      getTroupeFormData();
    }
  }, [isInitial]);

  return {
    isLoading,
    register,
    handleSubmit,
    errors,
    dirtyFields,
    isValid,
    control,
    inputLogoFileRef,
    inputCoverFileRef,
    inputRegistrationFileRef,
    datepickerRef,
    logoPreview,
    coverFileName,
    registrationFileName,
    isInvalidaModalShowing,
    date,
    descriptionValue,
    addressValue,
    handleCalendarClick,
    handleDateChange,
    handleLogoInputClick,
    handleCoverInputClick,
    handleRegistrationInputClick,
    handleInvalidConfirm,
    handleLogoFileChange,
    handleCoverFileChange,
    handleRegistrationFileChange,
    handleAddressInputClick,
    onSubmitEdit,
  };
};
