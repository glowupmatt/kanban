export const inputChecker = (input: string): boolean => {
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  return regex.test(input);
};

export const isStringEmpty = (input: string): boolean => {
  return input === "";
};
