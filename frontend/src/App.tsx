import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/login';
import Register from './pages/register';
import Dashbord from './pages/dashbord';
import Relatorios from './pages/relatorios';
import Entradas from './pages/entradas';
import Saidas from './pages/saidas';
import { Navigate } from 'react-router-dom';


function App() {
  const navigateTo = (path: string) => {
    return <Navigate to={path} />;
  };
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={navigateTo("/login")} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/saidas" element={<Saidas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;