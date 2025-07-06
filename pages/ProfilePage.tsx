
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم تحديث معلوماتك الشخصية بنجاح",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "كلمة المرور غير متطابقة",
        description: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تغيير كلمة المرور الخاصة بك بنجاح",
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
  };

  if (!isAuthenticated) {
    navigate('/login?redirect=profile');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">الملف الشخصي</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-wasla-light flex items-center justify-center text-wasla-primary text-3xl font-bold mb-4">
                    {user?.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
                  <p className="text-gray-500 mb-4">{user?.email}</p>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    تسجيل الخروج
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
                <TabsTrigger value="password">تغيير كلمة المرور</TabsTrigger>
                <TabsTrigger value="orders">طلباتي</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الشخصية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">الاسم الكامل</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            required
                            readOnly
                            className="bg-gray-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>

                      <Separator className="my-4" />
                      
                      <h3 className="font-semibold mb-2">عنوان التوصيل</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">العنوان</Label>
                          <Input 
                            id="address" 
                            name="address"
                            value={profileData.address}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">المدينة</Label>
                            <Input 
                              id="city" 
                              name="city"
                              value={profileData.city}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">المحافظة</Label>
                            <Input 
                              id="state" 
                              name="state"
                              value={profileData.state}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>تغيير كلمة المرور</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                        <Input 
                          id="currentPassword" 
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                        <Input 
                          id="newPassword" 
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={8}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                        <Input 
                          id="confirmPassword" 
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="mt-4">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>طلباتي</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild>
                      <a href="/orders">عرض كل الطلبات</a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
