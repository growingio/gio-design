import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react' ;
import { FilterOutlined, PlusCircleFilled } from '@gio-design/icons';
import Button from '../index';

describe('Testing Card',() => {
    it('test button children', () => {
        render(
            <div>
                <Button>
                    按钮
                    {123}
                    {null}
                    <span>按钮</span>
                </Button>
            </div>
        )
        expect(screen).toBeTruthy();
    });

    it('click button', () => {
        const mockClick = jest.fn();
        render(
            <Button onClick={mockClick} loading={false}>  
                点击按钮
            </Button>
        )
        fireEvent.click(screen.getByRole('button'));
        expect(mockClick).toBeCalledTimes(1);
    });

    it('not click button', () => {
        const mockClick = jest.fn();
        render(
            <Button onClick={mockClick} loading>  
                点击按钮
            </Button>
        )
        fireEvent.click(screen.getByRole('button'));
        expect(mockClick).not.toBeCalled();
    });
    
    it('test two chars',() =>{
        const { rerender } = render(
            <Button htmlType="submit">
              <div>
                <PlusCircleFilled />
                提交
              </div>
            </Button>
          );
          rerender(<Button htmlType="submit">提交</Button>);
          expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('no text', () => {
        const wrapper = render(
            <div>
                <Button mini loading={false} icon={<FilterOutlined />}/>  
            </div>   
        )
        expect(wrapper).toBeTruthy();
    });

    it('test ref', () => {
        const changeMock = jest.fn();
        render(
            <Button ref={changeMock}>
                按钮
            </Button>
        );
        expect(changeMock).toBeCalled();
    })
});