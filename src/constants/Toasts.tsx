import Toast from 'react-native-toast-message';

const Success = (title: string, subTitle: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: subTitle,
    visibilityTime: 2000,
    position: 'top',
    autoHide: true,
  });
};

const Error = (title: string, subTitle: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: subTitle,
    visibilityTime: 2000,
    position: 'top',
    autoHide: true,
  });
};

const Info = (title: string, subTitle: string) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: subTitle,
    visibilityTime: 2000,
    position: 'top',
    autoHide: true,
  });
};

export const Toasts = { Success, Error, Info };
