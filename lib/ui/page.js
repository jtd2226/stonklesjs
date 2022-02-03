import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Page = styled.div(
  ({ theme, padding = '16px' }) => css`
    padding: ${padding} ${padding} 0 ${padding};
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  `
);
