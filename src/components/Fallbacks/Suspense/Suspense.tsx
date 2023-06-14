import { Spinner } from '@/components/Elements';

type Props = NonNullable<unknown>;

export const Suspense: React.FC<Props> = () => {
  return (
    <div className="grid place-items-center w-screen h-screen">
      <Spinner size="xl" />
    </div>
  );
};
