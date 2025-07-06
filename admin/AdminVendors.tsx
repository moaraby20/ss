
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Store, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Edit, 
  Trash2, 
  Mail, 
  Eye, 
  Lock,
  ShoppingBag,
  FileText,
  Settings
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock vendors data
const vendorsData = [
  {
    id: 1,
    name: 'مزارع الدلتا للمعدات',
    owner: 'محمود خالد',
    email: 'info@delta-farms.com',
    phone: '0123456789',
    joinDate: '2025-01-15',
    status: 'active',
    products: 48,
    orders: 382,
    revenue: 45800,
    rating: 4.8,
    verified: true,
    categories: ['معدات المزارع السمكية', 'معدات الري']
  },
  {
    id: 2,
    name: 'معدات الزراعة الحديثة',
    owner: 'سارة أحمد',
    email: 'info@modern-agri.com',
    phone: '0198765432',
    joinDate: '2025-02-20',
    status: 'active',
    products: 32,
    orders: 271,
    revenue: 38500,
    rating: 4.5,
    verified: true,
    categories: ['المعدات الزراعية', 'البذور والشتلات', 'الأسمدة']
  },
  {
    id: 3,
    name: 'مزارع النيل للأسماك',
    owner: 'أحمد محمد',
    email: 'info@nile-farms.com',
    phone: '0112345678',
    joinDate: '2025-03-05',
    status: 'active',
    products: 27,
    orders: 245,
    revenue: 32400,
    rating: 4.7,
    verified: true,
    categories: ['معدات المزارع السمكية', 'أعلاف']
  },
  {
    id: 4,
    name: 'الشركة المصرية للأعلاف',
    owner: 'نورا علي',
    email: 'info@egyptian-feeds.com',
    phone: '0165432198',
    joinDate: '2024-11-10',
    status: 'active',
    products: 18,
    orders: 314,
    revenue: 28700,
    rating: 4.3,
    verified: true,
    categories: ['أعلاف']
  },
  {
    id: 5,
    name: 'المستلزمات الزراعية المتطورة',
    owner: 'يوسف حسن',
    email: 'info@advanced-agri.com',
    phone: '0101234567',
    joinDate: '2025-04-01',
    status: 'pending',
    products: 0,
    orders: 0,
    revenue: 0,
    rating: 0,
    verified: false,
    categories: ['المعدات الزراعية', 'معدات الري']
  }
];

