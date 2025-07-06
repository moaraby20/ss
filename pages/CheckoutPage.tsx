
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order placement
    setTimeout(() => {
      toast({
        title: "تم إكمال الطلب",
        description: "تم إرسال طلبك بنجاح! سنرسل تأكيدًا إلى بريدك الإلكتروني.",
      });
      clearCart();
      navigate('/orders');
    }, 1500);
  };

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">إكمال الطلب</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Shipping Information */}
            <div className="lg:w-2/3">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">معلومات الشحن</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">العنوان</Label>
                      <Textarea 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">المدينة</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">المحافظة</Label>
                      <Input 
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">الرمز البريدي</Label>
                      <Input 
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">طريقة الدفع</h2>
                  
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="mr-2">الدفع عند الاستلام</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="mr-2">بطاقة ائتمان</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="mr-2">محفظة إلكترونية (فودافون كاش، Instapay)</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'credit' && (
                    <div className="mt-4 border rounded-md p-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="cardName">الاسم على البطاقة</Label>
                          <Input id="cardName" />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">رقم البطاقة</Label>
                          <Input id="cardNumber" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="mt-4 border rounded-md p-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="walletType">نوع المحفظة</Label>
                          <select id="walletType" className="w-full border rounded p-2">
                            <option value="vodafone">فودافون كاش</option>
                            <option value="instapay">Instapay</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                          <Input id="phoneNumber" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <Label htmlFor="notes">ملاحظات الطلب (اختياري)</Label>
                    <Textarea 
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="أي تعليمات خاصة بالتوصيل أو الطلب"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 block text-sm">الكمية: {item.quantity}</span>
                        </div>
                        <span>{item.price * item.quantity} جنيه</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{getTotalPrice()} جنيه</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الشحن</span>
                      <span>50 جنيه</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>الإجمالي</span>
                    <span>{getTotalPrice() + 50} جنيه</span>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    تأكيد الطلب
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
