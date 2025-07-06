
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Mock data for the hero carousel
const heroSlides = [
  {
    id: 1,
    title: 'معدات زراعية عالية الجودة',
    description: 'اكتشف أحدث المعدات الزراعية من كبرى الشركات العالمية',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    buttonText: 'تسوق الآن',
    buttonLink: '/products',
  },
  {
    id: 2,
    title: 'خصم 15% على معدات الري',
    description: 'عروض حصرية على أنظمة الري الحديثة لفترة محدودة',
    image: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&q=80',
    buttonText: 'اكتشف العروض',
    buttonLink: '/products/irrigation',
  },
  {
    id: 3,
    title: 'مستلزمات المزارع السمكية',
    description: 'كل ما تحتاجه لمزرعتك السمكية في مكان واحد',
    image: 'https://images.unsplash.com/photo-1708794666324-85ad91989d20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'تصفح المنتجات',
    buttonLink: '/products/fish-farm-equipment',
  },
];

// Enhanced categories with more detail
const categories = [
  {
    id: 1,
    name: 'معدات المزارع السمكية',
    image: 'https://plus.unsplash.com/premium_photo-1664304334645-3f6a4701a16c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'fish-farm-equipment',
    description: 'كل ما تحتاجه من معدات للمزارع السمكية من أنظمة التهوية إلى أجهزة قياس جودة المياه'
  },
  {
    id: 2,
    name: 'أعلاف',
    image: 'https://images.unsplash.com/photo-1527154300610-c1a126502eac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'feed',
    description: 'أعلاف عالية الجودة للأسماك والماشية بتركيبات غذائية متوازنة من أفضل المصادر'
  },
  {
    id: 3,
    name: 'معدات الري',
    image: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&q=80&w=600',
    slug: 'irrigation',
    description: 'أنظمة ري متطورة تساعد على توفير المياه وضمان توزيع متساوٍ للمحاصيل الزراعية'
  },
  {
    id: 4,
    name: 'البذور والشتلات',
    image: 'https://plus.unsplash.com/premium_photo-1682308130114-bd9eed788869?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'seeds',
    description: 'بذور وشتلات معتمدة ذات جودة عالية من أفضل السلالات المقاومة للآفات'
  },
  {
    id: 5,
    name: 'المبيدات الحشرية',
    image: 'https://images.unsplash.com/photo-1606150115678-6038d4efe9ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'pesticides',
    description: 'مبيدات آمنة وفعالة لمكافحة الآفات الزراعية مع الحفاظ على سلامة المحاصيل'
  },
  {
    id: 6,
    name: 'الأسمدة',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=600',
    slug: 'fertilizers',
    description: 'أسمدة عضوية وكيميائية متوازنة لتغذية التربة وزيادة إنتاجية المحاصيل'
  },
];

