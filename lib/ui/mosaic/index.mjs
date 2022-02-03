import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  cloneElement,
  useMemo,
} from 'react';
import useMeasure from 'hooks/useMeasure';
import Iteration from 'util/iteration';

const Context = createContext({ items: {} });

function isDOMElement(element) {
  return isValidElement(element) && typeof element.type === 'string';
}

const Grid = styled.div(
  ({ columns, gap }) => css`
    display: grid;
    gap: ${gap};
    align-items: self-start;
    grid-auto-flow: dense;
    grid-template-columns: repeat(${columns}, 1fr);
  `
);

function useMosaic() {
  const { ref, bounds } = useMeasure();
  const rowSpan = useMemo(() => {
    if (!ref.current) return;
    const element = ref.current;
    const grid = element.parentElement;
    const style = getComputedStyle(grid);
    const rowGap = parseInt(style.gridRowGap);
    const height = bounds.height;
    const rowSpan = Math.ceil((height + rowGap) / (10 + rowGap));
    return rowSpan;
  }, [ref, bounds.height]);
  return { ref, rowSpan };
}

const Area = styled.div(
  ({ column, rowSpan }) => css`
    order: ${column.row};
    grid-row-end: span ${rowSpan};
    grid-column: ${column.start} / span ${column.span};
  `
);

const defaultItem = { start: 1, span: 1, row: Number.MAX_SAFE_INTEGER };
function Cell({ name, children }) {
  const { items } = useContext(Context);
  const { ref, rowSpan } = useMosaic();
  const child = Children.toArray(children)[0];
  const column = items?.[name] ?? defaultItem;
  if (isDOMElement(child)) {
    return cloneElement(child, {
      ...child.props,
      ref,
      style: {
        ...(child.props.style ?? {}),
        order: column.row,
        gridRowEnd: `span ${rowSpan}`,
        gridColumn: `${column.start} / span ${column.span}`,
      },
    });
  } else {
    return (
      <Area ref={ref} column={column} rowSpan={rowSpan}>
        {child}
      </Area>
    );
  }
}

Cell.propTypes = {
  items: PropTypes.object,
  children: PropTypes.node,
};

const useCells = areas =>
  useMemo(
    () =>
      areas
        .trim()
        .split('\n')
        .reduce(
          (cells, row, rowIndex) => {
            const columns = row.split(' ').filter(x => !!x);
            if (!columns.length) return cells;
            cells.columns ??= columns.length;
            cells.items = columns.reduce((items, name, index) => {
              if (name === '.') return items;
              items[name] ??= {
                row: rowIndex,
                start: index + 1,
                span: 0,
              };
              items[name].span += 1;
              return items;
            }, cells.items);
            return cells;
          },
          { items: {} }
        ),
    [areas]
  );

function Iterator({ children }) {
  const cells = useContext(Context);
  return (
    <Iteration values={Object.keys(cells.items)}>
      {({ value: name }) => (
        <Cell name={name}>
          {Children.map(children, child => cloneElement(child, { name }))}
        </Cell>
      )}
    </Iteration>
  );
}

export function Mosaic({ areas = '', gap = '16px', children, ...rest }) {
  const cells = useCells(areas);
  return (
    <Context.Provider value={cells}>
      <Grid columns={cells.columns} gap={gap} {...rest}>
        {Children.map(children, child =>
          child.props.name && child.type !== Cell ? (
            <Cell name={child.props?.name}>{child}</Cell>
          ) : (
            child
          )
        )}
      </Grid>
    </Context.Provider>
  );
}

Mosaic.propTypes = {
  areas: PropTypes.string,
  children: PropTypes.node,
  gap: PropTypes.string,
};

Mosaic.template =
  ([areas]) =>
  props =>
    <Mosaic {...props} areas={areas} />;
Mosaic.useContext = () => useContext(Context);
Mosaic.Iterator = Iterator;
Mosaic.Cell = Cell;

export default Mosaic;
