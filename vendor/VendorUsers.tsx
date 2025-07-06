
import React, { useState } from 'react';
import VendorLayout from '@/components/vendor/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  UserPlus, 
  Users, 
  Edit, 
  Trash2, 
  Mail, 
  Lock 
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Mock team members data
const teamMembers = [
  {
    id: 1,
    name: 'محمد أحمد',
    email: 'mohamed@example.com',
    role: 'admin',
    permissions: ['orders', 'products', 'shipping', 'messaging', 'finances', 'settings'],
    status: 'active',
    lastActive: '2025-04-25',
  },
  {
    id: 2,
    name: 'سارة خالد',
    email: 'sara@example.com',
    role: 'manager',
    permissions: ['orders', 'products', 'shipping', 'messaging'],
    status: 'active',
    lastActive: '2025-04-24',
  },
  {
    id: 3,
    name: 'أحمد محمود',
    email: 'ahmed@example.com',
    role: 'support',
    permissions: ['messaging', 'orders'],
    status: 'active',
    lastActive: '2025-04-23',
  },
  {
    id: 4,
    name: 'فاطمة علي',
    email: 'fatma@example.com',
    role: 'inventory',
    permissions: ['products', 'shipping'],
    status: 'inactive',
    lastActive: '2025-04-10',
  }
];

// Available roles
const roles = [
  { value: 'admin', label: 'مدير (جميع الصلاحيات)', description: 'يمكنه إدارة كافة جوانب المتجر' },
  { value: 'manager', label: 'مشرف', description: 'يمكنه إدارة الطلبات والمنتجات والشحن' },
  { value: 'support', label: 'دعم فني', description: 'يمكنه الرد على رسائل العملاء وإدارة الطلبات' },
  { value: 'inventory', label: 'مسؤول مخزون', description: 'يمكنه إدارة المنتجات والمخزون' },
];

// Available permissions
const permissions = [
  { id: 'orders', label: 'إدارة الطلبات' },
  { id: 'products', label: 'إدارة المنتجات' },
  { id: 'shipping', label: 'إدارة الشحن' },
  { id: 'messaging', label: 'التواصل مع العملاء' },
  { id: 'finances', label: 'إدارة المالية' },
  { id: 'settings', label: 'إعدادات المتجر' },
];

const VendorUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userPermissions, setUserPermissions] = useState([]);
  
  const filteredUsers = teamMembers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const openAddUserDialog = () => {
    setSelectedUser(null);
    setUserRole('');
    setUserPermissions([]);
    setShowAddUserDialog(true);
  };
  
  const editUser = (user) => {
    setSelectedUser(user);
    setUserRole(user.role);
    setUserPermissions(user.permissions);
    setShowAddUserDialog(true);
  };
  
  const togglePermission = (permission) => {
    if (userPermissions.includes(permission)) {
      setUserPermissions(userPermissions.filter(p => p !== permission));
    } else {
      setUserPermissions([...userPermissions, permission]);
    }
  };
  
  const handleRoleChange = (role) => {
    setUserRole(role);
    
    // Set default permissions based on role
    switch(role) {
      case 'admin':
        setUserPermissions(permissions.map(p => p.id));
        break;
      case 'manager':
        setUserPermissions(['orders', 'products', 'shipping', 'messaging']);
        break;
      case 'support':
        setUserPermissions(['messaging', 'orders']);
        break;
      case 'inventory':
        setUserPermissions(['products', 'shipping']);
        break;
      default:
        setUserPermissions([]);
    }
  };
  
  const handleSaveUser = () => {
    // We would save the user here
    setShowAddUserDialog(false);
  };

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">إدارة فريق العمل</h1>
            <p className="text-gray-500">إدارة أعضاء فريق العمل وصلاحياتهم</p>
          </div>
          
          <Button onClick={openAddUserDialog} className="mt-4 md:mt-0">
            <UserPlus className="ml-2 h-4 w-4" />
            إضافة عضو جديد
          </Button>
        </div>

        {/* Team Members Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي أعضاء الفريق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500 ml-3" />
                <div>
                  <div className="text-2xl font-bold">{teamMembers.length}</div>
                  <p className="text-xs text-gray-500 mt-1">أعضاء نشطين: {teamMembers.filter(m => m.status === 'active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">حسب الدور</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>مديرين</span>
                  <span className="font-semibold">{teamMembers.filter(m => m.role === 'admin').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>مشرفين</span>
                  <span className="font-semibold">{teamMembers.filter(m => m.role === 'manager').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>دعم فني</span>
                  <span className="font-semibold">{teamMembers.filter(m => m.role === 'support').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>مسؤولي مخزون</span>
                  <span className="font-semibold">{teamMembers.filter(m => m.role === 'inventory').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">الصلاحيات الممنوحة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {permissions.map((permission) => {
                  const count = teamMembers.filter(m => m.permissions.includes(permission.id)).length;
                  return (
                    <Badge key={permission.id} className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                      {permission.label}: {count}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <CardTitle>أعضاء الفريق</CardTitle>
                <CardDescription>إدارة أعضاء فريق العمل وأدوارهم</CardDescription>
              </div>
              
              <div className="relative mt-4 md:mt-0 w-full md:w-auto">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="البحث عن عضو..." 
                  className="pr-9 w-full md:w-60"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العضو</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>الصلاحيات</TableHead>
                  <TableHead>آخر نشاط</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === 'admin' && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">مدير</Badge>}
                      {user.role === 'manager' && <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">مشرف</Badge>}
                      {user.role === 'support' && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">دعم فني</Badge>}
                      {user.role === 'inventory' && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">مسؤول مخزون</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.map(permission => (
                          <Badge 
                            key={permission} 
                            variant="outline" 
                            className="bg-gray-50 text-gray-800 text-xs"
                          >
                            {permissions.find(p => p.id === permission)?.label}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>
                      {user.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">غير نشط</Badge>
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
                          <DropdownMenuItem onClick={() => editUser(user)}>
                            <Edit size={16} className="ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail size={16} className="ml-2" />
                            إرسال بريد
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Lock size={16} className="ml-2" />
                            إعادة تعيين كلمة المرور
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 size={16} className="ml-2" />
                            حذف العضو
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Users className="mx-auto h-8 w-8 text-gray-300 mb-3" />
                      <p className="text-gray-500">لا يوجد أعضاء مطابقين للبحث</p>
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
            <DialogTitle>{selectedUser ? 'تعديل عضو الفريق' : 'إضافة عضو جديد للفريق'}</DialogTitle>
            <DialogDescription>
              {selectedUser ? 'قم بتعديل بيانات العضو وصلاحياته' : 'أدخل بيانات العضو الجديد وحدد صلاحياته'}
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
                <Label htmlFor="role">الدور</Label>
                <Select 
                  value={userRole} 
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <div>{role.label}</div>
                          <div className="text-xs text-gray-500">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block">الصلاحيات</Label>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox 
                        id={permission.id} 
                        checked={userPermissions.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                      <Label htmlFor={permission.id}>{permission.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="status" defaultChecked={selectedUser?.status === 'active'} />
                <Label htmlFor="status">حساب نشط</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveUser}>
              {selectedUser ? 'حفظ التغييرات' : 'إضافة عضو'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorUsers;
