
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "يرجى تسجيل الدخول",
        description: "يجب عليك تسجيل الدخول للمتابعة إلى صفحة الدفع.",
        variant: "destructive",
      });
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">سلة التسوق</h1>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
            <p className="text-xl mb-6">سلة التسوق فارغة</p>
            <Button asChild>
              <Link to="/products">تسوق الآن</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">سلة التسوق</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <Link to={`/product/${item.id}`} className="sm:w-1/4">
                          <div className="aspect-square overflow-hidden rounded-md">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        
                        {/* Product Info */}
                        <div className="sm:w-3/4 flex flex-col">
                          <div className="flex justify-between">
                            <Link to={`/product/${item.id}`} className="font-bold text-lg hover:text-wasla-primary transition-colors">
                              {item.name}
                            </Link>
                            <button 
                              className="text-red-500 hover:text-red-700 transition-colors"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                          
                          <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-end pt-4">
                            <div className="flex items-center border rounded-md mb-4 sm:mb-0">
                              <button 
                                className="px-3 py-1 border-l"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button 
                                className="px-3 py-1 border-r"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <span className="font-bold text-lg text-wasla-primary">
                              {item.price} جنيه
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
                
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
                
                <Button className="w-full" size="lg" onClick={handleProceedToCheckout}>
                  متابعة الدفع
                </Button>
                
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/products">متابعة التسوق</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
