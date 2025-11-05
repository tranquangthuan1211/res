import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import Navbar from '@/components/mui/Navbar';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(100, 'Tên quá dài'),
  phone: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  address: z.string().min(10, 'Địa chỉ phải có ít nhất 10 ký tự').max(200, 'Địa chỉ quá dài'),
  note: z.string().max(500, 'Ghi chú quá dài').optional(),
});

type FormData = z.infer<typeof formSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      note: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Order submitted:', {
      customer: data,
      items,
      totalPrice,
      orderTime: new Date().toISOString(),
    });

    clearCart();
    setIsSubmitting(false);
    
    toast.success('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
          Đặt hàng
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          {/* Form */}
          <Box sx={{ flex: { xs: '1', lg: '2' } }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                  Thông tin giao hàng
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Họ và tên *"
                          placeholder="Nguyễn Văn A"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Số điện thoại *"
                          placeholder="0912345678"
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Địa chỉ giao hàng *"
                          placeholder="Số nhà, đường, phường, quận..."
                          error={!!errors.address}
                          helperText={errors.address?.message}
                          multiline
                          rows={3}
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="note"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Ghi chú (không bắt buộc)"
                          placeholder="Yêu cầu đặc biệt về đơn hàng..."
                          error={!!errors.note}
                          helperText={errors.note?.message}
                          multiline
                          rows={3}
                          fullWidth
                        />
                      )}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: { xs: '1', lg: '1' } }}>
            <Card sx={{ position: { lg: 'sticky' }, top: 80 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                  Đơn hàng của bạn
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {items.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Phí vận chuyển:
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        Miễn phí
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Tổng cộng:
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {formatPrice(totalPrice)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Checkout;
