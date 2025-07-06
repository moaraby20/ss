
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

// Mock order data
const mockOrders = [
  {
    id: 'ORD123456',
    date: '2025-04-20',
    status: 'delivered',
    total: 3250,
    items: [
      { id: '1', name: 'مضخة ري عالية القوة', price: 2500, quantity: 1 },
      { id: '3', name: 'علف أسماك عالي البروتين 20كجم', price: 450, quantity: 1 },
    ],
    shippingAddress: 'شارع 10، حي النزهة، القاهرة',
    trackingNumber: 'TRK789012'
  },
  {
    id: 'ORD789012',
    date: '2025-04-15',
    status: 'shipped',
    total: 2750,
    items: [
      { id: '2', name: 'مضخة أكسجين للمزارع السمكية', price: 1800, quantity: 1 },
      { id: '4', name: 'بذور خضروات متنوعة', price: 120, quantity: 2 },
      { id: '3', name: 'علف أسماك عالي البروتين 20كجم', price: 450, quantity: 1 },
    ],
    shippingAddress: 'شارع 15، المنصورة، الدقهلية',
    trackingNumber: 'TRK345678'
  },
  {
    id: 'ORD345678',
    date: '2025-04-05',
    status: 'processing',
    total: 850,
    items: [
      { id: '8', name: 'نظام ري بالتنقيط متكامل', price: 850, quantity: 1 },
    ],
    shippingAddress: 'شارع 5، حي الهرم، الجيزة',
    trackingNumber: null
  }
];

const OrdersPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState('all');

  // Filter orders based on active tab
  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">طلباتي</h1>
          <Card>
            <CardContent className="p-8">
              <p className="text-xl mb-6">يرجى تسجيل الدخول لعرض طلباتك</p>
              <Button asChild>
                <Link to="/login?redirect=orders">تسجيل الدخول</Link>
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6">طلباتي</h1>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="processing">قيد المعالجة</TabsTrigger>
            <TabsTrigger value="shipped">تم الشحن</TabsTrigger>
            <TabsTrigger value="delivered">تم التسليم</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredOrders.length > 0 ? (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                          <CardTitle className="text-lg">طلب #{order.id}</CardTitle>
                          <CardDescription>{new Date(order.date).toLocaleDateString('ar-EG')}</CardDescription>
                        </div>
                        <Badge className={
                          order.status === 'delivered' 
                            ? 'bg-green-500' 
                            : order.status === 'shipped' 
                            ? 'bg-blue-500' 
                            : 'bg-yellow-500'
                        }>
                          {order.status === 'delivered' 
                            ? 'تم التسليم' 
                            : order.status === 'shipped' 
                            ? 'تم الشحن' 
                            : 'قيد المعالجة'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Order Items */}
                        <div>
                          <h3 className="font-semibold mb-2">المنتجات</h3>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={`${order.id}-${item.id}`} className="flex justify-between">
                                <div>
                                  <span className="font-medium">{item.name}</span>
                                  <span className="text-gray-500 block text-sm">الكمية: {item.quantity}</span>
                                </div>
                                <span>{item.price * item.quantity} جنيه</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Order Total */}
                        <div className="flex justify-between font-bold">
                          <span>الإجمالي</span>
                          <span>{order.total} جنيه</span>
                        </div>

                        <Separator />

                        {/* Shipping Details */}
                        <div>
                          <h3 className="font-semibold mb-2">عنوان الشحن</h3>
                          <p className="text-gray-700">{order.shippingAddress}</p>
                        </div>

                        {/* Tracking Info */}
                        {order.status !== 'processing' && (
                          <div>
                            <h3 className="font-semibold mb-2">تتبع الشحنة</h3>
                            {order.trackingNumber ? (
                              <div className="flex justify-between">
                                <span>رقم التتبع: {order.trackingNumber}</span>
                                <Button variant="outline" size="sm">تتبع الشحنة</Button>
                              </div>
                            ) : (
                              <p className="text-gray-700">سيتم توفير رقم التتبع قريبًا</p>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xl text-gray-500">لا توجد طلبات في هذه الفئة</p>
                <Button asChild className="mt-4">
                  <Link to="/products">تسوق الآن</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OrdersPage;
