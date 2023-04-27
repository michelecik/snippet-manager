import './App.scss';
import { useRoutes } from 'react-router-dom'
import AllSnippets from './views/AllSnippets';
import Login from './views/Login';
import Register from './views/Register';
import Header from './components/Header'
import UserProfile from './views/UserProfile';

function App() {

  let router = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/', element: <AllSnippets /> },
    { path: '/profile', element: <UserProfile /> }
  ])

  return (
    <div>
      <Header />
      {router}
    </div>
  );
}

export default App;
