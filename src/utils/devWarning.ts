import devWarning from 'rc-util/lib/warning';

export default (valid: boolean, component: string, message: string): void => {
  devWarning(valid, `[gio: ${component}] ${message}`);
};
