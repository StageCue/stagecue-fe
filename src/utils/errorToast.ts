import { toast } from 'react-toastify';

interface ErrorToastProps {
  element: {
    appId: string;
    status: string;
    code: {
      value: string;
    };
  };
  message: {
    code: string;
    control: string;
    resolved: string;
    args: string | null;
  };
  data: string | null;
}

const ErrorToast = (error: ErrorToastProps) => {
  toast.error(error.message.resolved);
  return null;
};

export default ErrorToast;
