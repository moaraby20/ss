
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'مضخة ري عالية القوة',
    price: 2500,
    image: 'https://plus.unsplash.com/premium_photo-1664304334645-3f6a4701a16c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'irrigation',
    vendor: 'الشركة الزراعية المتحدة',
    rating: 4.5,
    reviews: 12,
  },
  {
    id: '2',
    name: 'مضخة أكسجين للمزارع السمكية',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'fish-farm-equipment',
    vendor: 'شركة المعدات الزراعية',
    rating: 4.2,
    reviews: 8,
  },
  {
    id: '3',
    name: 'علف أسماك عالي البروتين 20كجم',
    price: 450,
    image: 'https://images.unsplash.com/photo-1560250056-07ba64664864?q=80&w=2051&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'feed',
    vendor: 'شركة الأعلاف المتكاملة',
    rating: 4.8,
    reviews: 23,
  },
  {
    id: '4',
    name: 'بذور خضروات متنوعة',
    price: 120,
    image: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'seeds',
    vendor: 'شركة البذور الوطنية',
    rating: 4.0,
    reviews: 15,
  },
  {
    id: '5',
    name: 'سماد عضوي متكامل 50كجم',
    price: 350,
    image: 'https://images.unsplash.com/photo-1606150115678-6038d4efe9ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'fertilizers',
    vendor: 'شركة الأسمدة الوطنية',
    rating: 4.7,
    reviews: 32,
  },
  {
    id: '6',
    name: 'جرار زراعي صغير',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'agricultural-equipment',
    vendor: 'شركة المعدات الزراعية الحديثة',
    rating: 4.9,
    reviews: 7,
  },
  {
    id: '7',
    name: 'حوض سمك 500 لتر',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'fish-farm-equipment',
    vendor: 'شركة معدات المزارع السمكية',
    rating: 4.4,
    reviews: 14,
  },
  {
    id: '8',
    name: 'نظام ري بالتنقيط متكامل',
    price: 850,
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'irrigation',
    vendor: 'شركة الري الحديث',
    rating: 4.6,
    reviews: 19,
  },
];

// Categories
const categories = [
  { id: 'fish-farm-equipment', name: 'معدات المزارع السمكية' },
  { id: 'feed', name: 'أعلاف' },
  { id: 'irrigation', name: 'معدات الري' },
  { id: 'seeds', name: 'البذور والشتلات' },
  { id: 'fertilizers', name: 'الأسمدة' },
  { id: 'agricultural-equipment', name: 'المعدات الزراعية' },
];

// Vendors
const vendors = [
  'الشركة الزراعية المتحدة',
  'شركة المعدات الزراعية',
  'شركة الأعلاف المتكاملة',
  'شركة البذور الوطنية',
  'شركة الأسمدة الوطنية',
  'شركة المعدات الزراعية الحديثة',
  'شركة معدات المزارع السمكية',
  'شركة الري الحديث',
];

const ProductsPage = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products based on category slug
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategories([categorySlug]);
    } else {
      setSelectedCategories([]);
    }
  }, [categorySlug]);

  // Apply filters
  useEffect(() => {
    let filtered = [...mockProducts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by vendor
    if (selectedVendors.length > 0) {
      filtered = filtered.filter(product => selectedVendors.includes(product.vendor));
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategories, selectedVendors, priceRange]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleVendorChange = (vendor: string, checked: boolean) => {
    if (checked) {
      setSelectedVendors(prev => [...prev, vendor]);
    } else {
      setSelectedVendors(prev => prev.filter(v => v !== vendor));
    }
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          {categorySlug ? categories.find(c => c.id === categorySlug)?.name || 'المنتجات' : 'جميع المنتجات'}
        </h1>

        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <Button
            onClick={toggleMobileFilter}
            variant="outline"
            className="w-full flex justify-between items-center"
          >
            <span>الفلاتر</span>
            <span>{isMobileFilterOpen ? '▲' : '▼'}</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - hidden on mobile unless toggled */}
          <aside className={`md:w-1/4 lg:w-1/5 ${isMobileFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Search */}
              <div className="mb-6">
                <Input
                  type="search"
                  placeholder="ابحث عن منتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">نطاق السعر</h3>
                <Slider
                  defaultValue={[0, 20000]}
                  min={0}
                  max={20000}
                  step={100}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{priceRange[0]} جنيه</span>
                  <span>{priceRange[1]} جنيه</span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Categories */}
              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger className="font-semibold">التصنيفات</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="mr-2 text-sm cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator className="my-4" />

              {/* Vendors */}
              <Accordion type="single" collapsible defaultValue="vendors">
                <AccordionItem value="vendors">
                  <AccordionTrigger className="font-semibold">الموردين</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {vendors.map((vendor) => (
                        <div key={vendor} className="flex items-center">
                          <Checkbox
                            id={`vendor-${vendor}`}
                            checked={selectedVendors.includes(vendor)}
                            onCheckedChange={(checked) => handleVendorChange(vendor, checked as boolean)}
                          />
                          <label
                            htmlFor={`vendor-${vendor}`}
                            className="mr-2 text-sm cursor-pointer"
                          >
                            {vendor}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories(categorySlug ? [categorySlug] : []);
                    setSelectedVendors([]);
                    setPriceRange([0, 20000]);
                    setSearchTerm('');
                  }}
                >
                  إعادة ضبط الفلاتر
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/product/${product.id}`}>
                      <div className="h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500 mb-1">{product.vendor}</p>
                      <Link to={`/product/${product.id}`} className="block hover:text-wasla-primary transition-colors">
                        <h3 className="font-bold mb-2">{product.name}</h3>
                      </Link>

                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 mr-1">({product.reviews})</span>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-wasla-primary">{product.price} جنيه</span>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/product/${product.id}`}>عرض التفاصيل</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 mb-4">لا توجد منتجات تطابق معايير البحث</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories(categorySlug ? [categorySlug] : []);
                    setSelectedVendors([]);
                    setPriceRange([0, 20000]);
                    setSearchTerm('');
                  }}
                >
                  إعادة ضبط الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
