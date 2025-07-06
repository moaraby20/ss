
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'أحمد محمد',
      position: 'المؤسس والرئيس التنفيذي',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'سارة علي',
      position: 'مدير العمليات',
      image: 'https://images.unsplash.com/photo-1603786419734-909b0373d942?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'محمود خالد',
      position: 'مدير المنتجات',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
    },
    {
      name: 'رنا أحمد',
      position: 'مديرة التسويق',
      image: 'https://images.unsplash.com/photo-1603786419734-909b0373d942?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">من نحن</h1>

        {/* Introduction Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">وصلة للمعدات الزراعية</h2>
              <p className="mb-4 text-gray-700">
                وصلة هي منصة سوق إلكتروني متخصصة في المعدات الزراعية، تأسست في عام 2023 بهدف ربط المزارعين بالموردين بطريقة سهلة وموثوقة. نحن نساعد المزارعين في العثور على أفضل المنتجات والمعدات لمزارعهم بأسعار تنافسية.
              </p>
              <p className="text-gray-700">
                بدأت وصلة كفكرة بسيطة لحل مشكلة حقيقية يواجهها المزارعون في مصر والشرق الأوسط، وهي صعوبة الوصول للمعدات الزراعية الحديثة والموثوقة. نحن نؤمن بأن التكنولوجيا يمكن أن تساعد في تطوير القطاع الزراعي وتحسين حياة المزارعين وزيادة إنتاجيتهم.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="صورة توضيحية للمزرعة"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-wasla-light border-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-wasla-dark">رسالتنا</h2>
                <p className="text-gray-700">
                  مهمتنا هي دعم القطاع الزراعي وتسهيل وصول المزارعين إلى التكنولوجيا والمعدات الحديثة لتحسين الإنتاج وضمان استدامته. نسعى لبناء مجتمع زراعي متكامل يربط بين المزارعين والموردين ويوفر المعرفة والأدوات اللازمة لتطوير الزراعة في المنطقة.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-wasla-primary border-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">رؤيتنا</h2>
                <p className="text-white">
                  نتطلع لأن نكون الوجهة الأولى والمفضلة للمزارعين في الشرق الأوسط للحصول على المعدات والتقنيات الزراعية الحديثة. نحن نسعى لتمكين المزارعين وتعزيز قدرتهم على الإنتاج بكفاءة واستدامة، مما يساهم في تحقيق الأمن الغذائي وتنمية المجتمعات الزراعية.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">قيمنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-wasla-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">المجتمع</h3>
                <p className="text-gray-600">
                  نؤمن بأهمية بناء مجتمع زراعي متكامل يتشارك المعرفة والخبرات لدعم بعضه البعض.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-wasla-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">الثقة</h3>
                <p className="text-gray-600">
                  نبني علاقات مبنية على الثقة والشفافية مع العملاء والموردين والشركاء.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-wasla-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">الابتكار</h3>
                <p className="text-gray-600">
                  نسعى دائمًا للتطوير والابتكار في حلولنا وخدماتنا لمواكبة احتياجات السوق المتغيرة.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-wasla-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">الاستدامة</h3>
                <p className="text-gray-600">
                  نعمل على تعزيز الممارسات الزراعية المستدامة التي تحافظ على البيئة وتضمن مستقبل أفضل.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">فريقنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-500">{member.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">تواصل معنا</h2>
          <div className="bg-wasla-light p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">العنوان</h3>
                <p className="text-gray-700">شارع التحرير، القاهرة، مصر</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-700">info@wasla-agri.com</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wasla-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">الهاتف</h3>
                <p className="text-gray-700">+20 123 456 7890</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
