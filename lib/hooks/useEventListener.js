import * as React from 'react';

const clientWindow = typeof window !== 'undefined' ? window : undefined;

export default function useEventListener(
  eventName,
  handler,
  element = clientWindow,
  capture = false
) {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;

    if (!isSupported) {
      return;
    }

    const eventListener = event => savedHandler.current(event);

    element.addEventListener(eventName, eventListener, capture);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, capture]);
}
