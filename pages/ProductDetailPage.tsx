import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';

// Mock product data
const mockProducts = {
  '1': {
    id: '1',
    name: 'مضخة ري عالية القوة',
    price: 2500,
    description: 'مضخة ري عالية القوة مثالية للمزارع الكبيرة والمتوسطة، تتميز بقدرة ضخ عالية وكفاءة في استهلاك الطاقة. تعمل هذه المضخة بمحرك كهربائي قوي وهي مصممة للعمل في ظروف مختلفة ولفترات طويلة دون انقطاع.',
    specifications: [
      'قدرة 2 حصان',
      'معدل تدفق 10000 لتر/ساعة',
      'ارتفاع الضخ يصل إلى 8 أمتار',
      'هيكل من الفولاذ المقاوم للصدأ',
      'وزن المضخة 15 كجم',
      'ضمان لمدة عامين'
    ],
    howToUse: 'قم بتوصيل المضخة بمصدر الطاقة المناسب وتأكد من وجود مصدر مياه متصل بالمدخل. تحقق من أن خرطوم المخرج موجه بشكل صحيح إلى المنطقة المراد ريها. قم بتشغيل المضخة واضبط معدل التدفق حسب الحاجة.',
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1527154300610-c1a126502eac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    category: 'irrigation',
    vendor: 'الشركة الزراعية المتحدة',
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: 'محمد أحمد',
        rating: 5,
        text: 'مضخة ممتازة، تعمل بشكل جيد جدًا وصامتة نسبيًا مقارنة بالمضخات الأخرى.',
        date: '2025-03-15'
      },
      {
        id: 2,
        user: 'أحمد علي',
        rating: 4,
        text: 'جودة عالية وأداء ممتاز، لكن السعر مرتفع قليلاً.',
        date: '2025-02-28'
      },
      {
        id: 3,
        user: 'سارة محمود',
        rating: 5,
        text: 'تعمل بكفاءة عالية وتوفر في استهلاك الكهرباء.',
        date: '2025-02-10'
      }
    ],
    inStock: true,
    relatedProducts: ['2', '8', '3']
  },
  '2': {
    id: '2',
    name: 'مضخة أكسجين للمزارع السمكية',
    price: 1800,
    description: 'مضخة أكسجين عالية الكفاءة للمزارع السمكية، تساعد في زيادة نسبة الأكسجين في الماء وتحسين بيئة المزرعة السمكية. مصممة خصيصًا لتوفير الأكسجين بشكل مستمر وموثوق.',
    specifications: [
      'قدرة 1.5 حصان',
      'معدل ضخ الأكسجين 5000 لتر/ساعة',
      'استهلاك منخفض للطاقة',
      'مقاومة للماء بتصنيف IP68',
      'وزن المضخة 8 كجم',
      'ضمان لمدة عام'
    ],
    howToUse: 'قم بوضع المضخة في الموقع المناسب داخل حوض السمك أو البركة. تأكد من توصيلها بمصدر طاقة آمن وبعيد عن الماء. قم بتشغيل المضخة واضبط معدل تدفق الهواء حسب حاجة الأسماك والحجم الإجمالي للماء.',
    images: [
      'https://images.unsplash.com/photo-1573139834249-ef47545201b6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573139834249-ef47545201b6?auto=format&fit=crop&q=80&w=600&h=400',
    ],
    category: 'fish-farm-equipment',
    vendor: 'شركة معدات المزارع السمكية',
    rating: 4.2,
    reviews: [
      {
        id: 1,
        user: 'خالد محمد',
        rating: 4,
        text: 'مضخة جيدة وتعمل بكفاءة في مزرعتي السمكية الصغيرة.',
        date: '2025-03-20'
      },
      {
        id: 2,
        user: 'فاطمة أحمد',
        rating: 5,
        text: 'ممتازة للأحواض المتوسطة، ساعدت في تحسين صحة الأسماك.',
        date: '2025-03-05'
      }
    ],
    inStock: true,
    relatedProducts: ['1', '7', '3']
  },
  '3': {
    id: '3',
    name: 'علف أسماك عالي البروتين 20كجم',
    price: 450,
    description: 'علف أسماك عالي البروتين مخصص للمزارع السمكية، يساعد في تسريع نمو الأسماك وتحسين صحتها. مصنوع من مكونات طبيعية عالية الجودة ومدعم بالفيتامينات والمعادن الأساسية.',
    specifications: [
      'نسبة البروتين: 40%',
      'الدهون: 10%',
      'الألياف: 5%',
      'الرطوبة: 10%',
      'مدعم بفيتامينات A, D, E',
      'حبيبات بأحجام مختلفة مناسبة لمختلف أحجام الأسماك'
    ],
    howToUse: 'قم بتوزيع كمية مناسبة من العلف حسب حجم وعدد الأسماك في الحوض مرتين إلى ثلاث مرات يوميًا. تجنب الإفراط في التغذية واحرص على إزالة أي علف متبقي بعد 15 دقيقة من التغذية للحفاظ على جودة الماء.',
    images: [
      'https://images.unsplash.com/photo-1599744255343-84f5a4c1a823?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1599744255343-84f5a4c1a823?auto=format&fit=crop&q=80&w=600&h=400',
    ],
    category: 'feed',
    vendor: 'شركة الأعلاف المتكاملة',
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: 'سمير علي',
        rating: 5,
        text: 'علف ممتاز، لاحظت تحسن في نمو الأسماك خلال فترة قصيرة.',
        date: '2025-03-18'
      },
      {
        id: 2,
        user: 'رانيا محمد',
        rating: 4,
        text: 'جودة عالية ونتائج ملحوظة، لكن السعر مرتفع قليلاً.',
        date: '2025-03-10'
      },
      {
        id: 3,
        user: 'محمود خالد',
        rating: 5,
        text: 'أفضل علف استخدمته في مزرعتي، سأشتري المزيد.',
        date: '2025-02-25'
      }
    ],
    inStock: true,
    relatedProducts: ['2', '7', '1']
  },
  // More products can be added as needed
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get product data based on productId
  const product = mockProducts[productId as keyof typeof mockProducts];

  // If product not found
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
          <p className="mb-8">عذرًا، المنتج الذي تبحث عنه غير موجود أو تم حذفه.</p>
          <Button asChild>
            <Link to="/products">العودة للمنتجات</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Handle add to cart
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    });

    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.name} إلى سلة التسوق.`,
    });
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    // Ensure quantity doesn't go below 1
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="mb-4">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-auto object-contain rounded-md"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                      selectedImageIndex === index ? 'border-wasla-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - صورة ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-sm text-gray-500">{product.vendor}</span>
                <h1 className="text-2xl md:text-3xl font-bold mt-1">{product.name}</h1>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500 mr-1">({product.reviews.length} تقييم)</span>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-wasla-primary">{product.price} جنيه</span>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="flex items-center mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'متوفر' : 'غير متوفر'}
                </span>
              </div>

              {product.inStock && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-4 py-2 text-xl border-l"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-6 py-2">{quantity}</span>
                    <button
                      className="px-4 py-2 text-xl border-r"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <Button
                    className="flex-grow"
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    إضافة للسلة
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="specifications" className="bg-white rounded-lg shadow-md">
            <TabsList className="w-full border-b">
              <TabsTrigger value="specifications" className="flex-1">المواصفات</TabsTrigger>
              <TabsTrigger value="howToUse" className="flex-1">طريقة الاستخدام</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">التقييمات</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="p-6">
              <h3 className="text-xl font-semibold mb-4">مواصفات المنتج</h3>
              <ul className="space-y-2 list-disc list-inside">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-gray-700">{spec}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="howToUse" className="p-6">
              <h3 className="text-xl font-semibold mb-4">طريقة الاستخدام</h3>
              <p className="text-gray-700">{product.howToUse}</p>
            </TabsContent>
            <TabsContent value="reviews" className="p-6">
              <h3 className="text-xl font-semibold mb-4">تقييمات العملاء</h3>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{review.user}</p>
                          <div className="flex text-yellow-400 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="mt-2 text-gray-700">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">منتجات ذات صلة</h2>
          <Carousel className="w-full">
            <CarouselContent className="-mr-4">
              {product.relatedProducts.map((relatedProductId) => {
                const relatedProduct = mockProducts[relatedProductId as keyof typeof mockProducts];
                if (!relatedProduct) return null;

                return (
                  <CarouselItem key={relatedProduct.id} className="pr-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <div className="h-48 overflow-hidden">
                          <img
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                          />
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <Link to={`/product/${relatedProduct.id}`} className="block hover:text-wasla-primary transition-colors">
                          <h3 className="font-bold mb-2">{relatedProduct.name}</h3>
                        </Link>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-bold text-wasla-primary">{relatedProduct.price} جنيه</span>
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/product/${relatedProduct.id}`}>عرض التفاصيل</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
