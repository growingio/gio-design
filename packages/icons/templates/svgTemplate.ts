function template({ template }, opts, { imports, componentName, jsx, exports }) {
  const plugins = ['jsx'];
  if (opts.typescript) {
    plugins.push('typescript');
  }
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`${imports}
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function ${componentName}(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    ${jsx}
  );
  return (
    <Wrapper {...restProps} icon={file} />
  );
}
${exports}
  `;
}

module.exports = template;
