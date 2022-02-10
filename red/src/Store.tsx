import * as Redux from 'redux';
import React from 'react';

type StateAction = {
  type: string;
  state: any;
};

function useReduxState(store: Redux.Store<any, StateAction>) {
  const [state, setState] = React.useState(store.getState());
  React.useEffect(() => {
    const stop = store.subscribe(() => setState({ ...store.getState() }));
    return () => {
      stop();
    };
  }, []);

  const dispatch = (state: any) => store.dispatch({ type: 'SET', state });

  return [state, dispatch];
}

export default function Store(defaults) {
  const store = Redux.createStore(
    (_, action: StateAction) => action.state || defaults
  );

  return () => useReduxState(store);
}
