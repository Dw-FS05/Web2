import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';
import { useUIStore } from './store/uiStore';

function App() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: isDarkMode ? 'bg-slate-800 text-white' : '',
        }}
      />
      <AppRouter />
    </>
  );
}

export default App;