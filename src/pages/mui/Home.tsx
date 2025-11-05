import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { ChefHat, Clock, Star, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/mui/Navbar';

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: 10,
          px: 2,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, hsl(24, 100%, 50%, 0.1), hsl(43, 100%, 65%, 0.1))',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                mb: 3,
                display: 'inline-flex',
                p: 2,
                background: 'linear-gradient(135deg, hsl(24, 100%, 50%), hsl(14, 100%, 57%))',
                borderRadius: 3,
                boxShadow: '0 8px 24px hsl(24 100% 50% / 0.2)',
              }}
            >
              <ChefHat size={48} color="white" />
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(to right, hsl(24, 100%, 50%), hsl(14, 100%, 57%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ReactFood
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Đặt món ăn ngon - Giao hàng nhanh chóng
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}>
              Thưởng thức những món ăn Việt Nam đặc sắc được chế biến từ nguyên liệu tươi ngon nhất. 
              Đặt hàng dễ dàng, giao tận nơi trong vòng 30 phút!
            </Typography>
            <Button
              component={Link}
              to="/menu"
              variant="contained"
              size="large"
              startIcon={<Utensils size={20} />}
              sx={{ fontSize: '1.1rem', py: 1.5, px: 4 }}
            >
              Xem Menu Ngay
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: 8, px: 2, bgcolor: 'hsl(20, 20%, 98%)' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 4px 16px hsl(24 100% 50% / 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    bgcolor: 'hsl(24, 100%, 50%, 0.1)',
                    borderRadius: '50%',
                    mb: 2,
                  }}
                >
                  <ChefHat size={32} color="hsl(24, 100%, 50%)" />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  Đầu bếp chuyên nghiệp
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đội ngũ đầu bếp giàu kinh nghiệm, đam mê ẩm thực Việt
                </Typography>
              </Paper>

            <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 4px 16px hsl(24 100% 50% / 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    bgcolor: 'hsl(142, 76%, 36%, 0.1)',
                    borderRadius: '50%',
                    mb: 2,
                  }}
                >
                  <Clock size={32} color="hsl(142, 76%, 36%)" />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  Giao hàng nhanh
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cam kết giao hàng trong vòng 30 phút, đồ ăn vẫn nóng sốt
                </Typography>
              </Paper>

            <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 4px 16px hsl(24 100% 50% / 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    bgcolor: 'hsl(43, 100%, 65%, 0.2)',
                    borderRadius: '50%',
                    mb: 2,
                  }}
                >
                  <Star size={32} color="hsl(24, 100%, 50%)" />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  Chất lượng đảm bảo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nguyên liệu tươi ngon, vệ sinh an toàn thực phẩm
                </Typography>
              </Paper>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, px: 2, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
            Đói bụng rồi? Đặt ngay thôi!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Hàng trăm món ăn ngon đang chờ bạn khám phá
          </Typography>
          <Button
            component={Link}
            to="/menu"
            variant="contained"
            size="large"
            sx={{ fontSize: '1.1rem', py: 1.5, px: 4 }}
          >
            Khám phá Menu
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          px: 2,
          bgcolor: 'hsl(20, 20%, 98%)',
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 ReactFood. Tất cả quyền được bảo lưu.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
