import { create } from '@storybook/theming/create';
import { getPreferredColorScheme } from '@storybook/theming/dist/esm/utils';

const baseTheme = {
  fontBase: '"PingFang SC", sans-serif',
  brandTitle: 'GrowingIO Design',
  brandUrl: 'https://www.growingio.com',
};

const darkTheme = create({
  base: 'dark',
  ...baseTheme,
  brandImage: '/logo-dark.svg',
});

const lightTheme = create({
  base: 'light',
  ...baseTheme,
  brandImage: '/logo-light.svg',
});

const theme = getPreferredColorScheme() === 'dark' ? darkTheme : lightTheme;

export default theme;
