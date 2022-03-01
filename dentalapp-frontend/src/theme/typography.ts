import { Item } from './types';

interface TypographyProps {
  font: Item<string>;
  lineHeight: Item<string | number>;
  weight: Item<number>;
}

const typography: TypographyProps = {
  font: {
    primary: "'Fjalla One', sans-serif",
    secondary: "'Fredoka One', cursive",
  },
  lineHeight: {
    base: '16px',
    default: 1.17,
    paragraph: '24px',
    headlineXS: '25px',
    headlineS: '29px',
    headlineM: '34px',
    headlineXXXL: '41px',
    text: '30px',
    header: '40px;',
  },
  weight: {
    thin: 300,
    normal: 400,
    thick: 500,
    semiBold: 600,
    bold: 700,
    xBold: 800,
    strong: 900,
  },
};

export default typography;
