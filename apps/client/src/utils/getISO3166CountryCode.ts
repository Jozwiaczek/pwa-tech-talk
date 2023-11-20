export const getISO3166CountryCode = (language: string) => {
  const [languageCode, countryCode, regionCode] = language.toLowerCase().split('-');
  return regionCode || countryCode || languageCode;
};
