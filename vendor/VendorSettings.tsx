
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { User, Settings, CreditCard, FileText, Upload, ShieldCheck } from 'lucide-react';

// Form validation schema
const storeFormSchema = z.object({
  storeName: z.string().min(3, { message: 'اسم المتجر يجب أن يكون 3 أحرف على الأقل' }),
  storeDescription: z.string().min(10, { message: 'الوصف يجب أن يكون 10 أحرف على الأقل' }),
  phoneNumber: z.string().min(11, { message: 'رقم الهاتف يجب أن يكون 11 رقم على الأقل' }),
  address: z.string().min(5, { message: 'العنوان مطلوب' }),
  taxId: z.string().optional(),
});

const paymentFormSchema = z.object({
  bankName: z.string().min(2, { message: 'اسم البنك مطلوب' }),
  accountName: z.string().min(3, { message: 'اسم الحساب مطلوب' }),
  accountNumber: z.string().min(10, { message: 'رقم الحساب يجب أن يكون 10 أرقام على الأقل' }),
  swiftCode: z.string().optional(),
});

// Mock store data
const mockStoreData = {
  storeName: 'متجر المزرعة الخضراء',
  storeDescription: 'متخصصون في بيع المعدات الزراعية والأسمدة والبذور عالية الجودة. نقدم منتجات موثوقة للمزارعين بأسعار تنافسية.',
  phoneNumber: '01234567890',
  address: 'شارع 15، المنطقة الصناعية، القاهرة',
  taxId: '12345678901234',
  logo: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=100&h=100',
  bankName: 'البنك الأهلي المصري',
  accountName: 'متجر المزرعة الخضراء',
  accountNumber: '1234567890123456',
  swiftCode: 'NBEGEGCX012',
  joined: '10 أغسطس 2024',
  verified: true,
};

const VendorSettings = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(mockStoreData.logo);

  // Initialize forms
  const storeForm = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: mockStoreData.storeName,
      storeDescription: mockStoreData.storeDescription,
      phoneNumber: mockStoreData.phoneNumber,
      address: mockStoreData.address,
      taxId: mockStoreData.taxId,
    },
  });

  const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      bankName: mockStoreData.bankName,
      accountName: mockStoreData.accountName,
      accountNumber: mockStoreData.accountNumber,
      swiftCode: mockStoreData.swiftCode,
    },
  });

  // Handle logo change
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handlers
  const onStoreSubmit = (data: z.infer<typeof storeFormSchema>) => {
    console.log('Store data submitted:', data);
    toast({
      title: "تم الحفظ",
      description: "تم تحديث بيانات المتجر بنجاح",
    });
  };

  const onPaymentSubmit = (data: z.infer<typeof paymentFormSchema>) => {
    console.log('Payment data submitted:', data);
    toast({
      title: "تم الحفظ",
      description: "تم تحديث بيانات الدفع بنجاح",
    });
  };

  // Redirect if not authenticated or not a vendor
  if (!isAuthenticated || user?.role !== 'vendor') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">إعدادات البائع</h1>
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">إعدادات المتجر</h1>
            <p className="text-gray-500">إدارة بيانات وإعدادات متجرك</p>
          </div>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="store" className="flex items-center">
              <Settings className="ml-2" size={16} />
              <span>معلومات المتجر</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center">
              <CreditCard className="ml-2" size={16} />
              <span>بيانات الدفع</span>
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center">
              <ShieldCheck className="ml-2" size={16} />
              <span>التحقق والتوثيق</span>
            </TabsTrigger>
          </TabsList>

          {/* Store Information Tab */}
          <TabsContent value="store">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar with logo and basic info */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>صورة المتجر</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-4">
                      <img 
                        src={logoPreview} 
                        alt="شعار المتجر" 
                        className="w-full h-full object-cover rounded-full"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute bottom-0 right-0 bg-white rounded-full shadow-md"
                        onClick={() => document.getElementById('logoUpload')?.click()}
                      >
                        <Upload size={16} />
                      </Button>
                      <input 
                        id="logoUpload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    </div>
                    <h3 className="font-bold text-lg">{mockStoreData.storeName}</h3>
                    <div className="text-sm text-gray-500 mt-2">
                      <div className="flex items-center justify-center mb-1">
                        <User size={14} className="ml-1" />
                        <span>تاريخ الانضمام: {mockStoreData.joined}</span>
                      </div>
                      {mockStoreData.verified && (
                        <div className="flex items-center justify-center text-green-600">
                          <ShieldCheck size={14} className="ml-1" />
                          <span>متجر موثق</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 w-full">
                      <h4 className="font-medium text-right mb-2">روابط سريعة</h4>
                      <div className="space-y-2 text-right">
                        <Button variant="outline" asChild className="w-full justify-start">
                          <Link to="/vendor/dashboard">
                            <FileText size={16} className="ml-2" />
                            لوحة التحكم
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full justify-start">
                          <Link to="/vendor/products">
                            <FileText size={16} className="ml-2" />
                            المنتجات
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full justify-start">
                          <Link to="/vendor/orders">
                            <FileText size={16} className="ml-2" />
                            الطلبات
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Store details form */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات المتجر</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...storeForm}>
                      <form onSubmit={storeForm.handleSubmit(onStoreSubmit)} className="space-y-6">
                        <FormField
                          control={storeForm.control}
                          name="storeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>اسم المتجر</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={storeForm.control}
                          name="storeDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>وصف المتجر</FormLabel>
                              <FormControl>
                                <Textarea rows={4} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={storeForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>رقم الهاتف</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={storeForm.control}
                            name="taxId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الرقم الضريبي (اختياري)</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={storeForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>عنوان المتجر</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button type="submit">حفظ التغييرات</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Payment Information Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>بيانات الدفع والحساب البنكي</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...paymentForm}>
                  <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={paymentForm.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>اسم البنك</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="accountName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>اسم صاحب الحساب</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رقم الحساب</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="swiftCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رمز السويفت (اختياري)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">حفظ بيانات الدفع</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>التحقق وتوثيق المتجر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-start">
                    <ShieldCheck className="text-green-600 ml-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-green-800">تم توثيق المتجر</h3>
                      <p className="text-green-700">تم التحقق من هوية المتجر والمستندات المطلوبة بنجاح.</p>
                      <p className="text-green-700 mt-2">تاريخ التوثيق: 5 أبريل 2025</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">المستندات المرفوعة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="ml-2" size={20} />
                          <span>السجل التجاري</span>
                        </div>
                        <Button variant="outline" size="sm">عرض</Button>
                      </div>
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="ml-2" size={20} />
                          <span>البطاقة الضريبية</span>
                        </div>
                        <Button variant="outline" size="sm">عرض</Button>
                      </div>
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="ml-2" size={20} />
                          <span>رخصة المزاولة</span>
                        </div>
                        <Button variant="outline" size="sm">عرض</Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-bold mb-4">رفع مستندات إضافية</h3>
                    <div className="border-2 border-dashed p-6 rounded-lg text-center">
                      <Upload className="mx-auto mb-2" size={32} />
                      <p className="mb-4">اسحب وأفلت الملفات هنا أو انقر للاختيار</p>
                      <Button variant="outline">
                        اختيار ملف
                        <input type="file" className="hidden" />
                      </Button>
                      <p className="mt-2 text-xs text-gray-500">الحد الأقصى لحجم الملف: 10 ميجابايت، الصيغ المدعومة: PDF, JPG, PNG</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VendorSettings;
