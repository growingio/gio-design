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

const withWrapper = (Story) => (
  <div className="components-demo-wrapper">
    <Story />
  </div>
);

export const decorators = [withDesign, withDesignProvider, withWrapper];

export const parameters = {
  options: {
    storySort: (a, b) => {
      //默认 story 排在最前面
      if (a[1].kind === b[1].kind) {
        return b[1].name.toLowerCase() == 'default' || b[1].name.toLowerCase() == 'basic' ? 1 : 0;
      }
      return a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
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
