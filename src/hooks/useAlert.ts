import { useState } from 'react';

type AlertVariants = 'success' | 'danger' | 'warning' | '';

type UseAlertOutput = {
  alertVisible: boolean;
  alertVariant: AlertVariants;
  alertMessage: string;
  showAlert: (message: string, variant: AlertVariants) => void;
  hideAlert: () => void;
};

export const useAlert = (): UseAlertOutput => {
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<AlertVariants>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const showAlert = (message: string, variant: AlertVariants) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return { alertVisible, alertVariant, alertMessage, showAlert, hideAlert };
};
