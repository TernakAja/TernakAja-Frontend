export function getLivestockAge(
  birthDateInput: string | number | Date
): number | null {
  const birthDate = new Date(birthDateInput);

  if (isNaN(birthDate.getTime())) {
    return null;
  }

  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    years--;
  }

  return years;
}

export function getTimeSince(dateInput: string | number | Date): string {
  const fromDate = new Date(dateInput);

  return fromDate.toLocaleString();
}

export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}
