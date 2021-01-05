import React from 'react';
import ReactDOM from 'react-dom';
import VercelLogo from './vercel';
import StorybookLogo from './storybook';
import './index.css';

function Footer() {
  return (
    <footer className="gio-footer">
      <section className="gio-footer-columns">
        <div className="gio-footer-column">
          <h4 className="gio-footer-column__title">GrowingIO Design</h4>
          <span>Copyright © 2020 GrowingIO. All rights reserved.</span>
        </div>
        <div className="gio-footer-column">
          <h4 className="gio-footer-column__title">Powered by</h4>
          <a href="https://vercel.com?utm_source=gio-design&utm_campaign=oss" className="gio-footer-logo">
            <VercelLogo />
          </a>
        </div>
        <div className="gio-footer-column">
          <h4 className="gio-footer-column__title">Documenting by</h4>
          <a href="https://storybook.js.org" className="gio-footer-logo">
            <StorybookLogo />
          </a>
        </div>
      </section>
    </footer>
  );
}

const node = document.createElement('div');
ReactDOM.render(<Footer />, node);
document.body.insertAdjacentElement('beforeend', node);
