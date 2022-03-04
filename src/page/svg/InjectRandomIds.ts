import { filter, uniqueId } from 'lodash';
import React, { ComponentType, RefAttributes, useLayoutEffect, useRef } from 'react';

/**
 * 解决 SVG 组件 ID 重复问题的高阶组件
 * @param Component 需要传入的 SVG 组件
 * @returns 注入随机 ID 后的 SVG 组件
 */
export default function InjectRandomIds<P>(
  Component: ComponentType<P>
): ComponentType<P & RefAttributes<SVGSVGElement>> {
  return function WrapperComponent(props) {
    const componentRef = useRef<SVGSVGElement>();
    useLayoutEffect(() => {
      if (!componentRef.current) return;
      const elementsWithId = componentRef.current.querySelectorAll('svg [id]');
      const elementsWithFill = componentRef.current.querySelectorAll('svg [fill^=url\\(\\#]');
      elementsWithId.forEach((element) => {
        const id = element.getAttribute('id');
        const elementsWithFillSameId = filter(elementsWithFill, (item) => item.getAttribute('fill') === `url(#${id})`);
        elementsWithFillSameId.forEach((node) => {
          if (node) {
            const newId = `${id}__${uniqueId()}`;
            element.setAttribute('id', newId);
            node.setAttribute('fill', `url(#${newId})`);
          }
        });
      });
    }, []);
    return React.createElement(Component, { ...props, ref: componentRef });
  };
}
