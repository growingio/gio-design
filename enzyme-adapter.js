try {
  const { JSDOM } = require('jsdom');

  const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: "https://growingio.design/",
  });
  const { window } = jsdom;

  function copyProps(src, target) {
    Object.defineProperties(target, {
      ...Object.getOwnPropertyDescriptors(src),
      ...Object.getOwnPropertyDescriptors(target),
    });
  }

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
  global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
  };
  global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
  copyProps(window, global);

  const Enzyme = require('enzyme');
  const Adapter = require('enzyme-adapter-react-16');
  Enzyme.configure({ adapter: new Adapter() });
} catch (error) {
  console.log(error);
}
