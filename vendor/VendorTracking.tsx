
import React, { useState } from 'react';
import VendorLayout from '@/components/vendor/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Package, 
  MapPin, 
  Truck, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock shipment tracking data
const shipmentsData = [
  {
    id: 'TRK123456',
    orderId: 'ORD123456',
    customer: 'أحمد محمد',
    shippingCompany: 'أرامكس',
    trackingNumber: 'AR789012345',
    status: 'delivered',
    shippedDate: '2025-04-18',
    estimatedDelivery: '2025-04-20',
    deliveredDate: '2025-04-20',
    address: 'شارع 10، المعادي، القاهرة',
    updates: [
      { date: '2025-04-18 09:15', status: 'تم استلام الطلب من البائع', location: 'مستودع وصلة، القاهرة' },
      { date: '2025-04-18 14:30', status: 'تم شحن الطلب', location: 'مركز الشحن، القاهرة' },
      { date: '2025-04-19 10:45', status: 'الطلب في الطريق للتسليم', location: 'المعادي، القاهرة' },
      { date: '2025-04-20 14:20', status: 'تم تسليم الطلب', location: 'المعادي، القاهرة' },
    ]
  },
  {
    id: 'TRK789012',
    orderId: 'ORD789012',
    customer: 'سارة أحمد',
    shippingCompany: 'فيديكس',
    trackingNumber: 'FX456789012',
    status: 'in_transit',
    shippedDate: '2025-04-21',
    estimatedDelivery: '2025-04-23',
    deliveredDate: null,
    address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
    updates: [
      { date: '2025-04-21 11:30', status: 'تم استلام الطلب من البائع', location: 'مستودع وصلة، القاهرة' },
      { date: '2025-04-21 16:45', status: 'تم شحن الطلب', location: 'مركز الشحن، القاهرة' },
      { date: '2025-04-22 09:20', status: 'الطلب في الطريق للتسليم', location: 'مدينة نصر، القاهرة' },
    ]
  },
  {
    id: 'TRK345678',
    orderId: 'ORD345678',
    customer: 'محمود خالد',
    shippingCompany: 'بوسطة',
    trackingNumber: 'BS234567890',
    status: 'pending',
    shippedDate: '2025-04-22',
    estimatedDelivery: '2025-04-24',
    deliveredDate: null,
    address: 'شارع الهرم، الجيزة',
    updates: [
      { date: '2025-04-22 10:15', status: 'تم استلام الطلب من البائع', location: 'مستودع وصلة، القاهرة' },
    ]
  },
  {
    id: 'TRK901234',
    orderId: 'ORD901234',
    customer: 'نورا علي',
    shippingCompany: 'دي إتش إل',
    trackingNumber: 'DHL12345678',
    status: 'out_for_delivery',
    shippedDate: '2025-04-20',
    estimatedDelivery: '2025-04-22',
    deliveredDate: null,
    address: 'شارع 9، المقطم، القاهرة',
    updates: [
      { date: '2025-04-20 08:30', status: 'تم استلام الطلب من البائع', location: 'مستودع وصلة، القاهرة' },
      { date: '2025-04-20 13:45', status: 'تم شحن الطلب', location: 'مركز الشحن، القاهرة' },
      { date: '2025-04-21 09:15', status: 'الطلب في الطريق للتسليم', location: 'القاهرة' },
      { date: '2025-04-22 08:20', status: 'الطلب خرج للتسليم', location: 'المقطم، القاهرة' },
    ]
  },
  {
    id: 'TRK567890',
    orderId: 'ORD567890',
    customer: 'يوسف حسن',
    shippingCompany: 'أرامكس',
    trackingNumber: 'AR123456789',
    status: 'delivered',
    shippedDate: '2025-04-15',
    estimatedDelivery: '2025-04-17',
    deliveredDate: '2025-04-17',
    address: 'شارع فيصل، الجيزة',
    updates: [
      { date: '2025-04-15 10:30', status: 'تم استلام الطلب من البائع', location: 'مستودع وصلة، القاهرة' },
      { date: '2025-04-15 15:45', status: 'تم شحن الطلب', location: 'مركز الشحن، القاهرة' },
      { date: '2025-04-16 11:20', status: 'الطلب في الطريق للتسليم', location: 'الجيزة' },
      { date: '2025-04-17 13:10', status: 'تم تسليم الطلب', location: 'فيصل، الجيزة' },
    ]
  }
];

const VendorTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showTrackingDialog, setShowTrackingDialog] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const viewTracking = (shipment) => {
    setSelectedShipment(shipment);
    setShowTrackingDialog(true);
  };
  
  // Filter shipments based on search and tab
  const filteredShipments = shipmentsData.filter(shipment => {
    const matchesSearch = 
      shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || 
      shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && shipment.status === activeTab;
  });

  // Count shipments by status
  const countByStatus = {
    all: shipmentsData.length,
    pending: shipmentsData.filter(s => s.status === 'pending').length,
    in_transit: shipmentsData.filter(s => s.status === 'in_transit').length,
    out_for_delivery: shipmentsData.filter(s => s.status === 'out_for_delivery').length,
    delivered: shipmentsData.filter(s => s.status === 'delivered').length,
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">بانتظار الشحن</Badge>;
      case 'in_transit':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">في الطريق</Badge>;
      case 'out_for_delivery':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">خرج للتسليم</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">تم التسليم</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">تتبع الشحنات</h1>
          <p className="text-gray-500">تتبع حالة الطلبات المشحونة</p>
        </div>

        {/* Shipping Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">بانتظار الشحن</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Package className="h-8 w-8 text-yellow-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{countByStatus.pending}</div>
                  <p className="text-xs text-gray-500">طلبات</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">في الطريق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-blue-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{countByStatus.in_transit}</div>
                  <p className="text-xs text-gray-500">طلبات</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">خرج للتسليم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-purple-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{countByStatus.out_for_delivery}</div>
                  <p className="text-xs text-gray-500">طلبات</p>
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
                <CheckCircle className="h-8 w-8 text-green-500 ml-2" />
                <div>
                  <div className="text-2xl font-bold">{countByStatus.delivered}</div>
                  <p className="text-xs text-gray-500">طلبات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipments Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <CardTitle>سجل الشحنات</CardTitle>
                <CardDescription>تتبع شحنات الطلبات وحالتها</CardDescription>
              </div>
              <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="البحث برقم الطلب أو رقم التتبع..." 
                    className="pr-9 w-full md:w-80"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
            
            {/* Tabs for filtering */}
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList>
                <TabsTrigger value="all">الكل ({countByStatus.all})</TabsTrigger>
                <TabsTrigger value="pending">بانتظار الشحن ({countByStatus.pending})</TabsTrigger>
                <TabsTrigger value="in_transit">في الطريق ({countByStatus.in_transit})</TabsTrigger>
                <TabsTrigger value="out_for_delivery">خرج للتسليم ({countByStatus.out_for_delivery})</TabsTrigger>
                <TabsTrigger value="delivered">تم التسليم ({countByStatus.delivered})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الشحنة</TableHead>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>شركة الشحن</TableHead>
                  <TableHead>رقم التتبع</TableHead>
                  <TableHead>تاريخ الشحن</TableHead>
                  <TableHead>موعد التسليم</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التتبع</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.orderId}</TableCell>
                    <TableCell>{shipment.customer}</TableCell>
                    <TableCell>{shipment.shippingCompany}</TableCell>
                    <TableCell>{shipment.trackingNumber}</TableCell>
                    <TableCell>{new Date(shipment.shippedDate).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>{new Date(shipment.estimatedDelivery).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>
                      {getStatusBadge(shipment.status)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => viewTracking(shipment)}
                      >
                        <MapPin className="ml-2 h-4 w-4" />
                        تتبع
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredShipments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <AlertCircle className="mx-auto h-8 w-8 text-gray-300 mb-3" />
                      <p className="text-gray-500">لا توجد شحنات مطابقة للبحث</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Dialog */}
      <Dialog open={showTrackingDialog} onOpenChange={setShowTrackingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تتبع الشحنة {selectedShipment?.id}</DialogTitle>
            <DialogDescription>
              متابعة حالة الشحنة والتحديثات
            </DialogDescription>
          </DialogHeader>
          
          {selectedShipment && (
            <div className="space-y-4 py-2">
              {/* Shipment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">رقم الطلب</p>
                  <p className="font-semibold">{selectedShipment.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">العميل</p>
                  <p className="font-semibold">{selectedShipment.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">شركة الشحن</p>
                  <p className="font-semibold">{selectedShipment.shippingCompany}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">رقم التتبع</p>
                  <p className="font-semibold">{selectedShipment.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">عنوان التسليم</p>
                  <p className="font-semibold">{selectedShipment.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الحالة</p>
                  <p>{getStatusBadge(selectedShipment.status)}</p>
                </div>
              </div>
              
              {/* Tracking Timeline */}
              <div>
                <h3 className="font-semibold text-lg mb-4">مسار الشحنة</h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute top-0 bottom-0 right-[15px] w-0.5 bg-gray-200"></div>
                  
                  {/* Timeline items */}
                  <div className="space-y-6">
                    {selectedShipment.updates.map((update, index) => (
                      <div key={index} className="relative pr-8">
                        {/* Status dot */}
                        <div className={`absolute right-0 w-[30px] h-[30px] rounded-full flex items-center justify-center ${index === 0 ? 'bg-primary text-white' : 'bg-gray-100 border-2 border-gray-200'}`}>
                          {index === selectedShipment.updates.length - 1 && selectedShipment.status === 'delivered' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-current"></span>
                          )}
                        </div>
                        
                        {/* Status content */}
                        <div className="bg-white p-3 border rounded-lg shadow-sm">
                          <p className="font-medium">{update.status}</p>
                          <div className="flex justify-between mt-1 text-sm text-gray-500">
                            <span>{update.location}</span>
                            <span>{update.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Estimated delivery */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">تاريخ التسليم المقدر</p>
                <p className="font-semibold">
                  {selectedShipment.deliveredDate ? 
                    `تم التسليم في ${new Date(selectedShipment.deliveredDate).toLocaleDateString('ar-EG')}` : 
                    new Date(selectedShipment.estimatedDelivery).toLocaleDateString('ar-EG')
                  }
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorTracking;
