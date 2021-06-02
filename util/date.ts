///////////////////
//// "Date" type //
///////////////////

//// Can be convert from a Date type into a string type (more human-friendly) :
export const dateToString = (date: Date): string => {
  return date.toDateString();
};

//// Can be convert from a string type back into a Date type :
export const stringDateToDate = (date: string): Date => {
  return new Date(date);
};
