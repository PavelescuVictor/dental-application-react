import { Item } from './types';

interface PaletteProps {
  primary: string;
  secondary: string;
  active: string;
  inactive: string;
  gray: Item<string>;
  validation: Item<string>;
  basic: Item<string>;
  hover: Item<string>;
  defaults: Item<string>;
}

const palette: PaletteProps = {
  primary: '#40cb9e',
  // secondary: '#4c84ff',
  secondary: '#5602ca',
  active: 'rgba(226,0,116,0.5)',
  inactive: 'rgba(0, 0, 0, 0.5);',
  gray: {
    // cool: '#9aa9b3',
    // alpha: '#4e5562',
    // alphaPlus: '#242730',
    // beta: '#1F202A',
    // bravo: '#a4a4a4',
    // charlie: '#D8D8D8',
    // cod: '#141414',
    // delta: '#F4F4F4',
    // echo: '#222222',
    // foxtrot: '#f1f1f1',
    // gama: '#979797',
    // hotel: '#1C1C1C',
    // metal: '#686868',
    // silver: '#a3a3a3',
    // darkSilver: '#4B4B4B',
    // coal: '#3e3d3d',
    // darkGrey: '#1a1a1a',
    // shadow: '#4c4c4c',
  },
  validation: {
    valid: '#40cb9e',
    // validLight: '#DEFCD9',
    warning: '#f9c108',
    // warningLight: '#FCFAD9',
    error: '#e63d3d',
    // errorLight: '#FCD9D9',
    // errorDark: '#d90000',
    // info: '#009de0',
    info: '#FFF',
  },
  basic: {
    black: '#000',
    white: '#FFF',
    // gray: '#8b8b8b',
    // blueBackground: '#e5f5fd',
    // blueSection: '#1063ad',
    // newBlue: '#216BFF',
    // green: '#218076',
    // darkBlue: '#1c1e27',
  },
  hover: {
    // navBackground: '#7a0943',
    // searchItemBackground: '#333333',
    // primaryHue: '#c70066',
    // mineShaft: '#272727',
    // primaryOnHover: '#bd0061',
    // lightGrey: '#bdbdbd',
  },
  defaults: {
    // grey: '#6c6c6c',
    // lightCharcoal: '#595959',
    // charcoal: '#a8a8a8',
    // burgundyPrimary: '#94004c',
    // burgundy: '#70003a',
    // darkPrimary: '#470025',
    // darkGrey: '#454545',
  },
};

export default palette;
