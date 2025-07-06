
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "كلمة المرور غير متطابقة",
        description: "يرجى التأكد من تطابق كلمات المرور",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "الشروط والأحكام",
        description: "يرجى الموافقة على الشروط والأحكام للمتابعة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "أهلاً بك في وصلة!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: "حدث خطأ أثناء تسجيل الحساب، يرجى المحاولة مرة أخرى",
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
              <CardTitle className="text-2xl text-center">إنشاء حساب جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="أدخل اسمك الكامل" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="أدخل بريدك الإلكتروني" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    placeholder="أعد إدخال كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                    }
                  />
                  <label 
                    htmlFor="agreeTerms" 
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    أوافق على{' '}
                    <Link to="/terms" className="text-wasla-primary hover:underline">
                      الشروط والأحكام
                    </Link>
                    {' '}و{' '}
                    <Link to="/privacy" className="text-wasla-primary hover:underline">
                      سياسة الخصوصية
                    </Link>
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500">
                لديك حساب بالفعل؟{' '}
                <Link to="/login" className="text-wasla-primary hover:underline">
                  تسجيل الدخول
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
