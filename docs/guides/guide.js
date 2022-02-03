import Guide from 'docs/layout';
module.exports = Guide();
const { title, step, code, copy, layout, imports } = module.exports;

title`Adding to the Style Guide`;

layout`
title title
step1 step1
step2 code1 
step3 code2
step4 code2
step5 code2
step6 code2
step7 code2
step8 step8
step9 step9
`;

step`
The files that compose this guide are located in the docs/guides directory.
To add a new section, create a new file in docs/guides like in the following example: 
`;

step`
The three statements at the top should be the same for every guide.
Using the template functions imported from docs/layout, you can add text and code snippets to your guide by adding them to the array.
`;

step`
"title" creates the section header and will show up as a link in the table of contents drawer.
`;

step`
"layout" determines how your guide shows up on the page. 
It uses a css-grid like syntax to allow you to specify how many rows and columns each element takes up.
`;

step`
"step" will add a bulleted text entry. You can add multiple steps, which are specified in the layout template with "step" followed by a number corresponding to the order they are placed in the file.
The first step you add will be "step1" in the layout, followed by "step2", etc.
`;

step`
"code" adds an editable code snippet. The code contained in the template string MUST be wrapped in a function. You can add multiple of these in the same manner as the step template.
If you don't want the code to be editable, use the "copy" template.
`;

step`
To add import statements to your editable code snippets, use the "imports" function like in the example.
`;

copy`
import Guide from 'docs/layout';
module.exports = Guide();
const { title, step, code, layout, imports } = module.exports;
`;

copy`
import Guide from 'docs/layout';
module.exports = Guide();
const { title, step, code, layout, imports } = module.exports;

title\`Example\`;

layout\`
title title 
step1 step2
code1 code1
\`;

step\`
Here's how to use state in React!
\`;

step\`
Step 2?
\`;

code\`
function Example() {
  const [state, setState] = React.useState('state')
  return <div>{state}</div>
}
\`;

imports
  .React({
    path: 'react',
    import: import('react'),
  })
  .Firebase({
    path: 'database/firebase/hooks',
    import: import('database/firebase/hooks'),
  });
`;

step`
After you have finished composing your Guide, add it to the default export of "docs/guides/index". The guide in the example code is shown below.
`;
