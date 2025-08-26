process.stdin.setEncoding('utf-8');

const funcs = {
  add({ a, b }) {
    return a + b;
  },
};

process.stdin.on('data', (chunk) => {
  const req = JSON.parse(chunk);
  const func = req.method;
  const params = req.params;
  const result = funcs[func](params);
  const res = {
    jsonrpc: '2.0',
    result,
    id: req.id,
  };
  process.stdout.write(JSON.stringify(res));
});
