import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import ThemesDemo from './ThemesDemo';
import './style.less'

const Index = () => (
  <Router>
    <Fragment>
      <div className='notification'></div>
      <div className='header'>
        <nav>
          <ul>
            <li><Link to='/'>Playground</Link></li>
          </ul>
        </nav>
      </div>
      <div className='app container'>
        <div className='sider'>
          <Link to='/themes'>Themes Demo</Link>
        </div>
        <div className='content'>
          <Route exact path="/" component={App} />
          <Route path="/themes" component={ThemesDemo} />
        </div>
      </div>
    </Fragment>
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));