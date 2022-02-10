import Guide from 'docs/layout';
module.exports = Guide();
const { title, step, code, copy, layout, imports } = module.exports;

title`useFiltered`;

layout`
title
step1
step2
step3
code1
`;

step`The useFiltered hook is used to simplify filtering data`;

step`useFiltered takes in an array to filter, and an array of default filters (optional)`;

step`It will return the filtered array, as well as some helper functions for updating the filtered array`;

code`
function Component() {
  const values = [
      { type: 'pear', brand: 'fugi' },
      { type: 'apple', brand: 'fugi' },
      { type: 'apple', brand: 'H-E-B' },
      { type: 'grape', brand: 'H-E-B' },
  ]
  const defaultFilters = {
    brand: 'H-E-B'
  }
  const { filtered, toggle, clear, search } = useFiltered(
    values,
    defaultFilters
  );

  const { Iterator } = useArray(filtered);
  const { Iterator: Original } = useArray(values)
  return (
    <ul>
      <strong>
        Filtered Values
      </strong>
      <label onClick={clear}>
        Click here to clear filters
      </label>
      <label onClick={clear}>
        Click item below to filter
      </label>
      <Iterator>
        {({ value: { type, brand } }) => (
          <div>
            <span onClick={() => toggle('type', type)}>
              type: {type}
            </span>
            ,
            <span onClick={() => toggle('brand', brand)}>
              brand: {brand}
            </span>
          </div>
        )}
      </Iterator>
      <strong> 
        Search by type: 
        <input 
          onChange={e => search('type', e.currentTarget.value)} 
          onClick={clear}
        />
      </strong>
      <strong>Original Values</strong>
      <Original>
        {({ value: { type, brand } }) => (
          <div>
            <span>
              type: {type}
            </span>
            ,
            <span>
              brand: {brand}
            </span>
          </div>
        )}
      </Original>
    </ul>
  );
}
`;

imports
  .useFiltered({
    path: 'lib/hooks/useFiltered',
    import: import('lib/hooks/useFiltered'),
  })
  .useArray({
    path: 'lib/hooks/useArray',
    import: import('lib/hooks/useArray'),
  });
