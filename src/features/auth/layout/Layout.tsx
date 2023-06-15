import { Head } from '@/components/Head';

type Props = {
  children: React.ReactNode;
  title: string;
};

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div> {children} </div>
    </>
  );
};

export default Layout;
