import { RouterProvider } from 'react-router-dom';
// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { AuthContextProvider } from 'contexts/AuthContext';
import { SnackbarProvider } from 'notistack';

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeCustomization>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </SnackbarProvider>
      </ThemeCustomization>
    </AuthContextProvider>
  );
}
