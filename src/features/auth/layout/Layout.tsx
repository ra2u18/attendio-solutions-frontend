import { Head } from '@/components/Head';

type Props = {
  children: React.ReactNode;
  title: string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head title={title} />

      <div>{children}</div>
    </>
  );
};
