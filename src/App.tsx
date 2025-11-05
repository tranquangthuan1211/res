import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { muiTheme } from "./theme/muiTheme";
import Home from "./pages/mui/Home";
import Menu from "./pages/mui/Menu";
import FoodDetail from "./pages/mui/FoodDetail";
import Cart from "./pages/mui/Cart";
import Checkout from "./pages/mui/Checkout";
import Login from "./pages/mui/Login";
import NotFound from "./pages/NotFound";
import {AuthProvider} from './contexts/jwt-context';
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
          <Toaster richColors position="bottom-right" />
          <CssBaseline />
          <CartProvider>
            {/* <Sonner /> */}
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/menu/:id" element={<FoodDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </CartProvider>
      </ThemeProvider>
  </QueryClientProvider>
);

export default App;
