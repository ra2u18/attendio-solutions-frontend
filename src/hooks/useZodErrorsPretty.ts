import { useMemo } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

export const useZodErrorsPretty = (errors: FieldErrors<FieldValues>): string[] => {
  const errorMessages = useMemo(() => {
    return Object.entries(errors)
      .filter(([_, error]) => Boolean(error))
      .map(([key, error]) => `${key}: ${error?.message}`);
  }, [errors]);

  return errorMessages as string[];
};
