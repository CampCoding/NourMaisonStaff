export const countWeekdays = (start: string, end: string): number => {
  let count = 0;
  const cursor = new Date(start);
  const endDate = new Date(end);
  while (cursor <= endDate) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
};

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
