import Guide from 'docs/layout';
module.exports = Guide();
const { title, step, code, layout, imports } = module.exports;

title`Example`;

layout`
title title 
step1 step2
code1 code1
`;

step`
Here's how to use state in React!
`;

step`
Step 2?
`;

code`
function Example() {
  const [state, setState] = React.useState('state')
  return <div>{state}</div>
}
`;

imports.React({
  path: 'react',
  import: import('react'),
});
