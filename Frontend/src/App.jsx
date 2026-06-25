import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Recognize from './pages/Recognize';
import Register from './pages/Register';
import Participants from './pages/Participants';
import Logs from './pages/Logs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Recognize />} />
          <Route path="register" element={<Register />} />
          <Route path="participants" element={<Participants />} />
          <Route path="logs" element={<Logs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;