import { ThemeContextType } from "../store/themeContext";

export type ThemeName = 'light' | 'dark';

export const theme: { [key in ThemeName]: ThemeContextType } = {
  light: {
    PRIMARY: '#BFE3CC',
    SECONDARY: '#BBDDE1',
    TERTIARY: '#030318',
    QUATERNARY: '#FAFAFA',
    BACKGROUND: '#FFFFFF',
    HINT: '#828282',
    LIGHT_HINT: '#EAEAEA',
    NEGATIVE: '#DB6363',
    POSITIVE: '#90D37A',
  },
  dark: {
    PRIMARY: '#2E5C6A',
    SECONDARY: '#9FB2C3',
    TERTIARY: '#FAFAFA',
    QUATERNARY: '#1C1C1C',
    BACKGROUND: '#0A2129',
    HINT: '#AFAFAF',
    LIGHT_HINT: '#13333F',
    NEGATIVE: '#FF5A5A',
    POSITIVE: '#5AD37A',
  },
};
