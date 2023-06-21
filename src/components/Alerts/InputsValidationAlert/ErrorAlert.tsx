import { XCircleIcon } from '@heroicons/react/20/solid';

type Props = {
  errors?: string[];
  title: string;
};

export const ErrorAlert: React.FC<Props> = ({ errors = [], title }) => {
  return (
    <div className="rounded-md bg-red-50 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc space-y-1 pl-5">
              {errors.map((error: string, idx: number) => (
                <li key={error + idx}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
