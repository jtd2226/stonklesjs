import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import Request from 'network/cache';
import React from 'react';

const currencies = Request.path('/api/stream').query({ type: 'noise' });
// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 30,
  latitude: 0,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

// DeckGL react component
export default function Page() {
  const { messages } = currencies.useStream();
  const plots = new LineLayer({
    id: 'plot',
    data: messages,
    getSourcePosition: d => [d.last.time, d.last.value],
    getTargetPosition: d => [d.time, d.value],
    getColor: d => [
      d.last.value > d.value ? 255 : 0,
      d.last.value < d.value ? 255 : 0,
      0,
    ],
    getWidth: d => 5,
    transitions: {
      getColor: {
        duration: 500,
        easing: x => {
          return 1 - Math.cos((x * 3.14) / 2);
        },
        enter: v => [v[0], v[1], v[2], 0],
      },
      getTargetPosition: {
        type: 'interpolation',
        duration: 300,
        easing: x => {
          return 1 - Math.cos((x * 3.14) / 2);
        },
        enter: value => {
          const [_, __, ...rest] = value;
          const msg = messages[messages.length - 1];
          return [msg?.last?.time ?? 0, msg?.last?.value ?? 0, ...rest];
        }, // fade in
      },
      // getSourcePosition: {
      //   type: 'interpolation',
      //   duration: 1000,
      //   easing: x => {
      //     return 1 - Math.cos((x * 3.14) / 2);
      //   },
      //   enter: value => {
      //     const msg = messages[messages.length - 1];
      //     return [
      //       msg?.time - messages.length ?? 0,
      //       msg?.last?.value ?? 0,
      //     ];
      //   }, // fade in
      // },
    },
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[plots]}
    />
  );
}
