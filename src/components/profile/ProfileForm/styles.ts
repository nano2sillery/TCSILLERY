export function getFormColors(gender: 'M' | 'F') {
  const colors = {
    M: {
      primary: '[#2b69d8]',
      light: '[#e6edfb]'
    },
    F: {
      primary: '[#da2084]',
      light: '[#fce7f1]'
    }
  }[gender];

  return {
    text: `text-${colors.primary}`,
    ring: `focus:ring-${colors.primary}`,
    bg: `bg-${colors.primary}`,
    bgLight: `bg-${colors.light}`,
    border: `border-${colors.primary}`,
    hover: `hover:bg-${colors.light}`
  };
}