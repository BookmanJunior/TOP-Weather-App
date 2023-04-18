const PubSub = () => {
  let events = [];

  const sub = (evName, fn) => {
    events[evName] ??= [];
    events[evName].push(fn);
  };

  const unsub = (evName, fn) => {
    events = events[evName].filter((f) => f !== fn);
  };

  const publish = (evName, data) => {
    if (events[evName]) {
      events[evName].forEach((fn) => {
        fn(data);
      });
    }
  };

  return {
    sub,
    unsub,
    publish,
  };
};

const pubsub = PubSub();

export default pubsub;
