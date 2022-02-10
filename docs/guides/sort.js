import Guide from 'docs/layout';
module.exports = Guide();
const { title, step, code, copy, layout, imports } = module.exports;

title`useSort`;

layout`
title
step1
step2
step3
step4
code1
`;

step`The useSort hook is used to simplify sorting data`;

step`useSort takes in an array to sort, a name(optional), a type(optional, defaults to string), and the sort order (ascending, descending)`;

step`It will return the sorted array, as well as some helper functions for updating the sorted array`;

step`The types available for sorting are maintained in @hooks/useSort.js`;

code`
function Component() {
  const { sorted, toggle } = useSort({
    value: [
      { type: 'pear', brand: 'blue', lastModified: '2021-07-21' },
      { type: 'apple', brand: 'fugi', lastModified: '2021-07-22' },
      { type: 'grape', brand: 'H-E-B', lastModified: '2021-07-23' },
    ],
    name: 'lastModified',
    type: 'Date',
    order: 'ascending',
  });

  const { Iterator } = useArray(sorted);
  return (
    <ul>
      Click to toggle ascending/descending!
      <Iterator>
        {({ value: { type, brand, lastModified } }) => (
          <li>
            <span onClick={() => toggle({ name: 'type' })}>
              type: {type}
            </span>
            ,
            <span onClick={() => toggle({ name: 'brand' })}>
              brand: {brand}
            </span>
            ,
            <span
              onClick={() => toggle({ name: 'lastModified', type: 'Date' })}
            >
              Last Modified: {lastModified}
            </span>
          </li>
        )}
      </Iterator>
    </ul>
  );
}
`;

imports
  .useSort({
    path: 'lib/hooks/useSort',
    import: import('lib/hooks/useSort'),
  })
  .useArray({
    path: 'lib/hooks/useArray',
    import: import('lib/hooks/useArray'),
  });