const AdminVendors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorDialog, setShowVendorDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  
  // Filter vendors based on search and tab
  const filteredVendors = vendorsData.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vendor.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && vendor.status === activeTab;
  });
  
  // Count vendors by status
  const countByStatus = {
    all: vendorsData.length,
    active: vendorsData.filter(v => v.status === 'active').length,
    pending: vendorsData.filter(v => v.status === 'pending').length,
    suspended: vendorsData.filter(v => v.status === 'suspended').length,
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const editVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorDialog(true);
  };
  
  const reviewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowReviewDialog(true);
  };
  
  const handleSaveVendor = () => {
    // We would save the vendor here
    setShowVendorDialog(false);
  };
  
  const handleApproveVendor = () => {
    // We would approve the vendor here
    setShowReviewDialog(false);
  };
  
  const handleRejectVendor = () => {
    // We would reject the vendor here
    setShowReviewDialog(false);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString('ar-EG') + ' ج.م';
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">إدارة البائعين</h1>
          <p className="text-gray-500">إدارة متاجر البائعين وطلبات الانضمام</p>
        </div>

        {/* Vendor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي البائعين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Store className="h-8 w-8 text-blue-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{vendorsData.length}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    بائعين نشطين: {countByStatus.active}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">طلبات الانضمام الجديدة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-yellow-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{countByStatus.pending}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    تحتاج إلى مراجعة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">متوسط عمولة البائع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-green-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(vendorsData.reduce((sum, v) => sum + v.revenue, 0) / countByStatus.active)}
                  </div>
                  <p className="text-xs text-green-500 mt-1">
                    +12% عن الشهر الماضي
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vendors Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <CardTitle>قائمة البائعين</CardTitle>
                <CardDescription>إدارة متاجر البائعين المسجلين في المنصة</CardDescription>
              </div>
              
              <div className="relative mt-4 md:mt-0 w-full md:w-auto">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="البحث عن بائع..." 
                  className="pr-9 w-full md:w-60"
                  value={searchQuery}
                  onChange={handleSearch}
                />
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
                <TabsTrigger value="active">نشط ({countByStatus.active})</TabsTrigger>
                <TabsTrigger value="pending">بانتظار الموافقة ({countByStatus.pending})</TabsTrigger>
                <TabsTrigger value="suspended">معلق ({countByStatus.suspended || 0})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المتجر</TableHead>
                  <TableHead>تاريخ الانضمام</TableHead>
                  <TableHead>المنتجات</TableHead>
                  <TableHead>الطلبات</TableHead>
                  <TableHead>الإيرادات</TableHead>
                  <TableHead>التقييم</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.owner}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vendor.status === 'pending' ? 
                        'بانتظار الموافقة' : 
                        new Date(vendor.joinDate).toLocaleDateString('ar-EG')
                      }
                    </TableCell>
                    <TableCell>{vendor.products}</TableCell>
                    <TableCell>{vendor.orders}</TableCell>
                    <TableCell>{formatCurrency(vendor.revenue)}</TableCell>
                    <TableCell>
                      {vendor.rating > 0 ? (
                        <div className="flex items-center">
                          <span className="font-medium ml-1">{vendor.rating}</span>
                          <div className="text-yellow-400">★</div>
                        </div>
                      ) : '—'}
                    </TableCell>
                    <TableCell>
                      {vendor.status === 'active' && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>
                      )}
                      {vendor.status === 'pending' && (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">بانتظار الموافقة</Badge>
                      )}
                      {vendor.status === 'suspended' && (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">معلق</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            الإجراءات
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {vendor.status === 'pending' ? (
                            <DropdownMenuItem onClick={() => reviewVendor(vendor)}>
                              <CheckCircle size={16} className="ml-2" />
                              مراجعة الطلب
                            </DropdownMenuItem>
                          ) : (
                            <>
                              <DropdownMenuItem onClick={() => editVendor(vendor)}>
                                <Edit size={16} className="ml-2" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye size={16} className="ml-2" />
                                عرض المتجر
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingBag size={16} className="ml-2" />
                                المنتجات
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText size={16} className="ml-2" />
                                الطلبات
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail size={16} className="ml-2" />
                                إرسال بريد
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-yellow-600">
                                <Lock size={16} className="ml-2" />
                                {vendor.status === 'suspended' ? 'إلغاء التعليق' : 'تعليق المتجر'}
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 size={16} className="ml-2" />
                            حذف المتجر
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredVendors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Store className="mx-auto h-8 w-8 text-gray-300 mb-3" />
                      <p className="text-gray-500">لا يوجد بائعين مطابقين للبحث</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Vendor Dialog */}
      <Dialog open={showVendorDialog} onOpenChange={setShowVendorDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بيانات المتجر</DialogTitle>
            <DialogDescription>
              تعديل معلومات متجر {selectedVendor?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="storeName">اسم المتجر</Label>
                <Input id="storeName" defaultValue={selectedVendor?.name || ''} />
              </div>
              
              <div>
                <Label htmlFor="ownerName">اسم المالك</Label>
                <Input id="ownerName" defaultValue={selectedVendor?.owner || ''} />
              </div>
              
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" defaultValue={selectedVendor?.email || ''} />
              </div>
              
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" defaultValue={selectedVendor?.phone || ''} />
              </div>
              
              <div>
                <Label htmlFor="status">حالة المتجر</Label>
                <Select defaultValue={selectedVendor?.status || 'active'}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="suspended">معلق</SelectItem>
                    <SelectItem value="pending">بانتظار الموافقة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="verified" 
                  defaultChecked={selectedVendor?.verified || false} 
                />
                <Label htmlFor="verified">متجر موثق</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVendorDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveVendor}>
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Vendor Application Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>مراجعة طلب الانضمام</DialogTitle>
            <DialogDescription>
              مراجعة طلب انضمام {selectedVendor?.name} كبائع على المنصة
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-6 py-2">
              {/* Vendor Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">معلومات المتجر</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">اسم المتجر</p>
                    <p className="font-semibold">{selectedVendor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">اسم المالك</p>
                    <p className="font-semibold">{selectedVendor.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-semibold">{selectedVendor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">رقم الهاتف</p>
                    <p className="font-semibold">{selectedVendor.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">تاريخ تقديم الطلب</p>
                    <p className="font-semibold">{new Date().toLocaleDateString('ar-EG')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">فئات المنتجات</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedVendor.categories.map((category, index) => (
                        <Badge key={index} className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Store Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">وصف المتجر</h3>
                <p className="text-gray-700">
                  نحن متخصصون في توفير أحدث معدات الزراعة والري والمزارع السمكية بأفضل جودة وأسعار منافسة. نمتلك خبرة أكثر من 10 سنوات في مجال المعدات الزراعية ونسعى لتقديم منتجات عالية الجودة مع خدمة ما بعد البيع متميزة.
                </p>
              </div>
              
              {/* Documents */}
              <div>
                <h3 className="font-semibold text-lg mb-2">المستندات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-3">
                    <p className="font-medium">السجل التجاري</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">commercial-registry.pdf</p>
                      <Button size="sm" variant="outline">عرض</Button>
                    </div>
                  </div>
                  <div className="border rounded p-3">
                    <p className="font-medium">البطاقة الضريبية</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">tax-card.pdf</p>
                      <Button size="sm" variant="outline">عرض</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Admin Notes */}
              <div>
                <Label htmlFor="notes">ملاحظات المراجعة</Label>
                <Input id="notes" placeholder="أضف ملاحظاتك هنا..." />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="destructive" onClick={handleRejectVendor}>
                <XCircle className="ml-2 h-4 w-4" />
                رفض الطلب
              </Button>
              
              <div className="space-x-2 space-x-reverse">
                <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
                  تأجيل
                </Button>
                <Button onClick={handleApproveVendor}>
                  <CheckCircle className="ml-2 h-4 w-4" />
                  الموافقة على الطلب
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminVendors;
