/**
 * Here you can define helper functions to use across your app.
 */
export const parseConsData = (data) => {
  const [num, time] = data.split(' ');

  if (time.includes('year')) {
    return num * 364;
  } else if (time.includes('month')) {
    return num * 30;
  } else if (time.includes('week')) {
    return num * 7;
  }

  return Number(num);
};

export const pasePassData = (data) => {
  return Number(data.replace(',', ''));
};
