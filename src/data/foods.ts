import phoBo from '@/assets/pho-bo.jpg';
import bunCha from '@/assets/bun-cha.jpg';
import comGa from '@/assets/com-ga.jpg';
import banhMi from '@/assets/banh-mi.jpg';
import goiCuon from '@/assets/goi-cuon.jpg';
import chaGio from '@/assets/cha-gio.jpg';
import traChanh from '@/assets/tra-chanh.jpg';
import caPhe from '@/assets/ca-phe.jpg';
import nuocDua from '@/assets/nuoc-dua.jpg';
import cheBaMau from '@/assets/che-ba-mau.jpg';
import banhFlan from '@/assets/banh-flan.jpg';
import huTieu from '@/assets/hu-tieu.jpg';

export interface Food {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  ingredients: string[];
}

export const categories = ['Tất cả', 'Món chính', 'Món phụ', 'Đồ uống', 'Tráng miệng'];

export const foods: Food[] = [
  {
    id: 1,
    name: 'Phở Bò Đặc Biệt',
    category: 'Món chính',
    price: 65000,
    description: 'Phở bò truyền thống với nước dùng được ninh từ xương trong 12 giờ, thịt bò tươi ngon',
    image: phoBo,
    ingredients: ['Bánh phở', 'Thịt bò', 'Hành', 'Ngò', 'Giá đỗ']
  },
  {
    id: 2,
    name: 'Bún Chả Hà Nội',
    category: 'Món chính',
    price: 55000,
    description: 'Bún chả thơm ngon với chả nướng than hoa, thịt ba chỉ nướng, nước mắm pha chua ngọt',
    image: bunCha,
    ingredients: ['Bún', 'Chả nướng', 'Thịt nướng', 'Nước mắm', 'Rau sống']
  },
  {
    id: 3,
    name: 'Cơm Gà Xối Mỡ',
    category: 'Món chính',
    price: 50000,
    description: 'Cơm thơm mềm kèm gà luộc hoặc gà quay, sốt đặc biệt',
    image: comGa,
    ingredients: ['Cơm', 'Gà', 'Hành phi', 'Sốt gà', 'Dưa leo']
  },
  {
    id: 4,
    name: 'Bánh Mì Thịt Nướng',
    category: 'Món chính',
    price: 35000,
    description: 'Bánh mì giòn rụm với thịt nướng thơm, pate, và rau sống tươi mát',
    image: banhMi,
    ingredients: ['Bánh mì', 'Thịt nướng', 'Pate', 'Rau sống', 'Dưa leo']
  },
  {
    id: 5,
    name: 'Gỏi Cuốn Tôm Thịt',
    category: 'Món phụ',
    price: 40000,
    description: 'Gỏi cuốn tươi ngon với tôm, thịt, bún, rau thơm, chấm nước mắm chua ngọt',
    image: goiCuon,
    ingredients: ['Bánh tráng', 'Tôm', 'Thịt', 'Bún', 'Rau thơm']
  },
  {
    id: 6,
    name: 'Chả Giò Rế',
    category: 'Món phụ',
    price: 45000,
    description: 'Chả giò chiên giòn với nhân thịt, mộc nhĩ, rau củ',
    image: chaGio,
    ingredients: ['Bánh tráng', 'Thịt', 'Mộc nhĩ', 'Miến', 'Rau củ']
  },
  {
    id: 7,
    name: 'Trà Chanh Tươi',
    category: 'Đồ uống',
    price: 25000,
    description: 'Trà chanh mát lạnh, vị chua ngọt hài hòa',
    image: traChanh,
    ingredients: ['Trà', 'Chanh tươi', 'Đường', 'Đá']
  },
  {
    id: 8,
    name: 'Cà Phê Sữa Đá',
    category: 'Đồ uống',
    price: 30000,
    description: 'Cà phê phin truyền thống pha với sữa đặc, thơm đậm đà',
    image: caPhe,
    ingredients: ['Cà phê', 'Sữa đặc', 'Đá']
  },
  {
    id: 9,
    name: 'Nước Dừa Tươi',
    category: 'Đồ uống',
    price: 30000,
    description: 'Nước dừa tươi ngọt mát, giải nhiệt hiệu quả',
    image: nuocDua,
    ingredients: ['Dừa tươi', 'Đá']
  },
  {
    id: 10,
    name: 'Chè Ba Màu',
    category: 'Tráng miệng',
    price: 30000,
    description: 'Chè ba màu với đậu đỏ, đậu xanh, thạch, sữa dừa',
    image: cheBaMau,
    ingredients: ['Đậu đỏ', 'Đậu xanh', 'Thạch', 'Nước cốt dừa']
  },
  {
    id: 11,
    name: 'Bánh Flan Caramel',
    category: 'Tráng miệng',
    price: 25000,
    description: 'Bánh flan mềm mịn với lớp caramel đắng nhẹ',
    image: banhFlan,
    ingredients: ['Trứng', 'Sữa', 'Đường caramel']
  },
  {
    id: 12,
    name: 'Hủ Tiếu Nam Vang',
    category: 'Món chính',
    price: 60000,
    description: 'Hủ tiếu với nước dùng ngọt thanh, tôm, thịt, gan',
    image: huTieu,
    ingredients: ['Hủ tiếu', 'Tôm', 'Thịt', 'Gan', 'Giá đỗ']
  }
];
