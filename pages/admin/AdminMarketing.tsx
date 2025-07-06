
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Download, 
  Users,
  MousePointerClick,
  ArrowRight,
  ShoppingBag,
  Eye
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
import { Badge } from '@/components/ui/badge';

// Mock data for website traffic
const trafficData = [
  { day: 'السبت', visits: 1520, pageViews: 4250, users: 1180 },
  { day: 'الأحد', visits: 1680, pageViews: 4520, users: 1240 },
  { day: 'الإثنين', visits: 1420, pageViews: 3980, users: 1120 },
  { day: 'الثلاثاء', visits: 1380, pageViews: 3750, users: 1080 },
  { day: 'الأربعاء', visits: 1620, pageViews: 4320, users: 1220 },
  { day: 'الخميس', visits: 1820, pageViews: 4850, users: 1340 },
  { day: 'الجمعة', visits: 2120, pageViews: 5640, users: 1580 },
];

// Mock data for traffic sources
const trafficSourcesData = [
  { name: 'البحث العضوي', value: 35 },
  { name: 'الإحالات', value: 25 },
  { name: 'وسائل التواصل الاجتماعي', value: 20 },
  { name: 'البحث المدفوع', value: 10 },
  { name: 'البريد الإلكتروني', value: 5 },
  { name: 'مباشر', value: 5 },
];

// Mock data for conversion funnel
const conversionFunnelData = [
  { name: 'الزيارات', value: 12000 },
  { name: 'التصفح', value: 8500 },
  { name: 'إضافة للسلة', value: 3200 },
  { name: 'الدفع', value: 1800 },
  { name: 'إتمام الطلب', value: 1450 },
];

// Mock data for most viewed products
const mostViewedProductsData = [
  { id: 1, name: 'مضخة ري عالية القوة', views: 1250, addToCart: 320, conversion: 25.6 },
  { id: 2, name: 'مضخة أكسجين للمزارع السمكية', views: 980, addToCart: 215, conversion: 21.9 },
  { id: 3, name: 'علف أسماك عالي البروتين 20كجم', views: 850, addToCart: 245, conversion: 28.8 },
  { id: 4, name: 'أقفاص سمكية دائرية 3 متر', views: 720, addToCart: 180, conversion: 25.0 },
  { id: 5, name: 'رشاشات مياه متعددة الاتجاهات', views: 680, addToCart: 160, conversion: 23.5 },
];

