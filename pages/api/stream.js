import { stream } from 'network/middleware';

// await sleep(2000)
function sleep(wait) {
  return new Promise(resolve => setTimeout(resolve, wait));
}

export async function handler(req, write, error) {
  function log(message) {
    console.log(message);
    write({ message });
  }
  const data = {
    time: 0,
    value: 0,
  };
  while (true) {
    const { time, value } = data;
    data.last = { time, value };
    const sign = Math.random();
    const offset = Math.random();
    const flip = sign > 0.5 ? 1 : -1;
    data.value += offset * flip;
    data.time += 1;
    write(data);
    await sleep(1000);
  }
}

export default stream(handler);
