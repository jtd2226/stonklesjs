function Builder(store = {}) {
  return new Proxy(store, {
    get(target, key) {
      if (target[key]) return target[key];
      return props => {
        target[key] = props;
        return Builder(store);
      };
    },
  });
}

export default function Guide(guide = {}) {
  guide.steps ??= [];
  guide.codeblocks ??= [];
  guide.layout ??= ([areas]) => {
    guide.layout = areas;
    return Guide(guide);
  };
  guide.title ??= ([msg]) => {
    guide.title = msg;
    return Guide(guide);
  };
  guide.step = ([msg]) => {
    guide.steps.push(msg);
    return Guide(guide);
  };
  guide.code = ([msg]) => {
    guide.codeblocks.push({ code: msg });
    return Guide(guide);
  };
  guide.copy = ([msg]) => {
    guide.codeblocks.push({ code: msg, noPreview: true });
    return Guide(guide);
  };
  guide.imports ??= Builder();
  return guide;
}
