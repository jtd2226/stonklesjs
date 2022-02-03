export const stream = handler => (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.flushHeaders();

  function write(data, event = 'message') {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.flush();
  }

  function error(error) {
    write({ error }, 'error');
  }

  try {
    handler(req, write, error);
  } catch (e) {
    error(e);
  }
};
