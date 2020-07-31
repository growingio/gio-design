/**
 * Template for React SVG
 *
 * Converts the given SVG into a TypeScript-compatible React component
 */
function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  return typeScriptTpl.ast`
  import React from 'react';

  type SvgIconProps = {
  } & React.SVGProps<SVGSVGElement>;

  const ${componentName} = (props: SvgIconProps): JSX.Element => (
    ${jsx}
  );

  ${exports}
  `;
}

module.exports = template;
