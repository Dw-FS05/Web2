import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { logoutUser } from '../../services/authService';

export default function Layout() {
    const { user, clearUser } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useUIStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.success) {
            clearUser();
            navigate('/login');
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}>
            <nav className="bg-white dark:bg-slate-800 shadow-md border-b dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            Task Manager Pro
                        </span>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-yellow-400 hover:ring-2 hover:ring-blue-400 transition-all"
                                title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                            >
                                {isDarkMode ? '🌙' : '☀️'}
                            </button>

                            <div className="hidden sm:flex flex-col text-right mr-2">
                                <span className="text-sm font-medium dark:text-gray-100">
                                    {user?.displayName || 'Usuario'}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.email}
                                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="btn-secondary text-sm py-1.5 px-3"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}