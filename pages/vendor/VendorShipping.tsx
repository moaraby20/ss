
import React, { useState } from 'react';
import VendorLayout from '@/components/vendor/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Truck, 
  PackageOpen, 
  CheckCircle, 
  AlertCircle, 
  Clock
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Mock orders waiting for shipping
const pendingShipments = [
  {
    id: 'ORD123456',
    customer: 'أحمد محمد',
    date: '2025-04-20',
    total: 2500,
    items: 3,
    status: 'pending',
    address: 'شارع 10، المعادي، القاهرة',
    phone: '01234567890'
  },
  {
    id: 'ORD789012',
    customer: 'سارة أحمد',
    date: '2025-04-21',
    total: 1800,
    items: 2,
    status: 'processing',
    address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
    phone: '01098765432'
  },
  {
    id: 'ORD345678',
    customer: 'محمود خالد',
    date: '2025-04-21',
    total: 950,
    items: 1,
    status: 'pending',
    address: 'شارع الهرم، الجيزة',
    phone: '01156789012'
  },
  {
    id: 'ORD901234',
    customer: 'نورا علي',
    date: '2025-04-22',
    total: 3200,
    items: 4,
    status: 'processing',
    address: 'شارع 9، المقطم، القاهرة',
    phone: '01223456789'
  },
  {
    id: 'ORD567890',
    customer: 'يوسف حسن',
    date: '2025-04-22',
    total: 1500,
    items: 2,
    status: 'pending',
    address: 'شارع فيصل، الجيزة',
    phone: '01187654321'
  }
];

// Mock shipping companies
const shippingCompanies = [
  { value: 'aramex', label: 'أرامكس' },
  { value: 'fedex', label: 'فيديكس' },
  { value: 'dhl', label: 'دي إتش إل' },
  { value: 'bosta', label: 'بوسطة' },
  { value: 'mylerz', label: 'مايلرز' }
];

const VendorShipping = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showShipDialog, setShowShipDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedShippingCompany, setSelectedShippingCompany] = useState('');
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredOrders = pendingShipments.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && order.status === filterStatus;
  });
  
  const openShipDialog = (order) => {
    setSelectedOrder(order);
    setShowShipDialog(true);
  };
  
  const handleShipOrder = () => {
    // Here we would submit the shipping details to the backend
    // For now we'll just close the dialog
    setShowShipDialog(false);
    setSelectedShippingCompany('');
  };
  
  return (
    <VendorLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">إدارة الشحن</h1>
          <p className="text-gray-500">تجهيز وإدارة شحنات الطلبات</p>
        </div>

        {/* Shipping Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">بانتظار الشحن</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500 mr-2" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-gray-500">يجب تجهيزها اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">تم تجهيزها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PackageOpen className="h-8 w-8 text-blue-500 mr-2" />
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-gray-500">جاهزة للاستلام</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">قيد الشحن</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-purple-500 mr-2" />
                <div>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-gray-500">في الطريق للتسليم</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">تم التسليم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-gray-500">هذا الشهر</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders to Ship */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <CardTitle>الطلبات بانتظار الشحن</CardTitle>
                <CardDescription>إدارة الطلبات الجاهزة للشحن</CardDescription>
              </div>
              <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="البحث برقم الطلب أو اسم العميل..." 
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pr-9 w-full md:w-60"
                  />
                </div>
                
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-[180px] mr-2">
                    <SelectValue placeholder="تصفية حسب الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">بانتظار التجهيز</SelectItem>
                    <SelectItem value="processing">جاري التجهيز</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>القيمة</TableHead>
                  <TableHead>العناصر</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>{order.total} ج.م</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>
                      {order.status === 'pending' ? (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">بانتظار التجهيز</Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">جاري التجهيز</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openShipDialog(order)}
                      >
                        <Truck className="ml-2 h-4 w-4" />
                        شحن
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <AlertCircle className="mx-auto h-8 w-8 text-gray-300 mb-3" />
                      <p className="text-gray-500">لا توجد طلبات بانتظار الشحن</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Shipping Dialog */}
      <Dialog open={showShipDialog} onOpenChange={setShowShipDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>شحن الطلب #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              أدخل بيانات الشحن لإرسال الطلب للعميل
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="customer">العميل</Label>
                <Input id="customer" value={selectedOrder?.customer} readOnly />
              </div>
              
              <div>
                <Label htmlFor="address">عنوان التسليم</Label>
                <Input id="address" value={selectedOrder?.address} readOnly />
              </div>
              
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" value={selectedOrder?.phone} readOnly />
              </div>
              
              <div>
                <Label htmlFor="shipping">شركة الشحن</Label>
                <Select
                  value={selectedShippingCompany}
                  onValueChange={setSelectedShippingCompany}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر شركة الشحن" />
                  </SelectTrigger>
                  <SelectContent>
                    {shippingCompanies.map((company) => (
                      <SelectItem key={company.value} value={company.value}>
                        {company.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="trackingId">رقم التتبع (اختياري)</Label>
                <Input id="trackingId" placeholder="أدخل رقم التتبع إذا كان متوفرًا" />
              </div>
              
              <div>
                <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                <Input id="notes" placeholder="أدخل أي ملاحظات إضافية للسائق" />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShipDialog(false)}>
              إلغاء
            </Button>
            <Button 
              onClick={handleShipOrder}
              disabled={!selectedShippingCompany}
            >
              تأكيد الشحن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorShipping;
