import React from 'react';
import classnames from 'classnames';
import { isWhite } from './utils';
import './examples.less';

export const colorExample = (color: string) => {
  const style = {
    backgroundColor: color,
  };
  const clsPrefix = 'gio-color-example';
  const clsString = classnames(clsPrefix, {
    [`${clsPrefix}--white`]: isWhite(color),
  });
  return <div className={clsString} style={style} />;
};

export const borderColorExample = (color: string) => {
  const style = {
    border: `2px solid ${color}`,
  };
  const clsPrefix = 'gio-border-color-example';
  const clsString = classnames(clsPrefix, {
    [`${clsPrefix}--white`]: isWhite(color),
  });
  return <div className={clsString} style={style} />;
};

export const textColorExample = (color: string) => {
  const style = {
    color,
  };
  const clsPrefix = 'gio-text-color-example';
  const clsString = classnames(clsPrefix, {
    [`${clsPrefix}--white`]: isWhite(color),
  });
  return (
    <span className={clsString} style={style}>
      Aa
    </span>
  );
};

export const shadowExample = (shadow: string) => {
  const style = {
    boxShadow: shadow,
  };
  const clsPrefix = 'gio-shadow-example';
  return <div className={clsPrefix} style={style} />;
};

export const fontSizeExample = (size: string) => {
  const style = {
    fontSize: size,
  };
  const clsPrefix = 'gio-font-size-example';
  return (
    <span className={clsPrefix} style={style}>
      Aa
    </span>
  );
};

export const spacingSizeExample = (size: string) => {
  const style = {
    width: size,
    height: size,
  };
  const clsPrefix = 'gio-spacing-size-example';
  return <div className={clsPrefix} style={style} />;
};

export const borderRadiusExample = (radius: string) => {
  const style = {
    borderRadius: radius,
  };
  const clsPrefix = 'gio-border-radius-example';
  return <div className={clsPrefix} style={style} />;
};

export const fontWeightExample = (weight: number) => {
  const style = {
    fontWeight: weight,
  };
  const clsPrefix = 'gio-font-weight-example';
  return (
    <span className={clsPrefix} style={style}>
      Aa
    </span>
  );
};

export const fontFamilyExample = (family: string) => {
  const style = {
    fontFamily: family,
  };
  const clsPrefix = 'gio-font-family-example';
  return (
    <span className={clsPrefix} style={style}>
      Aa
    </span>
  );
};
