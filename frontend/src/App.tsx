import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import AdminLayout from './layouts/AdminLayout'
import ProjectsPage from './pages/admin/ProjectsPage'
import ClientsPage from './pages/admin/ClientsPage'
import NewsletterPage from './pages/admin/NewsletterPage'
import ProtectedRoute from './routes/ProtectedRoute'
import './styles.css'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          )}
        >
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
