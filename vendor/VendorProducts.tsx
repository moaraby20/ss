
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { Search, Plus, Edit, Trash } from 'lucide-react';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'مضخة ري عالية القوة',
    sku: 'PRD-001',
    price: 2500,
    stock: 8,
    category: 'irrigation',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1633098216564-afa1a41cb7f1?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 15
  },
  {
    id: '2',
    name: 'مضخة أكسجين للمزارع السمكية',
    sku: 'PRD-002',
    price: 1800,
    stock: 5,
    category: 'fish-farm-equipment',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1573139834249-ef47545201b6?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 12
  },
  {
    id: '3',
    name: 'علف أسماك عالي البروتين 20كجم',
    sku: 'PRD-003',
    price: 450,
    stock: 18,
    category: 'feed',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1599744255343-84f5a4c1a823?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 25
  },
  {
    id: '4',
    name: 'بذور خضروات متنوعة',
    sku: 'PRD-004',
    price: 120,
    stock: 30,
    category: 'seeds',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 8
  },
  {
    id: '5',
    name: 'سماد عضوي متكامل 50كجم',
    sku: 'PRD-005',
    price: 350,
    stock: 0,
    category: 'fertilizers',
    status: 'out-of-stock',
    image: 'https://images.unsplash.com/photo-1584594981204-8e05539e6056?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 10
  },
  {
    id: '6',
    name: 'جرار زراعي صغير',
    sku: 'PRD-006',
    price: 15000,
    stock: 2,
    category: 'agricultural-equipment',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 3
  },
  {
    id: '7',
    name: 'حوض سمك 500 لتر',
    sku: 'PRD-007',
    price: 3200,
    stock: 0,
    category: 'fish-farm-equipment',
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 0
  },
  {
    id: '8',
    name: 'نظام ري بالتنقيط متكامل',
    sku: 'PRD-008',
    price: 850,
    stock: 7,
    category: 'irrigation',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=100&h=100',
    sales: 6
  },
];

// Categories
const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'fish-farm-equipment', name: 'معدات المزارع السمكية' },
  { id: 'feed', name: 'أعلاف' },
  { id: 'irrigation', name: 'معدات الري' },
  { id: 'seeds', name: 'البذور والشتلات' },
  { id: 'fertilizers', name: 'الأسمدة' },
  { id: 'agricultural-equipment', name: 'المعدات الزراعية' },
];

const VendorProducts = () => {
  const { isAuthenticated, user } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Apply filters
  const filteredProducts = products.filter(product => {
    // Search term filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied through the state change
  };

  if (!isAuthenticated || user?.role !== 'vendor') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">إدارة المنتجات</h1>
          <Card>
            <CardContent className="p-8">
              <p className="text-xl mb-6">يجب عليك تسجيل الدخول كبائع للوصول إلى هذه الصفحة</p>
              <Button asChild>
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">إدارة المنتجات</h1>
            <p className="text-gray-500">إدارة وتحديث منتجاتك</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button asChild>
              <Link to="/vendor/products/new">
                <Plus className="ml-2" size={16} />
                إضافة منتج جديد
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="md:w-1/3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="بحث عن منتج..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              
              <div className="flex gap-4 flex-1">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="md:w-1/3">
                    <SelectValue placeholder="تصفية حسب الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="md:w-1/3">
                    <SelectValue placeholder="تصفية حسب الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="out-of-stock">نفذ المخزون</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>المنتجات ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 pr-4">المنتج</th>
                    <th className="pb-3">SKU</th>
                    <th className="pb-3">السعر</th>
                    <th className="pb-3">المخزون</th>
                    <th className="pb-3">المبيعات</th>
                    <th className="pb-3">الحالة</th>
                    <th className="pb-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <tr key={product.id} className="border-b">
                        <td className="py-4 pr-4">
                          <div className="flex items-center">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover ml-2" />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td>{product.sku}</td>
                        <td>{product.price} جنيه</td>
                        <td>{product.stock} وحدة</td>
                        <td>{product.sales} وحدة</td>
                        <td>
                          {product.status === 'active' && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">نشط</span>
                          )}
                          {product.status === 'out-of-stock' && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">نفذ المخزون</span>
                          )}
                          {product.status === 'inactive' && (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">غير نشط</span>
                          )}
                        </td>
                        <td>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button size="icon" variant="ghost">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">تعديل</span>
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">حذف</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500">
                        لا توجد منتجات تطابق معايير البحث
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorProducts;
