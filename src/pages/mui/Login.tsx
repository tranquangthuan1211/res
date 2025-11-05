import { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';
import Navbar from '@/components/mui/Navbar';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const {signIn} = useAuth();
  useEffect(() => {
    const user = localStorage.getItem('users');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onLogin = (data: LoginData) => {
    const savedUser = localStorage.getItem('users');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === data.email && user.password === data.password) {
        toast.success('Đăng nhập thành công!');
        signIn(data.email, data.password);
        setIsLoggedIn(true);
        navigate('/');
        return;
      }
    }
    toast.error('Email hoặc mật khẩu không đúng');
  };

  const onSignup = (data: SignupData) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    signIn(data.email, data.password);
    toast.success('Đăng ký thành công!');
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    // localStorage.removeItem('users');
    setIsLoggedIn(false);
    toast.success('Đã đăng xuất');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      <Container sx={{ py: 8 }}>
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          {isLoggedIn ? (
            <Card>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    mb: 3,
                    display: 'inline-flex',
                    p: 2,
                    background: 'linear-gradient(135deg, hsl(24, 100%, 50%), hsl(14, 100%, 57%))',
                    borderRadius: 3,
                  }}
                >
                  <RestaurantIcon sx={{ fontSize: 48, color: 'white' }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                  Bạn đã đăng nhập
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Chào mừng trở lại với ReactFood!
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    onClick={() => navigate('/')}
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    Về trang chủ
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    size="large"
                    fullWidth
                  >
                    Đăng xuất
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      mb: 2,
                      display: 'inline-flex',
                      p: 2,
                      background: 'linear-gradient(135deg, hsl(24, 100%, 50%), hsl(14, 100%, 57%))',
                      borderRadius: 3,
                    }}
                  >
                    <RestaurantIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                    Chào mừng đến ReactFood
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đăng nhập hoặc tạo tài khoản để tiếp tục
                  </Typography>
                </Box>

                <Tabs
                  value={tabValue}
                  onChange={(_, newValue) => setTabValue(newValue)}
                  variant="fullWidth"
                  sx={{ mb: 3 }}
                >
                  <Tab label="Đăng nhập" />
                  <Tab label="Đăng ký" />
                </Tabs>

                {tabValue === 0 ? (
                  <form key="login-form" onSubmit={loginForm.handleSubmit(onLogin)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      <Controller
                        name="email"
                        control={loginForm.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            type="email"
                            placeholder="email@example.com"
                            error={!!loginForm.formState.errors.email}
                            helperText={loginForm.formState.errors.email?.message}
                            fullWidth
                          />
                        )}
                      />

                      <Controller
                        name="password"
                        control={loginForm.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Mật khẩu"
                            type="password"
                            placeholder="••••••"
                            error={!!loginForm.formState.errors.password}
                            helperText={loginForm.formState.errors.password?.message}
                            fullWidth
                          />
                        )}
                      />

                      <Button type="submit" variant="contained" size="large" fullWidth>
                        Đăng nhập
                      </Button>
                    </Box>
                  </form>
                ) : (
                  <form key="signup-form" onSubmit={signupForm.handleSubmit(onSignup)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      <Controller
                        name="name"
                        control={signupForm.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Họ và tên"
                            placeholder="Nguyễn Văn A"
                            error={!!signupForm.formState.errors.name}
                            helperText={signupForm.formState.errors.name?.message}
                            fullWidth
                          />
                        )}
                      />

                      <Controller
                        name="email"
                        control={signupForm.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            type="email"
                            placeholder="email@example.com"
                            error={!!signupForm.formState.errors.email}
                            helperText={signupForm.formState.errors.email?.message}
                            fullWidth
                          />
                        )}
                      />

                      <Controller
                        name="password"
                        control={signupForm.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Mật khẩu"
                            type="password"
                            placeholder="••••••"
                            error={!!signupForm.formState.errors.password}
                            helperText={signupForm.formState.errors.password?.message}
                            fullWidth
                          />
                        )}
                      />

                      <Controller
                        name="confirmPassword"
                        control={signupForm.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Xác nhận mật khẩu"
                            type="password"
                            placeholder="••••••"
                            error={!!signupForm.formState.errors.confirmPassword}
                            helperText={signupForm.formState.errors.confirmPassword?.message}
                            fullWidth
                          />
                        )}
                      />

                      <Button type="submit" variant="contained" size="large" fullWidth>
                        Đăng ký
                      </Button>
                    </Box>
                  </form>
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Login;