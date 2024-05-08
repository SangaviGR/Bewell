import { CssBaseline } from '@mui/material';
import PatientEnrollmentForm from './pages/FormPage';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
        <Route path="/form" element={<PatientEnrollmentForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
