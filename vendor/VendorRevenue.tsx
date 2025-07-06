
import React, { useState } from 'react';
import VendorLayout from '@/components/vendor/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, CreditCard, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for revenue
const revenueData = [
  { month: 'يناير', revenue: 5200, orders: 45 },
  { month: 'فبراير', revenue: 4800, orders: 42 },
  { month: 'مارس', revenue: 6400, orders: 53 },
  { month: 'أبريل', revenue: 8200, orders: 67 },
  { month: 'مايو', revenue: 7900, orders: 62 },
  { month: 'يونيو', revenue: 9100, orders: 78 },
  { month: 'يوليو', revenue: 10500, orders: 88 },
  { month: 'أغسطس', revenue: 11200, orders: 94 },
  { month: 'سبتمبر', revenue: 9800, orders: 81 },
  { month: 'أكتوبر', revenue: 12400, orders: 103 },
  { month: 'نوفمبر', revenue: 15800, orders: 127 },
  { month: 'ديسمبر', revenue: 18900, orders: 152 },
];

// Mock data for payment methods
const paymentMethodsData = [
  { name: 'بطاقة ائتمان', value: 65 },
  { name: 'الدفع عند الاستلام', value: 25 },
  { name: 'محفظة إلكترونية', value: 8 },
  { name: 'تحويل بنكي', value: 2 },
];

const VendorRevenue = () => {
  const [timeFrame, setTimeFrame] = useState('year');
  
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  
  // Generate stats based on timeframe
  const getStatsForTimeframe = () => {
    // This would normally filter data based on selected timeframe
    // For demo purposes, we're just returning different values
    switch(timeFrame) {
      case 'week':
        return { revenue: 2800, orders: 23, avgOrder: 121.74 };
      case 'month': 
        return { revenue: 11200, orders: 94, avgOrder: 119.15 };
      case 'year':
      default:
        return { revenue: totalRevenue, orders: totalOrders, avgOrder: avgOrderValue };
    }
  };
  
  const currentStats = getStatsForTimeframe();

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">الإيرادات</h1>
            <p className="text-gray-500">تحليل المبيعات والإيرادات لمتجرك</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">آخر 7 أيام</SelectItem>
                <SelectItem value="month">آخر 30 يوم</SelectItem>
                <SelectItem value="year">العام الحالي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-gray-500">
                  إجمالي الإيرادات
                </CardTitle>
              </div>
              <TrendingUp className="text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentStats.revenue.toLocaleString()} ج.م
              </div>
              <p className="text-xs text-gray-500 mt-1">
                زيادة 12% عن الفترة السابقة
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-gray-500">
                  عدد الطلبات
                </CardTitle>
              </div>
              <TrendingUp className="text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentStats.orders} طلب
              </div>
              <p className="text-xs text-gray-500 mt-1">
                زيادة 8% عن الفترة السابقة
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-gray-500">
                  متوسط قيمة الطلب
                </CardTitle>
              </div>
              <TrendingDown className="text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentStats.avgOrder.toFixed(2)} ج.م
              </div>
              <p className="text-xs text-gray-500 mt-1">
                انخفاض 3% عن الفترة السابقة
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue">
          <TabsList className="mb-4">
            <TabsTrigger value="revenue">تحليل الإيرادات</TabsTrigger>
            <TabsTrigger value="orders">تحليل الطلبات</TabsTrigger>
            <TabsTrigger value="payment">طرق الدفع</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>إيرادات المبيعات</CardTitle>
                <CardDescription>تحليل الإيرادات على مدار العام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        name="الإيرادات (ج.م)"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>الطلبات الشهرية</CardTitle>
                <CardDescription>عدد الطلبات على مدار العام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#82ca9d" name="عدد الطلبات" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>طرق الدفع</CardTitle>
                  <CardDescription>توزيع الطلبات حسب طرق الدفع</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={paymentMethodsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="النسبة المئوية (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>أحدث المعاملات</CardTitle>
                  <CardDescription>آخر 5 معاملات مالية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center">
                          <div className="rounded-full bg-gray-100 p-2 mr-3">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">طلب #{Math.floor(Math.random() * 1000) + 1000}</p>
                            <p className="text-xs text-gray-500">
                              <Calendar className="inline h-3 w-3 mb-0.5 ml-1" />
                              {new Date().toLocaleDateString('ar-EG')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {(Math.random() * 2000 + 500).toFixed(2)} ج.م
                          </p>
                          <p className="text-xs text-green-500">تم التحصيل</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorRevenue;
