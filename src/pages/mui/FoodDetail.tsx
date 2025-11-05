import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Chip, Paper } from '@mui/material';
import { ArrowBack, ShoppingCart, Check } from '@mui/icons-material';
import Navbar from '@/components/mui/Navbar';
import { foods } from '@/data/foods';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const FoodDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const food = foods.find(f => f.id === Number(id));

  if (!food) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Không tìm thấy món ăn
          </Typography>
          <Button component={Link} to="/menu" variant="contained">
            Quay lại Menu
          </Button>
        </Container>
      </Box>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image
    });
    toast.success(`Đã thêm ${food.name} vào giỏ hàng!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      <Container sx={{ py: 4 }}>
        <Button
          component={Link}
          to="/menu"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Quay lại Menu
        </Button>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Image */}
          <Box sx={{ flex: { xs: '1', md: '1' } }}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: 'grey.100',
              }}
            >
              <Box
                component="img"
                src={food.image}
                alt={food.name}
                sx={{
                  width: '100%',
                  aspectRatio: '1',
                  objectFit: 'cover',
                }}
              />
            </Paper>
          </Box>

          {/* Details */}
          <Box sx={{ flex: { xs: '1', md: '1' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ mb: 2 }}>
                <Chip label={food.category} color="primary" sx={{ mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
                  {food.name}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ mb: 3, fontWeight: 700 }}>
                  {formatPrice(food.price)}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Mô tả
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {food.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Thành phần
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {food.ingredients.map((ingredient, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Check sx={{ color: 'success.main', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {ingredient}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FoodDetail;
