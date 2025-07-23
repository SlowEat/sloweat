// src/App.js
import './styles/global.css';
import AppRouter from './routes/AppRouter';
import AuthRouter from './routes/AuthRouter'; // 로그인 상태가 아닐 때만 보여줄 라우트


function App() {

    const token = localStorage.getItem('accessToken');
    
   return token ? <AppRouter /> : <AuthRouter />;
}

export default App;
