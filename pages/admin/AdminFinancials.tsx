
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  AreaChart, 
  BarChart, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  DollarSign, 
  Store, 
  ShoppingCart,
  Calendar
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock financial data for monthly revenue
const monthlyRevenueData = [
  { month: 'يناير', revenue: 54200, orders: 452, expenses: 23400 },
  { month: 'فبراير', revenue: 48600, orders: 418, expenses: 21200 },
  { month: 'مارس', revenue: 67400, orders: 532, expenses: 28500 },
  { month: 'أبريل', revenue: 82000, orders: 675, expenses: 34200 },
  { month: 'مايو', revenue: 79800, orders: 624, expenses: 31800 },
  { month: 'يونيو', revenue: 91300, orders: 782, expenses: 37600 },
  { month: 'يوليو', revenue: 105600, orders: 885, expenses: 42800 },
  { month: 'أغسطس', revenue: 112400, orders: 943, expenses: 45600 },
  { month: 'سبتمبر', revenue: 98500, orders: 815, expenses: 40200 },
  { month: 'أكتوبر', revenue: 124800, orders: 1034, expenses: 51200 },
  { month: 'نوفمبر', revenue: 158600, orders: 1276, expenses: 63400 },
  { month: 'ديسمبر', revenue: 189700, orders: 1528, expenses: 75800 },
];

// Mock data for categories revenue share
const categoriesRevenueData = [
  { name: 'معدات المزارع السمكية', value: 35 },
  { name: 'أعلاف', value: 25 },
  { name: 'معدات الري', value: 20 },
  { name: 'البذور والشتلات', value: 10 },
  { name: 'الأسمدة', value: 5 },
  { name: 'المعدات الزراعية', value: 5 },
];

// Mock data for payment methods
const paymentMethodsData = [
  { name: 'بطاقة ائتمان', value: 65 },
  { name: 'الدفع عند الاستلام', value: 25 },
  { name: 'محفظة إلكترونية', value: 8 },
  { name: 'تحويل بنكي', value: 2 },
];

// Mock data for top vendors
const topVendorsData = [
  { id: 1, name: 'مزارع الدلتا للمعدات', revenue: 45800, orders: 382 },
  { id: 2, name: 'معدات الزراعة الحديثة', revenue: 38500, orders: 271 },
  { id: 3, name: 'مزارع النيل للأسماك', revenue: 32400, orders: 245 },
  { id: 4, name: 'الشركة المصرية للأعلاف', revenue: 28700, orders: 314 },
  { id: 5, name: 'المستلزمات الزراعية المتطورة', revenue: 24600, orders: 189 },
];

