
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Upload, X } from 'lucide-react';

// Form validation schema
const productFormSchema = z.object({
  name: z.string().min(3, { message: 'اسم المنتج يجب أن يكون 3 أحرف على الأقل' }),
  sku: z.string().min(3, { message: 'رمز المنتج يجب أن يكون 3 أحرف على الأقل' }),
  price: z.coerce.number().positive({ message: 'يجب أن يكون السعر أكبر من صفر' }),
  discountPrice: z.coerce.number().nonnegative({ message: 'يجب أن يكون سعر الخصم صفر أو أكبر' }).optional(),
  stock: z.coerce.number().nonnegative({ message: 'يجب أن تكون الكمية صفر أو أكبر' }),
  category: z.string().min(1, { message: 'يجب اختيار فئة المنتج' }),
  description: z.string().min(10, { message: 'وصف المنتج يجب أن يكون 10 أحرف على الأقل' }),
  specifications: z.string().optional(),
  weight: z.coerce.number().optional(),
  dimensions: z.string().optional(),
  brand: z.string().optional(),
  status: z.string().default('active'),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// Categories
const categories = [
  { id: 'fish-farm-equipment', name: 'معدات المزارع السمكية' },
  { id: 'feed', name: 'أعلاف' },
  { id: 'irrigation', name: 'معدات الري' },
  { id: 'seeds', name: 'البذور والشتلات' },
  { id: 'fertilizers', name: 'الأسمدة' },
  { id: 'agricultural-equipment', name: 'المعدات الزراعية' },
];

const NewProductPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Initialize form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      sku: '',
      price: 0,
      discountPrice: 0,
      stock: 0,
      category: '',
      description: '',
      specifications: '',
      weight: 0,
      dimensions: '',
      brand: '',
      status: 'active',
    },
  });

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      
      // Limit to 5 images
      if (productImages.length + newFiles.length > 5) {
        toast({
          title: "خطأ",
          description: "يمكنك تحميل 5 صور كحد أقصى",
          variant: "destructive",
        });
        return;
      }
      
      setProductImages(prev => [...prev, ...newFiles]);
      
      // Create preview URLs
      const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newImageUrls]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setProductImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission handler
  const onSubmit = async (data: ProductFormValues) => {
    setUploading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log form data and images (in a real app, this would be an API call)
      console.log('Product data:', data);
      console.log('Images to upload:', productImages);
      
      toast({
        title: "تم إضافة المنتج",
        description: "تمت إضافة المنتج بنجاح وهو بانتظار مراجعة الإدارة",
      });
      
      // Redirect to products page
      navigate('/vendor/products');
    } catch (error) {
      console.error('Error submitting product:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنتج، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Redirect if not authenticated or not a vendor
  if (!isAuthenticated || user?.role !== 'vendor') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">إضافة منتج جديد</h1>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">إضافة منتج جديد</h1>
            <p className="text-gray-500 mt-1">أضف تفاصيل المنتج الذي ترغب في بيعه</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/vendor/products">العودة للمنتجات</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات المنتج</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم المنتج *</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسم المنتج" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>السعر (ج.م) *</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="discountPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>سعر الخصم (ج.م) (اختياري)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رمز المنتج (SKU) *</FormLabel>
                            <FormControl>
                              <Input placeholder="PRD-001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>المخزون *</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الفئة *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر فئة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف المنتج *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="اكتب وصفاً تفصيلياً للمنتج" 
                              rows={5}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المواصفات (اختياري)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="اكتب المواصفات التقنية للمنتج" 
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الوزن (كجم) (اختياري)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dimensions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الأبعاد (اختياري)</FormLabel>
                            <FormControl>
                              <Input placeholder="الطول × العرض × الارتفاع" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>العلامة التجارية (اختياري)</FormLabel>
                            <FormControl>
                              <Input placeholder="اسم العلامة التجارية" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>حالة المنتج</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر حالة المنتج" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">نشط</SelectItem>
                              <SelectItem value="inactive">غير نشط</SelectItem>
                              <SelectItem value="draft">مسودة</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end mt-6">
                      <Button variant="outline" type="button" className="ml-4" asChild>
                        <Link to="/vendor/products">إلغاء</Link>
                      </Button>
                      <Button type="submit" disabled={uploading}>
                        {uploading ? 'جاري الحفظ...' : 'إضافة المنتج'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Images Upload Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>صور المنتج</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Image previews */}
                  {imagePreviewUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`صورة المنتج ${index + 1}`} 
                            className="w-full h-32 object-cover rounded border"
                          />
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} className="text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload area */}
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => document.getElementById('imageUpload')?.click()}
                  >
                    <Upload className="mx-auto mb-2" size={32} />
                    <p className="mb-2">اسحب وأفلت الصور هنا أو انقر للاختيار</p>
                    <p className="text-xs text-gray-500">يمكنك تحميل ما يصل إلى 5 صور</p>
                    <input 
                      id="imageUpload" 
                      type="file" 
                      multiple
                      accept="image/*"
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      * الصورة الأولى ستكون الصورة الرئيسية للمنتج
                    </p>
                    <p className="text-sm text-gray-500">
                      * الحجم الموصى به: 800×800 بيكسل
                    </p>
                    <p className="text-sm text-gray-500">
                      * الحد الأقصى لحجم الصورة: 5 ميجابايت
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewProductPage;
