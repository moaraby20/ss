
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's a redirect parameter in the URL
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "أهلاً بك في وصلة!",
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى التحقق من بريدك الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Direct access buttons */}
              <div className="flex flex-col space-y-3 mb-6">
                <h3 className="text-center font-medium">الدخول المباشر للوحات التحكم</h3>
                <div className="flex space-x-4 space-x-reverse justify-center">
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex-1"
                  >
                    لوحة تحكم المسؤول
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/vendor/dashboard')}
                    className="flex-1"
                  >
                    لوحة تحكم البائع
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="أدخل بريدك الإلكتروني" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Link to="/forgot-password" className="text-sm text-wasla-primary hover:underline">
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500">
                ليس لديك حساب؟{' '}
                <Link to="/register" className="text-wasla-primary hover:underline">
                  إنشاء حساب جديد
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          {/* Vendor Call to Action */}
          <div className="mt-8 bg-wasla-light p-6 rounded-lg text-center">
            <h3 className="text-lg font-bold mb-2">هل تريد بيع منتجاتك؟</h3>
            <p className="mb-4">انضم كبائع في وصلة وابدأ في بيع منتجاتك الزراعية</p>
            <Button variant="outline" asChild>
              <Link to="/vendor-register">تسجيل كبائع</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
