
import React from 'react';
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
import { 
  Users, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Bell, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Mock data for dashboard
const mockStats = {
  users: {
    total: 1250,
    new: 38,
    active: 890,
    vendors: 45,
  },
  products: {
    total: 3750,
    pending: 124,
    outOfStock: 230,
  },
  orders: {
    total: 4890,
    pending: 78,
    processing: 145,
    shipped: 234,
    delivered: 4433,
    revenue: 1245600,
  },
  revenue: {
    today: 12500,
    thisWeek: 87500,
    thisMonth: 345000,
    lastMonth: 298700,
  }
};

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    type: 'order',
    message: 'طلب جديد #ORD123456 بقيمة 2500 جنيه',
    time: '15:30',
    date: 'اليوم',
    status: 'new'
  },
  {
    id: 2,
    type: 'vendor',
    message: 'انضمام متجر جديد: معدات الزراعة الحديثة',
    time: '12:45',
    date: 'اليوم',
    status: 'new'
  },
  {
    id: 3,
    type: 'product',
    message: 'منتج جديد بانتظار الموافقة: مضخة ري بالطاقة الشمسية',
    time: '09:20',
    date: 'اليوم',
    status: 'pending'
  },
  {
    id: 4,
    type: 'user',
    message: 'مستخدم جديد: محمد أحمد',
    time: '18:15',
    date: 'أمس',
    status: 'new'
  },
  {
    id: 5,
    type: 'report',
    message: 'بلاغ عن مشكلة في منتج: علف أسماك منتهي الصلاحية',
    time: '14:30',
    date: 'أمس',
    status: 'urgent'
  }
];

// Mock pending approvals
const pendingApprovals = [
  {
    id: 1,
    type: 'vendor',
    name: 'مزارع الدلتا للمعدات',
    date: '2025-04-25',
    status: 'pending'
  },
  {
    id: 2,
    type: 'product',
    name: 'مضخة ري بالطاقة الشمسية',
    vendor: 'معدات الزراعة الحديثة',
    date: '2025-04-26',
    status: 'pending'
  },
  {
    id: 3,
    type: 'product',
    name: 'أقفاص سمكية دائرية 3 متر',
    vendor: 'مزارع النيل للأسماك',
    date: '2025-04-24',
    status: 'pending'
  }
];

