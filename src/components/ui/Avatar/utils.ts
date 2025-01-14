export function getInitials(firstName: string = '', lastName: string = ''): string {
  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);
  return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
}