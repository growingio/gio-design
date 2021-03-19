const sleep = (timer = 0) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });

export default sleep;
