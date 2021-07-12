import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default } from '../Breadcrumb.stories';
import  Breadcrumb ,{ BreadcrumbItem } from '../index';

describe('Breadcrumb', () => {
    
    it('render with default', () => {
        const handleOnClick = jest.fn();
        render(<Default {...Default.args} onClick={handleOnClick}/>);
        expect(screen.getByText('三级面包屑')).toBeTruthy();
    })

    it('render', () => {
        render(
            <Breadcrumb>
                <BreadcrumbItem>{false}</BreadcrumbItem>
                <BreadcrumbItem>456</BreadcrumbItem>
            </Breadcrumb>
        )
        expect(screen.getByText('456')).toBeTruthy();
    })

    it('should render routes with param', () => {
        const routes = [
            {
                path:'index',
                breadcrumbName:''
            }
        ];
        render(<Breadcrumb routes={routes}/>);  
        expect(screen).toBeTruthy();
    })

    it('should support React.Fragment and falsy children', () => {
        const wrapper = render(
            <Breadcrumb>
                {0}
                {null}
                {undefined}
            </Breadcrumb>
        );
        expect(wrapper).toBeTruthy();
      });

      it('should render routes with param', () => {
        const routes = [
            {
                path: 'components',
                breadcrumbName: '首页',
              },
              {
                path: 'basic',
                breadcrumbName: '一级面:包屑',
              },
              {
                path: 'breadcrumb',
                breadcrumbName: '二级面包屑',
              },
        ];
        render(<Breadcrumb routes={routes} params={{ 面: '背', 包: '条' }}/>);  
        expect(screen).toBeTruthy();
    })
});