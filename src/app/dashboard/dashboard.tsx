'use client'

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, CreditCard, Wallet, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { getDashboardData } from '@/lib/dashboardQueries';
import Loader from '@/components/ui/Loader';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

interface Transaction {
  personName: string;
  amount: number;
  paymentDate: string;
  mode: string;
}

interface SummaryCardProps {
  title: string;
  value: string | number; 
  trend: number; 
  icon: React.ReactNode; 
}

interface StatProps {
  label: string; 
  value: string | number;
}

interface TransactionProps {
  name: string;    
  amount: number | string; 
  date: string;   
  type: string;   
}

interface QuickActionButtonProps {
  label: string; 
}

const Dashboard = () => {
  const supabase = createClient();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Security & Password Lock state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  useEffect(() => {
    // Check if dashboard was previously unlocked in current session
    const unlocked = sessionStorage.getItem('dashboard_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    async function fetchDashboardData() {
      if (isUnlocked) {
        setIsLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, [isUnlocked]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    try {
      // Get current authenticated user's email
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user?.email) {
        setAuthError('Authentication error. Please log in again.');
        setIsVerifying(false);
        return;
      }

      // Verify password using Supabase Auth
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password,
      });

      if (signInError) {
        setAuthError('Incorrect password. Access denied.');
      } else {
        // Successfully authenticated
        sessionStorage.setItem('dashboard_unlocked', 'true');
        setIsUnlocked(true);
        setPassword('');
      }
    } catch (err) {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLockDashboard = () => {
    sessionStorage.removeItem('dashboard_unlocked');
    setIsUnlocked(false);
    setPassword('');
  };

  // Password Lock Screen if not unlocked
  if (!isUnlocked) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
        <div className="w-full max-w-md p-8 bg-white dark:bg-black rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-950/60 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Protected
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Enter your account login password to access the Gym Dashboard statistics.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative text-left">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                Account Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200 dark:border-red-900">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying || !password}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader/>
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="p-4 text-center">Error loading dashboard data. Please try again later.</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 dark:bg-zinc-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gym Dashboard</h1>
        <button
          onClick={handleLockDashboard}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs font-medium transition-colors"
          title="Lock Dashboard"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock Dashboard</span>
        </button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          title="Total Earnings"
          value={`₹${dashboardData.totalEarnings.toLocaleString()}`}
          trend={12}
          icon={<DollarSign className="h-6 w-6 text-purple-600" />}
        />
        <SummaryCard
          title="UPI Payments"
          value={`₹${dashboardData.upiEarnings.toLocaleString()}`}
          trend={8}
          icon={<CreditCard className="h-6 w-6 text-blue-600" />}
        />
        <SummaryCard
          title="Cash Payments"
          value={`₹${dashboardData.cashEarnings.toLocaleString()}`}
          trend={-3}
          icon={<Wallet className="h-6 w-6 text-green-600" />}
        />
        <SummaryCard
          title="Active Members"
          value={dashboardData.paidMembers.toString()}
          trend={5}
          icon={<Users className="h-6 w-6 text-indigo-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-black p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="upi" fill="#8884d8" name="UPI" />
              <Bar dataKey="cash" fill="#82ca9d" name="Cash" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-black p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Member Statistics</h2>
          <div className="space-y-4">
            <Stat label="Total Members" value={dashboardData.totalMembers.toString()} />
            <Stat label="New Members This Month" value={dashboardData.newMembersThisMonth.toString()} />
            <Stat label="Paid Members" value={dashboardData.paidMembers.toString()} />
            <Stat label="Unpaid Members" value={dashboardData.unpaidMembers.toString()} />
          </div>
        </div>
      </div>

      {/* Recent Transactions and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-black p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
          <div className="space-y-2">
            {dashboardData.recentTransactions.map((transaction: Transaction , index:number) => (
              <Transaction
                key={index}
                name={transaction.personName}
                amount={transaction.amount}
                date={transaction.paymentDate}
                type={transaction.mode}
              />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-black p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/AddPerson"><QuickActionButton label="Add Member" /></Link>
            <Link href="#"><QuickActionButton label="Notification" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard : React.FC<SummaryCardProps> = ({ title, value, trend, icon }) => (
  <div className="bg-white dark:bg-black p-4 rounded-lg shadow">
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm font-medium text-gray-500 dark:text-white">{title}</div>
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-800 dark:text-white">{value}</div>
    <div className={`flex items-center text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {trend >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
      <span>{Math.abs(trend)}% from last month</span>
    </div>
  </div>
);

const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 dark:text-white">{label}</span>
    <span className="font-semibold text-gray-800 dark:text-white">{value}</span>
  </div>
);

const Transaction:React.FC<TransactionProps> = ({ name, amount, date, type }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100 dark:border-zinc-800">
    <div>
      <div className="font-medium text-gray-800 dark:text-white">{name}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{date}</div>
    </div>
    <div className="text-right">
      <div className="font-medium text-gray-800 dark:text-white">₹{amount}</div>
      <div className={`text-sm ${type === 'UPI' ? 'text-purple-600 dark:text-purple-400' : 'text-green-600 dark:text-green-400'}`}>{type}</div>
    </div>
  </div>
);

const QuickActionButton:React.FC<QuickActionButtonProps> = ({ label }) => (
  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition duration-300 w-full">
    {label}
  </button>
);

export default Dashboard;
