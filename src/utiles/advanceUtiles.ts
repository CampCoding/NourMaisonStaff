export const formatCurrency = (val: number) =>
  val.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const parseAmount = (str: string): number => {
  const n = parseFloat(str.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
};
