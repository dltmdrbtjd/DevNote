## React에서 Style 전역으로 관리
- styled-component 내에 createGlobalStyle이라는 기능을 사용하고 styled-reset의 reset을 사용해서 reset css와 전역 css를 함꼐 사용할 수 있다.
- styled-component 내에 ThemeProvider를 사용하면 약속해둔 style을 변수로 지정해서 사용할 수 있다. 즉 디자인 상에서 전해진 요소들을 theme.js에 정리해두고 ThemeProvider 안에 넣어서 내보내면 편리하게 전역적으로 스타일을 사용할 수 있다.

## createGlobalStyle + reset 예시
```javascript
// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.bgColor};
    color: ${({ theme }) => theme.color.black};
    line-height: 1.5;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }

  button, input {
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
  }
  menu, ol, ul {
    list-style: none;
  }
`;

export default GlobalStyle;
```

## ThemeProvider까지 활용한 전역 스타일 관리 예시
```javascript
// GlobalThemeProvider.jsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import GlobalStyle from './GlobalStyle';

const GlobalThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default GlobalThemeProvider;

// theme.js

const calRem = size => `${size / 16}rem`;

const fontSize = {
  status: calRem(8),
  xs: calRem(12),
  sm: calRem(14),
  md: calRem(16),
  lg: calRem(18),
  la: calRem(20),
  sxl: calRem(24),
  xl: calRem(26),
  xxl: calRem(28),
  tab: calRem(36),
};

const fontWeight = {
  black: 900,
  extraBold: 800,
  bold: 700,
  semiBold: 600,
  regular: 400,
  light: 300,
};

const color = {
  brandColor: '#FF9900',
  skyblue: '#D4F0FF',
  bgColor: '#F8F8F8',
  semiLightG: '#E7E7E7',
  gray: '#C4C4C4',
  darkG: '#686868',
  black: '#2C2C2C',
  white: '#FDFDFD',
  danger: '#FF0005',
  safe: '#00C314',
};

const deviceSize = {
  smallMobile: '(max-width: 395px)',
  tab: '(min-width: 600px)',
};

const theme = {
  fontSize,
  fontWeight,
  color,
  deviceSize,
};

export default theme;
```
