
import React, { useState } from 'react';
import VendorLayout from '@/components/vendor/VendorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video,
  Info,
  Bell,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock conversation data
const mockContacts = [
  {
    id: 1,
    name: 'أحمد محمد',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&h=160&auto=format',
    lastMessage: 'مرحبًا، هل المنتج متوفر في المخزن؟',
    time: '15:30',
    unread: 2,
    status: 'online'
  },
  {
    id: 2,
    name: 'سارة أحمد',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&auto=format',
    lastMessage: 'شكرًا لسرعة الرد',
    time: 'أمس',
    unread: 0,
    status: 'offline'
  },
  {
    id: 3,
    name: 'محمود خالد',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&auto=format',
    lastMessage: 'متى سيتم شحن الطلب؟',
    time: '09:45',
    unread: 1,
    status: 'online'
  },
  {
    id: 4,
    name: 'نورا علي',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&auto=format',
    lastMessage: 'هل يمكنني تغيير لون المنتج؟',
    time: 'الأربعاء',
    unread: 0,
    status: 'offline'
  },
  {
    id: 5,
    name: 'يوسف حسن',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=160&h=160&auto=format',
    lastMessage: 'تم استلام الطلب، شكرًا جزيلًا',
    time: 'الثلاثاء',
    unread: 0,
    status: 'offline'
  }
];

// Mock messages for the current conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1, // Ahmed
    text: 'مرحبًا، هل المنتج متوفر في المخزن؟',
    time: '15:30',
    date: 'اليوم'
  },
  {
    id: 2,
    senderId: 'vendor',
    text: 'مرحبًا أحمد، نعم المنتج متوفر. هل تحتاج إلى مساعدة في اختيار المواصفات؟',
    time: '15:32',
    date: 'اليوم'
  },
  {
    id: 3,
    senderId: 1,
    text: 'نعم من فضلك. أبحث عن مضخة مياه بقوة مناسبة لمزرعة سمكية صغيرة.',
    time: '15:35',
    date: 'اليوم'
  },
  {
    id: 4,
    senderId: 'vendor',
    text: 'أنصحك بمضخة المياه موديل XP-3500 فهي مناسبة للمزارع الصغيرة وتأتي مع ضمان لمدة عامين. سعرها 1200 جنيه.',
    time: '15:40',
    date: 'اليوم'
  },
  {
    id: 5,
    senderId: 1,
    text: 'ما هي المواصفات التقنية لهذه المضخة؟',
    time: '15:42',
    date: 'اليوم'
  },
  {
    id: 6,
    senderId: 'vendor',
    text: 'تأتي بقوة 350 وات، وتدفق يصل إلى 3500 لتر/ساعة، وارتفاع ضخ حتى 3 متر. وهي تعمل بكفاءة عالية في الطاقة.',
    time: '15:45',
    date: 'اليوم'
  },
  {
    id: 7,
    senderId: 1,
    text: 'هل يمكنني استلامها غدًا؟ أو ما هي مدة الشحن؟',
    time: '15:50',
    date: 'اليوم'
  },
  {
    id: 8,
    senderId: 'vendor',
    text: 'نعم، يمكننا توصيلها غدًا إذا كنت في نطاق مدينة القاهرة الكبرى. أما باقي المحافظات فتستغرق من 2-3 أيام عمل.',
    time: '15:52',
    date: 'اليوم'
  },
  {
    id: 9,
    senderId: 1,
    text: 'ممتاز، أنا في القاهرة. هل يمكنني التحويل على رقم الحساب البنكي؟',
    time: '15:55',
    date: 'اليوم'
  },
  {
    id: 10,
    senderId: 'vendor',
    text: 'بالطبع! سأرسل لك تفاصيل الدفع الآن. يمكنك أيضًا الدفع عند الاستلام إذا كنت تفضل ذلك.',
    time: '15:58',
    date: 'اليوم'
  }
];

const VendorMessaging = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleMessageSend = () => {
    if (messageText.trim() === '') return;
    // Here we would send the message to the backend
    // For now, we'll just clear the input
    setMessageText('');
  };

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">الرسائل</h1>
          <p className="text-gray-500">إدارة المحادثات مع العملاء</p>
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row h-[calc(100vh-250px)]">
            {/* Contacts Sidebar */}
            <div className="w-full md:w-80 border-l">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="البحث عن محادثة..." 
                    className="pr-9"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(100%-65px)]">
                {filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={cn(
                      "flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedContact?.id === contact.id && "bg-gray-50"
                    )}
                  >
                    <div className="relative">
                      <img 
                        src={contact.avatar} 
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      {contact.status === 'online' && (
                        <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 mr-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">{contact.name}</span>
                        <span className="text-xs text-gray-500">{contact.time}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500 truncate w-40">{contact.lastMessage}</span>
                        {contact.unread > 0 && (
                          <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat Area */}
            {selectedContact ? (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between bg-white">
                  <div className="flex items-center">
                    <img 
                      src={selectedContact.avatar}
                      alt={selectedContact.name}
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div className="mr-3">
                      <h2 className="font-semibold">{selectedContact.name}</h2>
                      <p className="text-xs text-gray-500">
                        {selectedContact.status === 'online' ? 'متصل الآن' : 'غير متصل'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Button size="icon" variant="ghost">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {mockMessages.map((message) => {
                    const isVendor = message.senderId === 'vendor';
                    return (
                      <div key={message.id} className="mb-4">
                        <div className={cn(
                          "flex",
                          isVendor ? "justify-start" : "justify-end"
                        )}>
                          <div className={cn(
                            "max-w-[75%] rounded-lg p-3",
                            isVendor 
                              ? "bg-white border text-gray-800" 
                              : "bg-primary text-white"
                          )}>
                            <p>{message.text}</p>
                            <div className={cn(
                              "text-xs mt-1",
                              isVendor ? "text-gray-500" : "text-primary-foreground/80"
                            )}>
                              {message.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Message Input */}
                <div className="p-4 bg-white border-t">
                  <div className="flex items-center">
                    <Button size="icon" variant="ghost" className="ml-2">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="ml-2">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Textarea 
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-1 resize-none"
                      rows={1}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleMessageSend();
                        }
                      }}
                    />
                    <Button 
                      className="mr-2" 
                      onClick={handleMessageSend} 
                      disabled={messageText.trim() === ''}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">لا توجد محادثة مختارة</h3>
                  <p className="text-gray-500 max-w-sm">
                    اختر محادثة من القائمة للبدء في التواصل مع عملائك
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorMessaging;
