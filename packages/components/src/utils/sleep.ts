const sleep = (timer = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });

export default sleep;
