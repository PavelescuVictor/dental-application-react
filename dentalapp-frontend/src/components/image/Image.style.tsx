import styled from 'styled-components';

interface StyledImageProps {
  imageUrl?: string;
  alt: string;
  className?: string;
  focusKey?: string | null;
  loading?: 'lazy' | 'eager';
}

const StyledImage = styled.img<StyledImageProps>``;

StyledImage.displayName = 'StyledImage';

export default StyledImage;
