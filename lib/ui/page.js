import styled from 'ui';

export const Page = styled.div(
  ({ padding = '16px' }) => `
    padding: ${padding} ${padding} 0 ${padding};
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  `
);