// Mock data for top search terms
const topSearchTermsData = [
  { term: 'مضخة مياه', searches: 450, clicks: 320, conversion: 28 },
  { term: 'علف أسماك', searches: 380, clicks: 290, conversion: 24 },
  { term: 'أقفاص سمكية', searches: 320, clicks: 210, conversion: 18 },
  { term: 'مضخة أكسجين', searches: 280, clicks: 185, conversion: 21 },
  { term: 'معدات ري', searches: 250, clicks: 195, conversion: 19 },
];

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminMarketing = () => {
  const [timeFrame, setTimeFrame] = useState('week');
  
  // Calculate totals
  const totalVisits = trafficData.reduce((sum, item) => sum + item.visits, 0);
  const totalPageViews = trafficData.reduce((sum, item) => sum + item.pageViews, 0);
  const totalUsers = trafficData.reduce((sum, item) => sum + item.users, 0);
  
  // Calculate conversion rate from visits to purchase
  const conversionRate = ((conversionFunnelData[4].value / conversionFunnelData[0].value) * 100).toFixed(2);
  
  // Calculate bounce rate (mock data)
  const bounceRate = '35.2%';
  
  // Calculate average session duration (mock data)
  const avgSessionDuration = '3:45';
  
  // Calculate cart abandonment rate
  const cartAbandonmentRate = (((conversionFunnelData[2].value - conversionFunnelData[3].value) / conversionFunnelData[2].value) * 100).toFixed(2);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">إحصائيات التسويق</h1>
            <p className="text-gray-500">تحليل حركة الزوار والتحويلات والأداء التسويقي</p>
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
                <SelectItem value="day">اليوم</SelectItem>
                <SelectItem value="week">آخر 7 أيام</SelectItem>
                <SelectItem value="month">آخر 30 يوم</SelectItem>
                <SelectItem value="year">العام الحالي</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Marketing Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي الزيارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-blue-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
                  <p className="text-xs text-green-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mb-0.5 ml-1" />
                    زيادة بنسبة 12% عن الفترة السابقة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">معدل التحويل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ArrowRight className="h-8 w-8 text-green-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{conversionRate}%</div>
                  <p className="text-xs text-green-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mb-0.5 ml-1" />
                    زيادة بنسبة 2.5% عن الفترة السابقة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">معدل ترك السلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-yellow-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{cartAbandonmentRate}%</div>
                  <p className="text-xs text-green-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mb-0.5 ml-1" />
                    تحسن بنسبة 3.5% عن الفترة السابقة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">معدل الارتداد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-red-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{bounceRate}</div>
                  <p className="text-xs text-green-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mb-0.5 ml-1" />
                    تحسن بنسبة 1.8% عن الفترة السابقة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="traffic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="traffic">حركة الزوار</TabsTrigger>
            <TabsTrigger value="conversion">قمع التحويل</TabsTrigger>
            <TabsTrigger value="products">أداء المنتجات</TabsTrigger>
            <TabsTrigger value="search">مصطلحات البحث</TabsTrigger>
            <TabsTrigger value="campaigns">الحملات التسويقية</TabsTrigger>
          </TabsList>
          
          {/* Traffic Tab */}
          <TabsContent value="traffic">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>حركة الزوار الأسبوعية</CardTitle>
                  <CardDescription>تحليل الزيارات، مشاهدات الصفحة، والمستخدمين</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" name="الزيارات" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="pageViews" name="مشاهدات الصفحة" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="users" name="المستخدمين" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>مصادر الزيارات</CardTitle>
                  <CardDescription>توزيع مصادر الزيارات على الموقع</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trafficSourcesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {trafficSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {trafficSourcesData.map((source, index) => (
                      <div key={source.name} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full ml-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                        />
                        <span className="text-xs">{source.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات الجلسة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">متوسط مدة الجلسة</p>
                      <div className="text-2xl font-bold">{avgSessionDuration}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">متوسط الصفحات لكل جلسة</p>
                      <div className="text-2xl font-bold">{(totalPageViews / totalVisits).toFixed(2)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">معدل الارتداد</p>
                      <div className="text-2xl font-bold">{bounceRate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أكثر الصفحات زيارة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">الصفحة الرئيسية</span>
                      <span className="font-semibold">4,250</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">قائمة المنتجات</span>
                      <span className="font-semibold">3,180</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">معدات المزارع السمكية</span>
                      <span className="font-semibold">2,450</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">أعلاف</span>
                      <span className="font-semibold">1,980</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-600">سلة التسوق</span>
                      <span className="font-semibold">1,620</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الأجهزة والمتصفحات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">الأجهزة</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>الهاتف المحمول</span>
                        <span className="font-semibold">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span>الكمبيوتر</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span>الأجهزة اللوحية</span>
                        <span className="font-semibold">10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">المتصفحات</p>
                    <ul className="space-y-1">
                      <li className="flex justify-between">
                        <span>Chrome</span>
                        <span>58%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Safari</span>
                        <span>24%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Firefox</span>
                        <span>10%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Edge</span>
                        <span>6%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>أخرى</span>
                        <span>2%</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Conversion Funnel Tab */}
          <TabsContent value="conversion">
            <Card>
              <CardHeader>
                <CardTitle>قمع التحويل</CardTitle>
                <CardDescription>تحليل تدفق المستخدمين من الزيارة إلى إتمام الشراء</CardDescription>
              </CardHeader>
              <CardContent className="pb-10">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionFunnelData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="عدد المستخدمين" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">تحليل نقاط التحويل</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المرحلة</TableHead>
                        <TableHead>عدد المستخدمين</TableHead>
                        <TableHead>نسبة التحويل</TableHead>
                        <TableHead>نسبة الانخفاض</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {conversionFunnelData.map((stage, index) => {
                        const prevStage = index > 0 ? conversionFunnelData[index - 1].value : stage.value;
                        const conversionRate = index > 0 ? ((stage.value / prevStage) * 100).toFixed(2) : '100.00';
                        const dropRate = index > 0 ? (100 - parseFloat(conversionRate)).toFixed(2) : '0.00';
                        
                        return (
                          <TableRow key={stage.name}>
                            <TableCell className="font-medium">{stage.name}</TableCell>
                            <TableCell>{stage.value.toLocaleString()}</TableCell>
                            <TableCell>{conversionRate}%</TableCell>
                            <TableCell className={index > 0 ? 'text-red-600' : 'text-gray-500'}>
                              {dropRate}%
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

          {/* Products Performance Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>أداء المنتجات</CardTitle>
                <CardDescription>تحليل أداء المنتجات من حيث المشاهدات والتحويلات</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>المشاهدات</TableHead>
                      <TableHead>إضافة للسلة</TableHead>
                      <TableHead>نسبة التحويل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mostViewedProductsData.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.views.toLocaleString()}</TableCell>
                        <TableCell>{product.addToCart.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={product.conversion > 25 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {product.conversion}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Terms Tab */}
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>مصطلحات البحث الشائعة</CardTitle>
                <CardDescription>تحليل مصطلحات البحث الأكثر استخدامًا على الموقع</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>مصطلح البحث</TableHead>
                      <TableHead>عدد عمليات البحث</TableHead>
                      <TableHead>عدد النقرات</TableHead>
                      <TableHead>نسبة النقر إلى الظهور</TableHead>
                      <TableHead>نسبة التحويل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSearchTermsData.map((term) => (
                      <TableRow key={term.term}>
                        <TableCell className="font-medium">{term.term}</TableCell>
                        <TableCell>{term.searches}</TableCell>
                        <TableCell>{term.clicks}</TableCell>
                        <TableCell>{((term.clicks / term.searches) * 100).toFixed(2)}%</TableCell>
                        <TableCell>
                          <Badge className={term.conversion > 20 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {term.conversion}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">مصطلحات البحث بدون نتائج</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>أنظمة الأتمتة للمزارع</li>
                    <li>أجهزة قياس جودة المياه</li>
                    <li>مكافحة الآفات العضوية</li>
                    <li>أسمدة عضوية محلية</li>
                    <li>خراطيم ري بالتنقيط</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Campaigns Tab */}
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>الحملات التسويقية</CardTitle>
                <CardDescription>تحليل أداء الحملات التسويقية المختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الحملة</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>تاريخ البدء</TableHead>
                      <TableHead>تاريخ الانتهاء</TableHead>
                      <TableHead>عدد الزيارات</TableHead>
                      <TableHead>التحويلات</TableHead>
                      <TableHead>العائد على الاستثمار</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">حملة موسم الزراعة</TableCell>
                      <TableCell>إعلانات جوجل</TableCell>
                      <TableCell>2025-03-01</TableCell>
                      <TableCell>2025-03-15</TableCell>
                      <TableCell>2450</TableCell>
                      <TableCell>185</TableCell>
                      <TableCell>320%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">منتهية</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">المعدات الزراعية - رمضان</TableCell>
                      <TableCell>فيسبوك</TableCell>
                      <TableCell>2025-03-15</TableCell>
                      <TableCell>2025-04-15</TableCell>
                      <TableCell>3820</TableCell>
                      <TableCell>265</TableCell>
                      <TableCell>280%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">منتهية</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">مستلزمات المزارع السمكية</TableCell>
                      <TableCell>إنستجرام</TableCell>
                      <TableCell>2025-04-01</TableCell>
                      <TableCell>2025-04-30</TableCell>
                      <TableCell>2180</TableCell>
                      <TableCell>145</TableCell>
                      <TableCell>210%</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">نشطة</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">خصومات الصيف</TableCell>
                      <TableCell>البريد الإلكتروني</TableCell>
                      <TableCell>2025-04-20</TableCell>
                      <TableCell>2025-05-20</TableCell>
                      <TableCell>1250</TableCell>
                      <TableCell>95</TableCell>
                      <TableCell>180%</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">نشطة</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">معدات الري المتطورة</TableCell>
                      <TableCell>يوتيوب</TableCell>
                      <TableCell>2025-05-01</TableCell>
                      <TableCell>2025-05-30</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0%</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">مجدولة</Badge>
                      </TableCell>
                    </TableRow>
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

export default AdminMarketing;
