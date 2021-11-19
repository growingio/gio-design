import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { DesignContext, DefaultContextProps } from '@gio-design/utils';
import { DocsContainer } from '@storybook/addon-docs';
import { IntlProvider } from 'react-intl';
import enUS from '../src/locales/en-US';
import enMessages from './locales/en.json';
import './index.less';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'zh-CN',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-US', right: '🇺🇸', title: 'English' },
        { value: 'zh-CN', right: '🇨🇳', title: '简体中文' },
      ],
    },
  },
};

const withDesignProvider = (Story, context) => {
  const {
    globals: { locale },
  } = context;
  return (
    <DesignContext.Provider value={{ ...DefaultContextProps, locale: locale === 'en-US' ? enUS : undefined }}>
      <Story {...context} />
    </DesignContext.Provider>
  );
};
export const decorators = [withDesign, withDesignProvider];

export const parameters = {
  controls: {
    expanded: true,
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  docs: {
    container: ({ children, context }) => {
      const {
        globals: { locale },
      } = context;

      return (
        <DocsContainer context={context}>
          <IntlProvider
            locale={locale}
            messages={locale === 'en-US' ? enMessages : undefined}
            onError={(err) => {
              if (err.code !== 'MISSING_TRANSLATION') {
                throw err;
              }
            }}
          >
            {children}
          </IntlProvider>
        </DocsContainer>
      );
    },
  },
};
