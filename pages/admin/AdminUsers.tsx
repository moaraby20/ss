
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  ChevronDown,
  Edit,
  Trash2,
  Mail,
  Lock,
  CheckCircle,
  XCircle
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'customer',
    joined: '2025-01-15',
    lastActive: '2025-04-23',
    orders: 15,
    status: 'active',
    verified: true
  },
  {
    id: 2,
    name: 'سارة أحمد',
    email: 'sara@example.com',
    role: 'customer',
    joined: '2025-02-20',
    lastActive: '2025-04-25',
    orders: 8,
    status: 'active',
    verified: true
  },
  {
    id: 3,
    name: 'محمود خالد',
    email: 'mahmoud@example.com',
    role: 'vendor',
    joined: '2024-11-10',
    lastActive: '2025-04-24',
    orders: 0,
    status: 'active',
    verified: true
  },
  {
    id: 4,
    name: 'نورا علي',
    email: 'noura@example.com',
    role: 'customer',
    joined: '2025-03-05',
    lastActive: '2025-04-20',
    orders: 12,
    status: 'suspended',
    verified: true
  },
  {
    id: 5,
    name: 'يوسف حسن',
    email: 'youssef@example.com',
    role: 'vendor',
    joined: '2025-01-30',
    lastActive: '2025-04-22',
    orders: 0,
    status: 'pending',
    verified: false
  },
  {
    id: 6,
    name: 'هبة أحمد',
    email: 'heba@example.com',
    role: 'customer',
    joined: '2025-04-01',
    lastActive: '2025-04-15',
    orders: 3,
    status: 'active',
    verified: true
  },
  {
    id: 7,
    name: 'كريم محمد',
    email: 'kareem@example.com',
    role: 'admin',
    joined: '2024-10-15',
    lastActive: '2025-04-25',
    orders: 0,
    status: 'active',
    verified: true
  }
];

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Filter users based on search, role, status, and tab
  const filteredUsers = mockUsers.filter(user => {
    // Search filter
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Role filter
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    // Tab filter
    let matchesTab = true;
    if (selectedTab === 'customers') {
      matchesTab = user.role === 'customer';
    } else if (selectedTab === 'vendors') {
      matchesTab = user.role === 'vendor';
    } else if (selectedTab === 'admins') {
      matchesTab = user.role === 'admin';
    } else if (selectedTab === 'pending') {
      matchesTab = user.status === 'pending';
    } else if (selectedTab === 'suspended') {
      matchesTab = user.status === 'suspended';
    }
    
    return matchesSearch && matchesRole && matchesStatus && matchesTab;
  });
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const addNewUser = () => {
    setShowAddUserDialog(true);
    setSelectedUser(null);
  };
  
  const editUser = (user) => {
    setSelectedUser(user);
    setShowAddUserDialog(true);
  };
  
  const handleSaveUser = () => {
    // We would save the user here
    setShowAddUserDialog(false);
  };
  
  // Statistics
  const totalUsers = mockUsers.length;
  const customers = mockUsers.filter(u => u.role === 'customer').length;
  const vendors = mockUsers.filter(u => u.role === 'vendor').length;
  const admins = mockUsers.filter(u => u.role === 'admin').length;
  const pendingUsers = mockUsers.filter(u => u.status === 'pending').length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const suspendedUsers = mockUsers.filter(u => u.status === 'suspended').length;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
            <p className="text-gray-500">إدارة حسابات المستخدمين على المنصة</p>
          </div>
          
          <Button onClick={addNewUser} className="mt-4 md:mt-0">
            <UserPlus className="ml-2 h-4 w-4" />
            إضافة مستخدم جديد
          </Button>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي المستخدمين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <p className="text-xs text-green-500 mt-1">+8 مستخدمين جدد هذا الأسبوع</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{customers}</div>
                  <p className="text-xs text-gray-500 mt-1">{((customers / totalUsers) * 100).toFixed(0)}% من إجمالي المستخدمين</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">البائعين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{vendors}</div>
                  <p className="text-xs text-gray-500 mt-1">{((vendors / totalUsers) * 100).toFixed(0)}% من إجمالي المستخدمين</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">المستخدمين بانتظار الموافقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-yellow-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{pendingUsers}</div>
                  <p className="text-xs text-gray-500 mt-1">يحتاجون إلى موافقة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table with Tabs */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>قائمة المستخدمين</CardTitle>
              <CardDescription>إدارة جميع المستخدمين المسجلين في النظام</CardDescription>
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4">
              <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="all">الكل ({totalUsers})</TabsTrigger>
                  <TabsTrigger value="customers">العملاء ({customers})</TabsTrigger>
                  <TabsTrigger value="vendors">البائعين ({vendors})</TabsTrigger>
                  <TabsTrigger value="admins">المديرين ({admins})</TabsTrigger>
                  <TabsTrigger value="pending">بانتظار الموافقة ({pendingUsers})</TabsTrigger>
                  <TabsTrigger value="suspended">معلقين ({suspendedUsers})</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="البحث عن مستخدم..." 
                    className="pr-9 w-full md:w-60"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>نوع الحساب</TableHead>
                  <TableHead>تاريخ الانضمام</TableHead>
                  <TableHead>آخر نشاط</TableHead>
                  <TableHead>الطلبات</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === 'customer' && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">عميل</Badge>}
                      {user.role === 'vendor' && <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">بائع</Badge>}
                      {user.role === 'admin' && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">مدير</Badge>}
                    </TableCell>
                    <TableCell>{new Date(user.joined).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>
                      {user.status === 'active' && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>}
                      {user.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">بانتظار الموافقة</Badge>}
                      {user.status === 'suspended' && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">معلق</Badge>}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => editUser(user)}>
                            <Edit size={16} className="ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail size={16} className="ml-2" />
                            إرسال بريد
                          </DropdownMenuItem>
                          {user.status === 'pending' && (
                            <DropdownMenuItem>
                              <CheckCircle size={16} className="ml-2" />
                              الموافقة
                            </DropdownMenuItem>
                          )}
                          {user.status === 'active' && (
                            <DropdownMenuItem>
                              <Lock size={16} className="ml-2" />
                              تعليق الحساب
                            </DropdownMenuItem>
                          )}
                          {user.status === 'suspended' && (
                            <DropdownMenuItem>
                              <CheckCircle size={16} className="ml-2" />
                              إلغاء التعليق
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 size={16} className="ml-2" />
                            حذف الحساب
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Users className="mx-auto h-8 w-8 text-gray-300 mb-3" />
                      <p className="text-gray-500">لا توجد نتائج مطابقة للبحث</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد'}</DialogTitle>
            <DialogDescription>
              {selectedUser ? 'قم بتعديل بيانات المستخدم' : 'أدخل بيانات المستخدم الجديد'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">الاسم</Label>
                <Input id="name" defaultValue={selectedUser?.name || ''} />
              </div>
              
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" defaultValue={selectedUser?.email || ''} />
              </div>
              
              {!selectedUser && (
                <div>
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input id="password" type="password" />
                </div>
              )}
              
              <div>
                <Label htmlFor="role">نوع الحساب</Label>
                <Select defaultValue={selectedUser?.role || 'customer'}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">عميل</SelectItem>
                    <SelectItem value="vendor">بائع</SelectItem>
                    <SelectItem value="admin">مدير</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">الحالة</Label>
                <Select defaultValue={selectedUser?.status || 'active'}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="pending">بانتظار الموافقة</SelectItem>
                    <SelectItem value="suspended">معلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="verified" 
                  defaultChecked={selectedUser?.verified || false} 
                />
                <Label htmlFor="verified">حساب مفعل</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveUser}>
              {selectedUser ? 'حفظ التغييرات' : 'إضافة المستخدم'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
