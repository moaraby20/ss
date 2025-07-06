
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { Users, Settings, Package, ShoppingCart, FileText } from 'lucide-react';

// Mock data
const mockStats = {
  sales: {
    total: 12500,
    count: 38,
    pending: 5,
    completed: 33,
  },
  products: {
    total: 24,
    active: 18,
    outOfStock: 3,
    inactive: 3,
  },
  revenue: {
    today: 1250,
    thisWeek: 4500,
    thisMonth: 12500,
    lastMonth: 10200,
  },
  traffic: {
    views: 1240,
    unique: 876,
    conversion: 3.2,
  }
};

const VendorDashboard = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'vendor') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">لوحة تحكم البائع</h1>
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">لوحة تحكم البائع</h1>
            <p className="text-gray-500">مرحبًا، {user.name}! إليك نظرة عامة على متجرك</p>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Button asChild variant="outline">
              <Link to="/vendor/products">
                <Package size={16} className="ml-2" />
                إدارة المنتجات
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/vendor/settings">
                <Settings size={16} className="ml-2" />
                إعدادات المتجر
              </Link>
            </Button>
            <Button asChild>
              <Link to="/vendor/products/new">إضافة منتج جديد</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي المبيعات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.sales.total} جنيه</div>
              <p className="text-xs text-gray-500 mt-1">{mockStats.sales.count} طلب</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">المنتجات النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.products.active}</div>
              <p className="text-xs text-gray-500 mt-1">من أصل {mockStats.products.total} منتج</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">الطلبات قيد المعالجة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.sales.pending}</div>
              <p className="text-xs text-gray-500 mt-1">تحتاج إلى معالجة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">معدل التحويل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.traffic.conversion}%</div>
              <p className="text-xs text-gray-500 mt-1">{mockStats.traffic.views} مشاهدة</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="orders">الطلبات الأخيرة</TabsTrigger>
            <TabsTrigger value="products">أفضل المنتجات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>المبيعات الشهرية</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>رسم بياني للمبيعات الشهرية</p>
                    <p className="text-sm">(سيتم تنفيذه في الإصدار التالي)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات الزوار</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>رسم بياني لإحصائيات الزوار</p>
                    <p className="text-sm">(سيتم تنفيذه في الإصدار التالي)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>الطلبات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3">رقم الطلب</th>
                        <th className="pb-3">العميل</th>
                        <th className="pb-3">التاريخ</th>
                        <th className="pb-3">المبلغ</th>
                        <th className="pb-3">الحالة</th>
                        <th className="pb-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">#ORD123456</td>
                        <td>أحمد محمد</td>
                        <td>2025-04-20</td>
                        <td>2500 جنيه</td>
                        <td>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">تم التسليم</span>
                        </td>
                        <td>
                          <Button size="sm" variant="ghost">عرض</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">#ORD789012</td>
                        <td>سارة أحمد</td>
                        <td>2025-04-15</td>
                        <td>1800 جنيه</td>
                        <td>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">تم الشحن</span>
                        </td>
                        <td>
                          <Button size="sm" variant="ghost">عرض</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">#ORD345678</td>
                        <td>محمود خالد</td>
                        <td>2025-04-05</td>
                        <td>850 جنيه</td>
                        <td>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">قيد المعالجة</span>
                        </td>
                        <td>
                          <Button size="sm" variant="ghost">عرض</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link to="/vendor/orders">عرض كل الطلبات</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>أفضل المنتجات مبيعًا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3">المنتج</th>
                        <th className="pb-3">SKU</th>
                        <th className="pb-3">المبيعات</th>
                        <th className="pb-3">المخزون</th>
                        <th className="pb-3">السعر</th>
                        <th className="pb-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 flex items-center">
                          <img src="https://images.unsplash.com/photo-1633098216564-afa1a41cb7f1?auto=format&fit=crop&q=80&w=50&h=50" className="w-10 h-10 rounded object-cover ml-2" alt="مضخة ري" />
                          <span>مضخة ري عالية القوة</span>
                        </td>
                        <td>PRD-001</td>
                        <td>15 وحدة</td>
                        <td>8 وحدات</td>
                        <td>2500 جنيه</td>
                        <td>
                          <Button size="sm" variant="ghost">تعديل</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 flex items-center">
                          <img src="https://images.unsplash.com/photo-1573139834249-ef47545201b6?auto=format&fit=crop&q=80&w=50&h=50" className="w-10 h-10 rounded object-cover ml-2" alt="مضخة أكسجين" />
                          <span>مضخة أكسجين للمزارع السمكية</span>
                        </td>
                        <td>PRD-002</td>
                        <td>12 وحدة</td>
                        <td>5 وحدات</td>
                        <td>1800 جنيه</td>
                        <td>
                          <Button size="sm" variant="ghost">تعديل</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 flex items-center">
                          <img src="https://images.unsplash.com/photo-1599744255343-84f5a4c1a823?auto=format&fit=crop&q=80&w=50&h=50" className="w-10 h-10 rounded object-cover ml-2" alt="علف أسماك" />
                          <span>علف أسماك عالي البروتين 20كجم</span>
                        </td>
                        <td>PRD-003</td>
                        <td>25 وحدة</td>
                        <td>18 وحدة</td>
                        <td>450 جنيه</td>
                        <td>
                          <Button size="sm" variant="ghost">تعديل</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link to="/vendor/products">إدارة المنتجات</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VendorDashboard;
