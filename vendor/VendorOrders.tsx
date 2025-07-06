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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { Search, Eye, Truck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const mockOrders = [
  {
    id: 'ORD123456',
    customer: 'أحمد محمد',
    email: 'ahmed@example.com',
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
    customer: 'سارة أحمد',
    email: 'sara@example.com',
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
    customer: 'محمود خالد',
    email: 'mahmoud@example.com',
    date: '2025-04-05',
    status: 'processing',
    total: 850,
    items: [
      { id: '8', name: 'نظام ري بالتنقيط متكامل', price: 850, quantity: 1 },
    ],
    shippingAddress: 'شارع 5، حي الهرم، الجيزة',
    trackingNumber: null
  },
  {
    id: 'ORD456789',
    customer: 'فاطمة عمر',
    email: 'fatima@example.com',
    date: '2025-04-02',
    status: 'processing',
    total: 1950,
    items: [
      { id: '5', name: 'سماد عضوي متكامل 50كجم', price: 350, quantity: 1 },
      { id: '2', name: 'مضخة أكسجين للمزارع السمكية', price: 1800, quantity: 1 },
    ],
    shippingAddress: 'شارع 8، المعادي، القاهرة',
    trackingNumber: null
  }
];

const VendorOrders = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleShipOrder = (orderId: string) => {
    if (!trackingNumber.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم التتبع",
        variant: "destructive",
      });
      return;
    }

    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'shipped',
          trackingNumber: trackingNumber
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    setTrackingNumber('');
    
    toast({
      title: "تم تحديث حالة الطلب",
      description: "تم تحديث حالة الطلب إلى 'تم الشحن'",
    });
  };

  if (!isAuthenticated || user?.role !== 'vendor') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">إدارة الطلبات</h1>
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">إدارة الطلبات</h1>
            <p className="text-gray-500">معالجة وتتبع طلبات العملاء</p>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="md:w-1/2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="بحث عن طلب..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              
              <div className="flex gap-4 flex-1">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="md:w-1/3">
                    <SelectValue placeholder="تصفية حسب الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="processing">قيد المعالجة</SelectItem>
                    <SelectItem value="shipped">تم الشحن</SelectItem>
                    <SelectItem value="delivered">تم التسليم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الطلبات ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 pr-4">رقم الطلب</th>
                    <th className="pb-3">العميل</th>
                    <th className="pb-3">التاريخ</th>
                    <th className="pb-3">المبلغ</th>
                    <th className="pb-3">الحالة</th>
                    <th className="pb-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="py-4 pr-4 font-medium">{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{new Date(order.date).toLocaleDateString('ar-EG')}</td>
                        <td>{order.total} جنيه</td>
                        <td>
                          {order.status === 'delivered' && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">تم التسليم</span>
                          )}
                          {order.status === 'shipped' && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">تم الشحن</span>
                          )}
                          {order.status === 'processing' && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">قيد المعالجة</span>
                          )}
                        </td>
                        <td>
                          <div className="flex space-x-2 space-x-reverse">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="icon" 
                                  variant="ghost"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">عرض التفاصيل</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>تفاصيل الطلب #{order.id}</DialogTitle>
                                  <DialogDescription>
                                    تاريخ الطلب: {new Date(order.date).toLocaleDateString('ar-EG')}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                  <div>
                                    <h3 className="font-semibold mb-2">معلومات العميل</h3>
                                    <p>الاسم: {order.customer}</p>
                                    <p>البريد الإلكتروني: {order.email}</p>
                                    <h3 className="font-semibold mt-4 mb-2">عنوان الشحن</h3>
                                    <p>{order.shippingAddress}</p>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-2">حالة الطلب</h3>
                                    <p>
                                      {order.status === 'delivered' && 'تم التسليم'}
                                      {order.status === 'shipped' && 'تم الشحن'}
                                      {order.status === 'processing' && 'قيد المعالجة'}
                                    </p>
                                    {order.trackingNumber && (
                                      <>
                                        <h3 className="font-semibold mt-4 mb-2">رقم التتبع</h3>
                                        <p>{order.trackingNumber}</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="mt-6">
                                  <h3 className="font-semibold mb-2">المنتجات</h3>
                                  <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full text-right">
                                      <thead className="bg-gray-50">
                                        <tr>
                                          <th className="px-4 py-2 border-b">المنتج</th>
                                          <th className="px-4 py-2 border-b">السعر</th>
                                          <th className="px-4 py-2 border-b">الكمية</th>
                                          <th className="px-4 py-2 border-b">الإجمالي</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order.items.map(item => (
                                          <tr key={item.id} className="border-b">
                                            <td className="px-4 py-3">{item.name}</td>
                                            <td className="px-4 py-3">{item.price} جنيه</td>
                                            <td className="px-4 py-3">{item.quantity}</td>
                                            <td className="px-4 py-3">{item.price * item.quantity} جنيه</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                      <tfoot className="bg-gray-50">
                                        <tr>
                                          <td colSpan={3} className="px-4 py-3 text-left font-semibold">الإجمالي</td>
                                          <td className="px-4 py-3 font-semibold">{order.total} جنيه</td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {order.status === 'processing' && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="icon" 
                                    variant="ghost"
                                  >
                                    <Truck className="h-4 w-4" />
                                    <span className="sr-only">شحن الطلب</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>شحن الطلب #{order.id}</DialogTitle>
                                    <DialogDescription>
                                      أدخل رقم التتبع وقم بتحديث حالة الطلب إلى "تم الشحن"
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="space-y-4 mt-4">
                                    <div>
                                      <Label htmlFor="tracking-number">رقم التتبع</Label>
                                      <Input 
                                        id="tracking-number"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        placeholder="أدخل رقم التتبع"
                                      />
                                    </div>
                                    
                                    <Button 
                                      className="w-full" 
                                      onClick={() => handleShipOrder(order.id)}
                                    >
                                      تأكيد الشحن
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        لا توجد طلبات تطابق معايير البحث
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

export default VendorOrders;
