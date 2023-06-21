import { AppProviders } from '@/providers/app';

import { AppRoutes } from './routes';

const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