// Enhanced featured products with more details
const featuredProducts = [
  {
    id: '1',
    name: 'مضخة ري عالية القوة',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=600',
    category: 'irrigation',
    description: 'مضخة ري عالية القوة بمعدل تدفق يصل إلى 1200 لتر/ساعة، مناسبة للمساحات الكبيرة',
    rating: 4.8,
    inStock: true,
    discount: '10%'
  },
  {
    id: '2',
    name: 'مضخة أكسجين للمزارع السمكية',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'fish-farm-equipment',
    description: 'مضخة أكسجين مزدوجة المخرج لأحواض تربية الأسماك، تعمل بنظام توفير الطاقة',
    rating: 4.5,
    inStock: true,
    discount: '5%'
  },
  {
    id: '3',
    name: 'علف أسماك عالي البروتين 20كجم',
    price: 450,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'feed',
    description: 'علف متوازن غني بالبروتينات والفيتامينات لنمو صحي وسريع للأسماك',
    rating: 4.7,
    inStock: true,
    discount: '15%'
  },
  {
    id: '4',
    name: 'بذور خضروات متنوعة',
    price: 120,
    image: 'https://images.unsplash.com/photo-1560250056-07ba64664864?q=80&w=2051&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'seeds',
    description: 'مجموعة متنوعة من بذور الخضروات عالية الإنتاجية والمقاومة للأمراض',
    rating: 4.6,
    inStock: true
  },
  {
    id: '5',
    name: 'نظام ري بالتنقيط متكامل',
    price: 850,
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'irrigation',
    description: 'نظام ري بالتنقيط متكامل لمساحة 500 متر مربع، موفر للمياه وسهل التركيب',
    rating: 4.9,
    inStock: true,
    discount: '12%'
  },
  {
    id: '6',
    name: 'سماد عضوي 50 كجم',
    price: 280,
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=600',
    category: 'fertilizers',
    description: 'سماد عضوي طبيعي 100% غني بالعناصر الغذائية لتعزيز خصوبة التربة',
    rating: 4.7,
    inStock: true
  },
  {
    id: '7',
    name: 'شبكة تظليل للزراعة',
    price: 320,
    image: 'https://images.unsplash.com/photo-1591857177593-aec16c2fa8d6?auto=format&fit=crop&q=80&w=600',
    category: 'accessories',
    description: 'شبكة تظليل بنسبة 70% لحماية المحاصيل من أشعة الشمس الضارة',
    rating: 4.4,
    inStock: true,
    discount: '8%'
  },
  {
    id: '8',
    name: 'جهاز قياس درجة حموضة التربة',
    price: 190,
    image: 'https://images.unsplash.com/photo-1597424216809-3ba9864aee7e?auto=format&fit=crop&q=80&w=600',
    category: 'accessories',
    description: 'جهاز دقيق لقياس درجة حموضة التربة ومستوى الرطوبة والضوء',
    rating: 4.5,
    inStock: true
  },
];

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="rounded-xl overflow-hidden"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8 md:p-16">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-6 max-w-md">
                      {slide.description}
                    </p>
                    <div>
                      <Button asChild size="lg">
                        <Link to={slide.buttonLink}>
                          {slide.buttonText}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Categories Section - Enhanced */}
      <section className="py-12 p-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">تصفح حسب الفئة</h2>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            className="px-2 py-4"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link to={`/products/${category.slug}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-center mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                      <div className="mt-4 text-center">
                        <span className="text-wasla-primary text-sm hover:underline">عرض المنتجات</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Featured Products - Enhanced Hot Now Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">المنتجات الأكثر مبيعاً</h2>
              <p className="text-gray-600 mt-2">تسوق أفضل منتجاتنا وأكثرها مبيعاً بخصومات حصرية</p>
            </div>
            <Link to="/products" className="text-wasla-primary flex items-center hover:underline">
              عرض الكل
              <ArrowLeft size={16} className="mr-1" />
            </Link>
          </div>

          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            className="px-2 py-4"
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <Link to={`/product/${product.id}`}>
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs font-bold">
                          خصم {product.discount}
                        </div>
                      )}
                      {product.inStock ? (
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white py-1 px-2 rounded-full text-xs">
                          متوفر
                        </div>
                      ) : (
                        <div className="absolute bottom-2 right-2 bg-gray-500 text-white py-1 px-2 rounded-full text-xs">
                          نفذت الكمية
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link to={`/product/${product.id}`} className="block hover:text-wasla-primary transition-colors">
                      <h3 className="font-bold mb-2 text-lg">{product.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex items-center mb-3">
                      {/* Simple star rating */}
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ms-1">({product.rating})</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-wasla-primary">{product.price} جنيه</span>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/product/${product.id}`}>عرض التفاصيل</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* About Us Section - Verified image */}
      <section className="py-12 bg-wasla-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">من نحن</h2>
              <p className="mb-6 text-gray-700">
                وصلة هي منصة سوق إلكتروني متخصصة في المعدات الزراعية، تهدف إلى ربط المزارعين بالموردين بطريقة سهلة وموثوقة. نحن نساعد المزارعين في العثور على أفضل المنتجات والمعدات لمزارعهم بأسعار تنافسية.
              </p>
              <p className="mb-6 text-gray-700">
                مهمتنا هي دعم القطاع الزراعي وتسهيل وصول المزارعين إلى التكنولوجيا والمعدات الحديثة لتحسين الإنتاج وضمان استدامته.
              </p>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link to="/about">المزيد عنا</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/support">تواصل معنا</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80"
                alt="صورة توضيحية للمزرعة"
                className="w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
