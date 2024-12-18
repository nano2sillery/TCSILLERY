export function getHeaderColors(gender: 'M' | 'F') {
  return {
    bg: gender === 'M' ? 'bg-[#2b69d8]' : 'bg-[#da2084]',
    text: 'text-white',
    textMuted: 'text-white/70',
    ring: 'ring-white/30'
  };
}