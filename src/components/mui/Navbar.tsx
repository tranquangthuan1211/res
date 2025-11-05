import { AppBar, Toolbar, Typography, Button, Badge, Box, IconButton } from '@mui/material';
import { ShoppingCart, Person, Restaurant as RestaurantIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/use-auth';
const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky" color="default" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none',
            '&:hover': { opacity: 0.8 },
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, hsl(24, 100%, 50%), hsl(14, 100%, 57%))',
              p: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RestaurantIcon sx={{ color: 'white' }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(to right, hsl(24, 100%, 50%), hsl(14, 100%, 57%))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ReactFood
          </Typography>
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            variant={isActive('/') ? 'contained' : 'text'}
            sx={{ fontWeight: 600 }}
          >
            Trang chủ
          </Button>
          <Button
            component={Link}
            to="/menu"
            variant={isActive('/menu') ? 'contained' : 'text'}
            sx={{ fontWeight: 600 }}
          >
            Menu
          </Button>
          {user ? (
            <>
              <IconButton
                component={Link}
                to="/cart"
                color={isActive('/cart') ? 'primary' : 'default'}
              >
                <Badge badgeContent={totalItems} color="success">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton component={Link} to="/login">
                <Person />
              </IconButton>
            </>
          ) : (
            <IconButton component={Link} to="/login">
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Đăng nhập
              </Typography>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
