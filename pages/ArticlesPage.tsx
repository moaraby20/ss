
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Link } from 'react-router-dom';

// Mock data for articles
const articlesData = [
  {
    id: '1',
    title: 'أفضل 10 معدات زراعية يجب توفرها في كل مزرعة',
    excerpt: 'تعرف على أهم المعدات الزراعية التي يحتاجها المزارع العصري للحصول على أفضل إنتاجية من مزرعته',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    date: '2025-04-20',
    category: 'معدات زراعية',
    author: 'أحمد محمود',
  },
  {
    id: '2',
    title: 'دليلك الشامل لاختيار أفضل أنظمة الري للمساحات الصغيرة',
    excerpt: 'كيفية اختيار نظام الري المناسب للحدائق المنزلية والمساحات الزراعية الصغيرة لتوفير المياه وزيادة الإنتاجية',
    image: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&q=80',
    date: '2025-04-15',
    category: 'أنظمة الري',
    author: 'سارة أحمد',
  },
  {
    id: '3',
    title: 'كيفية إنشاء مزرعة سمكية مربحة في مصر',
    excerpt: 'خطوات عملية لإنشاء مزرعة سمكية ناجحة في مصر والمعدات اللازمة لضمان الربحية والاستدامة',
    image: 'https://images.unsplash.com/photo-1594842336019-11db6d554c2b?auto=format&fit=crop&q=80',
    date: '2025-04-10',
    category: 'مزارع سمكية',
    author: 'محمد عبدالله',
  },
  {
    id: '4',
    title: 'أهمية تحليل التربة قبل الزراعة وكيفية إجرائها',
    excerpt: 'لماذا يعتبر تحليل التربة خطوة أساسية قبل البدء في الزراعة وكيف يمكن إجراؤها بنفسك باستخدام المعدات المناسبة',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80',
    date: '2025-04-05',
    category: 'زراعة',
    author: 'فاطمة علي',
  },
  {
    id: '5',
    title: 'التقنيات الحديثة في تربية الأسماك وزيادة الإنتاجية',
    excerpt: 'استعراض لأحدث التقنيات المستخدمة في مجال الاستزراع السمكي وتأثيرها على زيادة الإنتاجية وتقليل التكاليف',
    image: 'https://images.unsplash.com/photo-1529332662155-f2ffbb7c473c?auto=format&fit=crop&q=80',
    date: '2025-03-28',
    category: 'مزارع سمكية',
    author: 'أحمد محمود',
  },
  {
    id: '6',
    title: 'مكافحة الآفات الزراعية بطرق طبيعية وآمنة',
    excerpt: 'طرق فعالة لمكافحة الآفات الزراعية باستخدام وسائل طبيعية وآمنة بدلاً من المبيدات الكيماوية',
    image: 'https://images.unsplash.com/photo-1610144953583-d38cbec17c7a?auto=format&fit=crop&q=80',
    date: '2025-03-20',
    category: 'زراعة عضوية',
    author: 'سارة أحمد',
  },
  {
    id: '7',
    title: 'أنواع الأعلاف المناسبة لكل مرحلة من تربية الأسماك',
    excerpt: 'دليل شامل لاختيار الأعلاف المناسبة لكل مرحلة من مراحل نمو الأسماك لضمان النمو الصحي وزيادة الإنتاجية',
    image: 'https://images.unsplash.com/photo-1631209121750-a9f656d81ae6?auto=format&fit=crop&q=80',
    date: '2025-03-15',
    category: 'أعلاف',
    author: 'محمد عبدالله',
  },
  {
    id: '8',
    title: 'دور التكنولوجيا في تطوير القطاع الزراعي في مصر',
    excerpt: 'كيف تساهم التكنولوجيا الحديثة في تطوير القطاع الزراعي في مصر والتحديات التي تواجه تطبيقها',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80',
    date: '2025-03-10',
    category: 'تكنولوجيا زراعية',
    author: 'فاطمة علي',
  },
];

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(articlesData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = articlesData.filter(article => 
      article.title.includes(searchTerm) || 
      article.excerpt.includes(searchTerm) ||
      article.category.includes(searchTerm)
    );
    setFilteredArticles(filtered);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">المدونة</h1>
        
        {/* Search section */}
        <div className="max-w-lg mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="search"
              placeholder="ابحث في المقالات..."
              className="rounded-r-none border-l-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none">
              <Search size={18} />
            </Button>
          </form>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/articles/${article.id}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h2 className="font-bold text-xl mb-2 hover:text-wasla-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">بواسطة: {article.author}</span>
                    <span className="text-wasla-primary text-sm hover:underline">قراءة المزيد</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Go to previous page"
                className="flex items-center gap-1"
              >
                <span>السابق</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Go to next page"
                className="flex items-center gap-1"
              >
                <span>التالي</span>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
};

export default ArticlesPage;
