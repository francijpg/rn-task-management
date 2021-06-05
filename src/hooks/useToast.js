import {useToast} from 'native-base';

export const TOAST_DURATION = 3000;

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (status, title, description = '') => {
    toast.show({
      title,
      status,
      description,
      duration: TOAST_DURATION,
    });
  };
  return {
    showToast,
  };
};

export default useCustomToast;
