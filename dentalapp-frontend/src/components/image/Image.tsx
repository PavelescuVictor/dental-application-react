import { memo } from 'react';
import StyledImage from './Image.style';

interface ImageProps {
  imageUrl?: string;
  alt: string;
  className?: string;
  focusKey?: string | null;
  loading?: 'lazy' | 'eager';
}

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
