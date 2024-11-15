"use client"
import React from 'react';
import { Calendar, Phone, Mail, Weight, Clock, Trophy, MapPin, User2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import profileimg from "./profileimg.jpg"
import { StaticImageData } from 'next/image';

// Types and Interfaces
type Gender = 'male' | 'female' | 'other';

interface WeightRecord {
  date: string;
  weight: number;
}

interface PaymentRecord {
  dueDate: string;
  status: 'paid' | 'unpaid';
}

interface WeightData {
  current: number;
  goal: number;
  history: WeightRecord[];
}

interface MembershipData {
  type: string;
  payments: PaymentRecord[];
}

interface UserData {
  name: string;
  image:string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  gender: Gender;
  weight: WeightData;
  membership: MembershipData;
}

interface PaymentHistoryItem {
  dueDate: Date;
  status: 'paid' | 'unpaid';
}

const aboutPerson: React.FC = () => {
  // Sample user data with proper typing
  const user: UserData = {
    name: "John Smith",
    image:"",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fitness Street, Gym City",
    joinDate: "2024-01-15",
    gender: "female", // New gender field
    weight: {
      current: 75,
      goal: 70,
      history: [
        { date: "2024-01-15", weight: 80 },
        { date: "2024-02-15", weight: 78 },
        { date: "2024-03-15", weight: 75 }
      ]
    },
    membership: {
      type: "Premium",
      payments: [
        { dueDate: "2024-01-15", status: "paid" },
        { dueDate: "2024-02-15", status: "paid" },
        { dueDate: "2024-03-15", status: "unpaid" }
      ]
    }
  };

  // Function to get gender-specific gradient
  const getGenderGradient = (gender: Gender): string => {
    switch (gender) {
      case 'male':
        return 'from-blue-600 to-blue-400';
      case 'female':
        return 'from-pink-600 to-pink-400';
      default:
        return 'from-purple-600 to-purple-400';
    }
  };

  const generatePaymentHistory = (joinDate: string): PaymentHistoryItem[] => {
    const startDate = new Date(joinDate);
    const currentDate = new Date();
    const payments: PaymentHistoryItem[] = [];
    let currentMonth = new Date(startDate);

    while (currentMonth <= currentDate) {
      const paymentRecord = user.membership.payments.find(payment =>
        new Date(payment.dueDate).getMonth() === currentMonth.getMonth() &&
        new Date(payment.dueDate).getFullYear() === currentMonth.getFullYear()
      );

      payments.push({
        dueDate: new Date(currentMonth),
        status: paymentRecord ? paymentRecord.status : 'unpaid'
      });

      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return payments;
  };

  const paymentHistory = generatePaymentHistory(user.joinDate);

  // Type for contact items
  interface ContactItem {
    icon: React.ReactNode;
    value: string;
  }

  // Contact items array with proper typing
  const contactItems: ContactItem[] = [
    { icon: <User2 className="w-4 h-4" />, value: user.gender.charAt(0).toUpperCase() + user.gender.slice(1) },
    { icon: <Phone className="w-4 h-4" />, value: user.phone },
    { icon: <Mail className="w-4 h-4" />, value: user.email },
    { icon: <MapPin className="w-4 h-4" />, value: user.address }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start animate-fadeIn">
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden transition-transform duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className={`aspect-square rounded-full overflow-hidden mb-4 border-4 transform hover:rotate-6 transition-transform duration-300 border-${user.gender === 'male' ? 'blue' : 'pink'}-500`}>
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h2 className={`text-2xl font-bold text-center mb-2 bg-gradient-to-r ${getGenderGradient(user.gender)} bg-clip-text text-transparent`}>
                {user.name}
              </h2>
              <div className="flex justify-center gap-2 text-sm">
                <Trophy className={`w-4 h-4 ${user.gender === 'male' ? 'text-blue-500' : 'text-pink-500'} animate-pulse`} />
                <span className={`${user.gender === 'male' ? 'text-blue-600' : 'text-pink-600'} font-medium`}>
                  {user.membership.type} Member
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          {/* Contact Information */}
          <Card className="transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-100">
            <CardHeader>
              <CardTitle className="text-gradient">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r ${index === 0
                      ? user.gender === 'male'
                        ? 'hover:from-blue-50 hover:to-blue-100'
                        : 'hover:from-pink-50 hover:to-pink-100'
                      : 'hover:from-purple-50 hover:to-blue-50'
                    } group`}
                >
                  <span className={`transition-colors duration-300 ${index === 0
                      ? user.gender === 'male'
                        ? 'text-blue-500 group-hover:text-blue-600'
                        : 'text-pink-500 group-hover:text-pink-600'
                      : 'text-purple-500 group-hover:text-purple-600'
                    }`}>
                    {item.icon}
                  </span>
                  <span className="group-hover:text-purple-700 transition-colors duration-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rest of the component remains the same... */}
          {/* Weight Tracking */}
          <Card className="transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-100">
            {/* ... Weight tracking content ... */}
            <CardHeader>
              <CardTitle className="text-gradient">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-sm text-purple-600">Current</div>
                  <div className="text-xl font-bold flex items-center gap-2 text-purple-700">
                    <Weight className="w-4 h-4" />
                    {user.weight.current} kg
                  </div>
                </div>
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-sm text-blue-600">Goal</div>
                  <div className="text-xl font-bold text-blue-600">{user.weight.goal} kg</div>
                </div>
              </div>
              <div className="space-y-2">
                {user.weight.history.map((record) => (
                  <div
                    key={record.date}
                    className="flex justify-between items-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-50"
                  >
                    <span className="text-sm text-purple-600">{record.date}</span>
                    <span className="font-medium text-blue-600">{record.weight} kg</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment History and Join Date sections remain the same... */}
      <Card className="transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-100">
        <CardHeader>
          <CardTitle className="text-gradient">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentHistory.map((payment, index) => {
              const formattedDate = payment.dueDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${payment.status === 'paid'
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-green-100'
                      : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 hover:shadow-red-100'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">{formattedDate}</div>
                      <div className={`font-medium ${payment.status === 'paid'
                          ? 'text-emerald-600'
                          : 'text-rose-600'
                        }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </div>
                    </div>
                    <Calendar className={`w-5 h-5 transition-transform duration-300 hover:scale-110 ${payment.status === 'paid'
                        ? 'text-emerald-500'
                        : 'text-rose-500'
                      }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* Join Date */}
      <div className="flex items-center justify-center gap-2 p-4 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
        <Clock className="w-4 h-4 text-purple-500" />
        <span className="text-purple-700 font-medium">
          Member since {new Date(user.joinDate).toLocaleDateString()}
        </span>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .text-gradient {
          background: linear-gradient(to right, #8B5CF6, #3B82F6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default aboutPerson;