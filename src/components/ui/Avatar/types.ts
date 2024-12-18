export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Gender = 'M' | 'F';

export interface AvatarProps {
  firstName?: string;
  lastName?: string;
  gender: Gender;
  size?: AvatarSize;
  className?: string;
  showBorder?: boolean;
}

export interface AvatarStyleProps {
  size: AvatarSize;
  gender: Gender;
  showBorder: boolean;
  className?: string;
}