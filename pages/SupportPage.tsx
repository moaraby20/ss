
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/components/ui/use-toast';

const SupportPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "تم إرسال رسالتك",
      description: "سنتواصل معك في أقرب وقت ممكن. شكرًا لك!",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">الدعم والمساعدة</h1>
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-center text-gray-700 mb-8">
            فريق الدعم الخاص بنا متاح لمساعدتك في أي استفسارات أو مشكلات قد تواجهها. يمكنك التواصل معنا عبر النموذج أدناه أو الاطلاع على الأسئلة الشائعة.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-wasla-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-700 mb-2">support@wasla-agri.com</p>
                <p className="text-sm text-gray-500">نرد خلال 24 ساعة</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-wasla-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">الهاتف</h3>
                <p className="text-gray-700 mb-2">+20 123 456 7890</p>
                <p className="text-sm text-gray-500">من السبت للخميس، 9ص - 5م</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-wasla-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">الدردشة المباشرة</h3>
                <p className="text-gray-700 mb-2">متاح على موقعنا</p>
                <p className="text-sm text-gray-500">دعم فوري</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>تواصل معنا</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك الكامل" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="أدخل بريدك الإلكتروني" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="موضوع الرسالة" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتب رسالتك هنا" 
                      rows={5}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">إرسال</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>الأسئلة الشائعة</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>كيف يمكنني تتبع طلبي؟</AccordionTrigger>
                    <AccordionContent>
                      يمكنك تتبع طلبك عن طريق تسجيل الدخول إلى حسابك والانتقال إلى صفحة "طلباتي". ستجد هناك تفاصيل كل طلب ورابط لتتبع الشحنة إذا كان الطلب قد تم شحنه بالفعل.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>ما هي طرق الدفع المتاحة؟</AccordionTrigger>
                    <AccordionContent>
                      نوفر عدة طرق للدفع تشمل الدفع عند الاستلام، بطاقات الائتمان، والمحافظ الإلكترونية مثل فودافون كاش وInstapay.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>كم تستغرق عملية التوصيل؟</AccordionTrigger>
                    <AccordionContent>
                      تعتمد مدة التوصيل على موقعك وتوفر المنتج. عادة ما يتم التوصيل خلال 3-7 أيام عمل داخل المدن الرئيسية، وقد تستغرق وقتًا أطول في المناطق النائية.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>هل يمكنني إلغاء أو تعديل طلبي بعد تقديمه؟</AccordionTrigger>
                    <AccordionContent>
                      يمكنك إلغاء أو تعديل طلبك فقط إذا لم يتم معالجته بعد. يرجى الاتصال بفريق خدمة العملاء في أقرب وقت ممكن إذا كنت ترغب في إلغاء أو تعديل طلبك.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>ما هي سياسة الإرجاع والاستبدال؟</AccordionTrigger>
                    <AccordionContent>
                      نقبل إرجاع المنتجات خلال 14 يومًا من تاريخ الاستلام إذا كانت في حالتها الأصلية وغير مستخدمة. بعض المنتجات مثل الأعلاف والبذور لا يمكن إرجاعها لأسباب صحية. يرجى الاطلاع على سياسة الإرجاع الكاملة على موقعنا.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>كيف يمكنني التسجيل كبائع على المنصة؟</AccordionTrigger>
                    <AccordionContent>
                      للتسجيل كبائع، يرجى زيارة صفحة "تسجيل كبائع" وملء النموذج المطلوب. سيتصل بك فريقنا لإكمال عملية التحقق وتفعيل حسابك كبائع.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