// Mock data for latest transactions
const latestTransactionsData = [
  { id: 'TRX123456', user: 'أحمد محمد', amount: 2500, type: 'order', date: '2025-04-25', status: 'completed' },
  { id: 'TRX789012', user: 'مزارع الدلتا للمعدات', amount: 4800, type: 'payout', date: '2025-04-24', status: 'completed' },
  { id: 'TRX345678', user: 'سارة أحمد', amount: 1800, type: 'order', date: '2025-04-24', status: 'completed' },
  { id: 'TRX901234', user: 'معدات الزراعة الحديثة', amount: 3200, type: 'payout', date: '2025-04-23', status: 'pending' },
  { id: 'TRX567890', user: 'محمود خالد', amount: 950, type: 'order', date: '2025-04-23', status: 'refunded' },
];

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminFinancials = () => {
  const [timeFrame, setTimeFrame] = useState('year');
  
  // Calculate total revenue
  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = monthlyRevenueData.reduce((sum, item) => sum + item.orders, 0);
  const totalExpenses = monthlyRevenueData.reduce((sum, item) => sum + item.expenses, 0);
  const profit = totalRevenue - totalExpenses;
  const profitMargin = ((profit / totalRevenue) * 100).toFixed(2);
  
  // Format currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString('ar-EG') + ' ج.م';
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">البيانات المالية</h1>
            <p className="text-gray-500">تحليل الإيرادات والمصروفات والأرباح للمنصة</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Select 
              value={timeFrame}
              onValueChange={setTimeFrame}
            >
              <SelectTrigger className="w-[180px] ml-2">
                <SelectValue placeholder="اختر الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">الشهر الحالي</SelectItem>
                <SelectItem value="quarter">الربع الحالي</SelectItem>
                <SelectItem value="year">السنة الحالية</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Financial Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي الإيرادات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                  <p className="text-xs text-green-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mb-0.5 ml-1" />
                    نمو بنسبة 12% عن الفترة السابقة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <p className="text-xs text-green-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mb-0.5 ml-1" />
                    نمو بنسبة 8% عن الفترة السابقة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">صافي الأرباح</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{formatCurrency(profit)}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    هامش ربح {profitMargin}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي المصروفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingDown className="h-8 w-8 text-red-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
                  <p className="text-xs text-red-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mb-0.5 ml-1" />
                    زيادة بنسبة 5% عن الفترة السابقة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="revenue">تحليل الإيرادات</TabsTrigger>
            <TabsTrigger value="categories">الفئات والمبيعات</TabsTrigger>
            <TabsTrigger value="vendors">أداء البائعين</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات المالية</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الإيرادات والمصروفات الشهرية</CardTitle>
                  <CardDescription>مقارنة بين الإيرادات والمصروفات على مدار العام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" name="الإيرادات" fill="#8884d8" />
                        <Bar dataKey="expenses" name="المصروفات" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توزيع الإيرادات حسب الفئة</CardTitle>
                  <CardDescription>النسبة المئوية للإيرادات حسب فئات المنتجات</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoriesRevenueData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoriesRevenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {categoriesRevenueData.map((category, index) => (
                      <div key={category.name} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                        />
                        <span className="text-xs">{category.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>طرق الدفع</CardTitle>
                  <CardDescription>توزيع طرق الدفع المستخدمة في الطلبات</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethodsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {paymentMethodsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {paymentMethodsData.map((method, index) => (
                      <div key={method.name} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                        />
                        <span className="text-xs">{method.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أفضل 5 بائعين من حيث الإيرادات</CardTitle>
                  <CardDescription>البائعون الأكثر تحقيقًا للإيرادات</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>البائع</TableHead>
                        <TableHead>الإيرادات</TableHead>
                        <TableHead>الطلبات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topVendorsData.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">{vendor.name}</TableCell>
                          <TableCell>{formatCurrency(vendor.revenue)}</TableCell>
                          <TableCell>{vendor.orders}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>أحدث المعاملات المالية</CardTitle>
                <CardDescription>آخر المعاملات المالية على المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم المعاملة</TableHead>
                      <TableHead>المستخدم</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>نوع المعاملة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestTransactionsData.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell>
                          {transaction.type === 'order' && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">مبيعات</Badge>
                          )}
                          {transaction.type === 'payout' && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">دفع للبائع</Badge>
                          )}
                          {transaction.type === 'refund' && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">استرداد</Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString('ar-EG')}</TableCell>
                        <TableCell>
                          {transaction.status === 'completed' && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">تمت</Badge>
                          )}
                          {transaction.status === 'pending' && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">معلقة</Badge>
                          )}
                          {transaction.status === 'refunded' && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">مستردة</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>تحليل الإيرادات</CardTitle>
                <CardDescription>تفاصيل الإيرادات على مدار العام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        name="الإيرادات" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">تفاصيل الإيرادات الشهرية</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الشهر</TableHead>
                        <TableHead>الإيرادات</TableHead>
                        <TableHead>الطلبات</TableHead>
                        <TableHead>متوسط قيمة الطلب</TableHead>
                        <TableHead>نسبة التغيير</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyRevenueData.map((month, index) => {
                        const prevMonth = index > 0 ? monthlyRevenueData[index - 1].revenue : month.revenue;
                        const changePercent = ((month.revenue - prevMonth) / prevMonth * 100).toFixed(2);
                        const isPositive = Number(changePercent) >= 0;
                        
                        return (
                          <TableRow key={month.month}>
                            <TableCell className="font-medium">{month.month}</TableCell>
                            <TableCell>{formatCurrency(month.revenue)}</TableCell>
                            <TableCell>{month.orders}</TableCell>
                            <TableCell>{formatCurrency(month.revenue / month.orders)}</TableCell>
                            <TableCell>
                              <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                                {isPositive ? '+' : ''}{changePercent}%
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories and Sales Tab */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>توزيع المبيعات حسب الفئة</CardTitle>
                  <CardDescription>تحليل المبيعات لكل فئة من المنتجات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoriesRevenueData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="النسبة المئوية" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Add more content for categories tab */}
            </div>
          </TabsContent>

          {/* Vendors Performance Tab */}
          <TabsContent value="vendors">
            <Card>
              <CardHeader>
                <CardTitle>أداء البائعين</CardTitle>
                <CardDescription>تحليل إيرادات وأداء البائعين على المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البائع</TableHead>
                      <TableHead>إجمالي الإيرادات</TableHead>
                      <TableHead>عدد الطلبات</TableHead>
                      <TableHead>متوسط قيمة الطلب</TableHead>
                      <TableHead>نسبة من إجمالي الإيرادات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topVendorsData.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{formatCurrency(vendor.revenue)}</TableCell>
                        <TableCell>{vendor.orders}</TableCell>
                        <TableCell>{formatCurrency(vendor.revenue / vendor.orders)}</TableCell>
                        <TableCell>{((vendor.revenue / totalRevenue) * 100).toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>المعاملات المالية</CardTitle>
                <CardDescription>سجل جميع المعاملات المالية على المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم المعاملة</TableHead>
                      <TableHead>المستخدم</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>نوع المعاملة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array(10).fill(0).map((_, idx) => {
                      const transaction = latestTransactionsData[idx % latestTransactionsData.length];
                      return (
                        <TableRow key={`${transaction.id}-${idx}`}>
                          <TableCell className="font-medium">{`${transaction.id}${idx}`}</TableCell>
                          <TableCell>{transaction.user}</TableCell>
                          <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                          <TableCell>
                            {transaction.type === 'order' && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">مبيعات</Badge>
                            )}
                            {transaction.type === 'payout' && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">دفع للبائع</Badge>
                            )}
                            {transaction.type === 'refund' && (
                              <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">استرداد</Badge>
                            )}
                          </TableCell>
                          <TableCell>{new Date(transaction.date).toLocaleDateString('ar-EG')}</TableCell>
                          <TableCell>
                            {transaction.status === 'completed' && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">تمت</Badge>
                            )}
                            {transaction.status === 'pending' && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">معلقة</Badge>
                            )}
                            {transaction.status === 'refunded' && (
                              <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">مستردة</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminFinancials;
