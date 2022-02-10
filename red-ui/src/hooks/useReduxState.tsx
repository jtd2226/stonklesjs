import * as Redux from 'redux';
import React from 'react';

function useReduxState(store) {
  const [state, setState] = React.useState(store.getState());
  React.useEffect(() => {
    const stop = store.subscribe(() => setState({ ...store.getState() }));
    return () => {
      stop();
    };
  }, []);

  const dispatch = state => store.dispatch({ type: 'SET', state });

  return [state, dispatch];
}

type StateAction = {
  state: any;
};

function Store(defaults) {
  const store = Redux.createStore(
    (_, action: Redux.Action<StateAction>) => action.type.state || defaults
  );

  return () => useReduxState(store);
}

export default Store;
