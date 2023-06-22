import { createContext, useContext, useState } from 'react';

import { AlertVariant } from '@/components';

type AlertType = { text: string; variant: AlertVariant; children?: React.ReactNode };
type AlertsManagerContextProps = {
  alert: AlertType | null;
  notify: (alert: AlertType) => void;
  removeAlert: () => void;
};

const AlertsManagerContext = createContext<AlertsManagerContextProps>({
  alert: null,
  notify: (_: AlertType) => {},
  removeAlert: () => {},
});

type Props = { children: React.ReactNode };
export const AlertsManagerProvider: React.FC<Props> = ({ children }) => {
  const [alert, setAlert] = useState<AlertType | null>(null);

  const notify = (_alert: AlertType) => setAlert({ ..._alert });
  const removeAlert = () => setAlert(null);

  return (
    <AlertsManagerContext.Provider value={{ alert, notify, removeAlert }}>
      {children}
    </AlertsManagerContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertsManagerContext);
};
