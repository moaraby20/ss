
import React, { useState } from 'react';
import VendorLayout from '@/components/vendor/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserPlus, Users, ShoppingBag, Mail, Filter, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock clients data
const mockClients = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0123456789',
    totalOrders: 15,
    totalSpent: 4820,
    lastPurchase: '2025-04-20',
    status: 'active'
  },
  {
    id: 2,
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '0198765432',
    totalOrders: 8,
    totalSpent: 2150,
    lastPurchase: '2025-04-15',
    status: 'active'
  },
  {
    id: 3,
    name: 'محمود خالد',
    email: 'mahmoud@example.com',
    phone: '0112345678',
    totalOrders: 3,
    totalSpent: 750,
    lastPurchase: '2025-04-10',
    status: 'inactive'
  },
  {
    id: 4,
    name: 'نورا علي',
    email: 'noura@example.com',
    phone: '0165432198',
    totalOrders: 12,
    totalSpent: 3680,
    lastPurchase: '2025-04-18',
    status: 'active'
  },
  {
    id: 5,
    name: 'يوسف حسن',
    email: 'youssef@example.com',
    phone: '0101234567',
    totalOrders: 6,
    totalSpent: 1850,
    lastPurchase: '2025-04-05',
    status: 'active'
  }
];

const VendorClients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState(mockClients);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredClients(mockClients);
    } else {
      const filtered = mockClients.filter(client => 
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.email.toLowerCase().includes(query.toLowerCase()) ||
        client.phone.includes(query)
      );
      setFilteredClients(filtered);
    }
  };
  
  const filterByStatus = (status: string) => {
    if (status === 'all') {
      setFilteredClients(mockClients);
    } else {
      const filtered = mockClients.filter(client => client.status === status);
      setFilteredClients(filtered);
    }
  };

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">العملاء</h1>
            <p className="text-gray-500">إدارة وتحليل بيانات عملائك</p>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse mt-4 md:mt-0">
            <Button>
              <UserPlus className="ml-2 h-4 w-4" />
              إضافة عميل
            </Button>
          </div>
        </div>

        {/* Client Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockClients.length}</div>
              <p className="text-xs text-green-500 mt-1">+12% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">العملاء النشطين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockClients.filter(c => c.status === 'active').length}</div>
              <p className="text-xs text-gray-500 mt-1">{((mockClients.filter(c => c.status === 'active').length / mockClients.length) * 100).toFixed(0)}% من إجمالي العملاء</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">متوسط قيمة العميل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(mockClients.reduce((sum, c) => sum + c.totalSpent, 0) / mockClients.length).toFixed(0)} ج.م
              </div>
              <p className="text-xs text-green-500 mt-1">+5% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">عملاء جدد هذا الشهر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-green-500 mt-1">+20% عن الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <CardTitle>قائمة العملاء</CardTitle>
              <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="البحث عن عميل..." 
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pr-9 w-full md:w-60"
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="mr-2">
                      <Filter className="ml-2 h-4 w-4" />
                      تصفية
                      <ChevronDown className="mr-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => filterByStatus('all')}>
                      جميع العملاء
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => filterByStatus('active')}>
                      العملاء النشطين
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => filterByStatus('inactive')}>
                      العملاء غير النشطين
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العميل</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>الطلبات</TableHead>
                  <TableHead>إجمالي المشتريات</TableHead>
                  <TableHead>آخر طلب</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.totalOrders}</TableCell>
                    <TableCell>{client.totalSpent} ج.م</TableCell>
                    <TableCell>{new Date(client.lastPurchase).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>
                      {client.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">غير نشط</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorClients;
