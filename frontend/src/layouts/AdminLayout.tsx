import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="px-4 py-4 border-b">
          <div className="text-lg font-semibold text-primary">Flipr Admin</div>
          <p className="text-xs text-gray-500 mt-1">Manage projects, clients & subscribers</p>
        </div>
        <nav className="flex-1 py-4 space-y-1">
          <NavLink
            to="projects"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="clients"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            Clients
          </NavLink>
          <NavLink
            to="newsletter"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            Newsletter
          </NavLink>
        </nav>
        <div className="px-4 py-4 border-t">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <h1 className="text-base md:text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <div className="admin-main-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
