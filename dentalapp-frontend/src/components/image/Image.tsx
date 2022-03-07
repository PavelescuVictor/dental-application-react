import { memo } from 'react';
import styled from 'styled-components';

interface ImageProps {
  imageUrl?: string;
  alt: string;
  className?: string;
  focusKey?: string | null;
  loading?: 'lazy' | 'eager';
}

const StyledImage = styled.img<ImageProps>``;

const Image = memo(({ imageUrl, className, alt, focusKey, loading }: ImageProps) => (
  <StyledImage
    src={imageUrl}
    alt={alt}
    className={className}
    focusKey={focusKey}
    loading={loading}
  />
));

Image.displayName = 'Image';

export default Image;