const AdminDashboard = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">لوحة تحكم المدير</h1>
          <Card>
            <CardContent className="p-8">
              <p className="text-xl mb-6">يجب عليك تسجيل الدخول كمدير للوصول إلى هذه الصفحة</p>
              <Button asChild>
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('ar-EG');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">لوحة تحكم المدير</h1>
            <p className="text-gray-500">مرحبًا، {user.name}! إليك نظرة عامة على المنصة</p>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Button asChild variant="outline">
              <Link to="/admin/vendors">
                <Users size={16} className="ml-2" />
                البائعين
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/products">
                <Package size={16} className="ml-2" />
                المنتجات
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin/settings">
                الإعدادات
              </Link>
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
              <div className="text-2xl font-bold">{formatNumber(mockStats.orders.revenue)} جنيه</div>
              <p className="text-xs text-gray-500 mt-1">{formatNumber(mockStats.orders.total)} طلب</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">المستخدمين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mockStats.users.total)}</div>
              <p className="text-xs text-gray-500 mt-1">{formatNumber(mockStats.users.new)}+ مستخدم جديد هذا الأسبوع</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">البائعين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mockStats.users.vendors)}</div>
              <p className="text-xs text-gray-500 mt-1">3+ بائع جديد هذا الأسبوع</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">المنتجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mockStats.products.total)}</div>
              <p className="text-xs text-gray-500 mt-1">{formatNumber(mockStats.products.pending)} منتج ينتظر الموافقة</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="approvals">الموافقات المعلقة</TabsTrigger>
            <TabsTrigger value="activity">الأنشطة الأخيرة</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>المبيعات والإيرادات</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>رسم بياني للمبيعات والإيرادات</p>
                    <p className="text-sm">(سيتم تنفيذه في الإصدار التالي)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توزيع المنتجات حسب الفئة</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>رسم بياني لتوزيع المنتجات حسب الفئة</p>
                    <p className="text-sm">(سيتم تنفيذه في الإصدار التالي)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart size={18} className="ml-2" />
                    الطلبات حسب الحالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">بانتظار الدفع</span>
                      <span className="font-semibold">{mockStats.orders.pending}</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">قيد المعالجة</span>
                      <span className="font-semibold">{mockStats.orders.processing}</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">تم الشحن</span>
                      <span className="font-semibold">{mockStats.orders.shipped}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-600">تم التسليم</span>
                      <span className="font-semibold">{mockStats.orders.delivered}</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link to="/admin/orders">إدارة الطلبات</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users size={18} className="ml-2" />
                    إحصائيات المستخدمين
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">العملاء</span>
                      <span className="font-semibold">{mockStats.users.total - mockStats.users.vendors}</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">البائعين</span>
                      <span className="font-semibold">{mockStats.users.vendors}</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">المستخدمين النشطين</span>
                      <span className="font-semibold">{mockStats.users.active}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-600">مستخدمين جدد (هذا الشهر)</span>
                      <span className="font-semibold">{mockStats.users.new}</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link to="/admin/users">إدارة المستخدمين</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package size={18} className="ml-2" />
                    حالة المنتجات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">إجمالي المنتجات</span>
                      <span className="font-semibold">{mockStats.products.total}</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">تنتظر الموافقة</span>
                      <span className="font-semibold">{mockStats.products.pending}</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">غير متوفرة بالمخزون</span>
                      <span className="font-semibold">{mockStats.products.outOfStock}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-600">منتجات نشطة</span>
                      <span className="font-semibold">{mockStats.products.total - mockStats.products.outOfStock}</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link to="/admin/products">إدارة المنتجات</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>طلبات الموافقة المعلقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3">النوع</th>
                        <th className="pb-3">الاسم</th>
                        <th className="pb-3">التفاصيل</th>
                        <th className="pb-3">التاريخ</th>
                        <th className="pb-3">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingApprovals.map(item => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3">
                            {item.type === 'vendor' ? (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">متجر جديد</span>
                            ) : (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">منتج جديد</span>
                            )}
                          </td>
                          <td>{item.name}</td>
                          <td>
                            {item.type === 'vendor' ? (
                              'طلب انضمام كبائع'
                            ) : (
                              `البائع: ${item.vendor}`
                            )}
                          </td>
                          <td>{new Date(item.date).toLocaleDateString('ar-EG')}</td>
                          <td>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button size="sm" variant="outline" className="border-green-500 hover:bg-green-50 text-green-600">
                                <CheckCircle size={16} className="ml-1" />
                                موافقة
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 hover:bg-red-50 text-red-600">
                                <AlertTriangle size={16} className="ml-1" />
                                رفض
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link to="/admin/approvals">عرض كل طلبات الموافقة</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map(activity => (
                    <li key={activity.id} className="border-b pb-4">
                      <div className="flex items-start">
                        {activity.type === 'order' && (
                          <span className="rounded-full p-2 bg-blue-100 text-blue-600 ml-3">
                            <ShoppingCart size={16} />
                          </span>
                        )}
                        {activity.type === 'vendor' && (
                          <span className="rounded-full p-2 bg-green-100 text-green-600 ml-3">
                            <Users size={16} />
                          </span>
                        )}
                        {activity.type === 'product' && (
                          <span className="rounded-full p-2 bg-purple-100 text-purple-600 ml-3">
                            <Package size={16} />
                          </span>
                        )}
                        {activity.type === 'user' && (
                          <span className="rounded-full p-2 bg-yellow-100 text-yellow-600 ml-3">
                            <Users size={16} />
                          </span>
                        )}
                        {activity.type === 'report' && (
                          <span className="rounded-full p-2 bg-red-100 text-red-600 ml-3">
                            <AlertTriangle size={16} />
                          </span>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{activity.message}</span>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </div>
                          <div className="mt-1 flex items-center">
                            <span className="text-xs text-gray-500">{activity.date}</span>
                            {activity.status === 'urgent' && (
                              <span className="mr-2 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">عاجل</span>
                            )}
                            {activity.status === 'pending' && (
                              <span className="mr-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">معلق</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/admin/activities">عرض كل الأنشطة</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
