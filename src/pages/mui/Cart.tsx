import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Remove, Add, Delete, ShoppingBag } from '@mui/icons-material';
import { useState } from 'react';
import Navbar from '@/components/mui/Navbar';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number; name: string } | null>(null);

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id);
    setDeleteDialog(null);
    toast.success(`Đã xóa ${name} khỏi giỏ hàng`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Container sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
            <ShoppingBag style={{ fontSize: 96, color: '#999', marginBottom: 24 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              Giỏ hàng trống
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Bạn chưa có món ăn nào trong giỏ hàng. Hãy thêm món để tiếp tục!
            </Typography>
            <Button component={Link} to="/menu" variant="contained" size="large">
              Xem Menu
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
          Giỏ hàng của bạn
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          {/* Cart Items */}
          <Box sx={{ flex: { xs: '1', lg: '2' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map(item => (
                <Card key={item.id}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: 96,
                          height: 96,
                          objectFit: 'cover',
                          borderRadius: 2,
                          bgcolor: 'grey.100',
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                          {formatPrice(item.price)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ px: 2, fontWeight: 600, minWidth: 32, textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => setDeleteDialog({ open: true, id: item.id, name: item.name })}
                          >
                            Xóa
                          </Button>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {formatPrice(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: { xs: '1', lg: '1' } }}>
            <Card sx={{ position: { lg: 'sticky' }, top: 80 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  Tổng đơn hàng
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Tạm tính:</Typography>
                    <Typography>{formatPrice(totalPrice)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Phí vận chuyển:</Typography>
                    <Typography color="success.main">Miễn phí</Typography>
                  </Box>
                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      {formatPrice(totalPrice)}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  component={Link}
                  to="/checkout"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Tiến hành đặt hàng
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog?.open || false}
        onClose={() => setDeleteDialog(null)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa "{deleteDialog?.name}" khỏi giỏ hàng?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Hủy</Button>
          <Button
            onClick={() => deleteDialog && handleRemove(deleteDialog.id, deleteDialog.name)}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
