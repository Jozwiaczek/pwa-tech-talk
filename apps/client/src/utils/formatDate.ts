export const formatDate = (
  date: Date | undefined | null,
  withTime?: boolean,
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!date) {
    return 'No date';
  }

  const internalDate = new Date(date);

  if (withTime) {
    return internalDate.toLocaleString('en-US');
  }

  return internalDate.toLocaleDateString('en-US', options);
};
