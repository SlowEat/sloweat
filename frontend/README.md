# 프로젝트 구조 안내

---

## 1. 디렉토리 구조
```bash
src/
├── api/ # 백엔드 API 호출 함수 모음
├── components/ # 재사용 가능한 UI 컴포넌트
├── layouts/ # 공통 레이아웃 컴포넌트 (sidebar, navigation 등)
├── pages/ # 라우트별 페이지 컴포넌트 (특정 화면의 골격이 되는 컴포넌트 : 프로필, 게시글 상세 페이지 등)
├── routes/ # React Router 설정 파일
├── styles/ # 전역 스타일 및 CSS 모듈
├── utils/ # 유틸리티 함수 모음
├── App.js
└── index.js
```
## 2. 디렉토리별 파일 예시 
### compnents/Button.jsx
```jsx
const Button = ({ onClick, children }) => (
<button onClick={onClick}>{children}</button>
);

export default Button;
```

### layouts/MainLayout.jsx
```jsx
const MainLayout = ({ children }) => (
  <div className="layout">
    <aside>Sidebar</aside>
    <main>{children}</main>
    <aside>Right Panel</aside>
  </div>
);

export default MainLayout;
```
### pages/Home.jsx
```jsx
import MainLayout from '../layouts/MainLayout';

const Home = () => (
<MainLayout>
<h1>Home Page</h1>
</MainLayout>
);

export default Home;
```
### routes/AppRouter.jsx
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRouter = () => (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
</Routes>
</BrowserRouter>
);

export default AppRouter;
```
### styles/global.css
```css
body {
margin: 0;
font-family: Arial, sans-serif;
}
```
### utils/dateFormatter.js
```js
export const formatDate = (date) => {
return new Date(date).toLocaleDateString();
};
```
### App.js
```jsx
import AppRouter from './routes/AppRouter';

function App() {
return <AppRouter />;
}

export default App;
```
### index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```