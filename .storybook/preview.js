import React from 'react';
import { DocsContainer } from '@storybook/addon-docs';
import { IntlProvider } from 'react-intl';
import enMessages from './locales/en.json';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'zh-CN',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'zh-CN', right: '🇨🇳', title: '简体中文' },
      ],
    },
  },
};

export const parameters = {
  controls: { expanded: true, hideNoControlsWarning: true },
  docs: {
    container: ({ children, context }) => {
      const { locale } = context.globals;
      return (
        <DocsContainer context={context}>
          <IntlProvider
            locale={locale}
            messages={locale === 'en' ? enMessages : undefined}
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
