import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Award, CreditCard, CheckCircle, TrendingUp, Activity, DollarSign } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalCertificatesIssued: 0,
    totalCertificatesVerified: 0,
    totalTransactions: 0,
    totalRevenue: 0,
    recentUsers: []
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch users from your API
      const userResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const userData = await userResponse.json();

      // For now, using dummy data for other stats
      // You can replace these with actual API calls later
      setStats({
        totalUsers: userData.count || 0,
        totalCourses: 25, // Dummy - replace with actual API
        totalEnrollments: 342, // Dummy - replace with actual API
        totalCertificatesIssued: 156, // Dummy - replace with actual API
        totalCertificatesVerified: 142, // Dummy - replace with actual API
        totalTransactions: 289, // Dummy - replace with actual API
        totalRevenue: 45670, // Dummy - replace with actual API
        recentUsers: userData.data?.slice(0, 5) || []
      });

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
      description: "Active users"
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "bg-green-500",
      change: "+8%",
      description: "Available courses"
    },
    {
      title: "Course Enrollments",
      value: stats.totalEnrollments,
      icon: TrendingUp,
      color: "bg-purple-500",
      change: "+23%",
      description: "Total enrollments"
    },
    {
      title: "Certificates Issued",
      value: stats.totalCertificatesIssued,
      icon: Award,
      color: "bg-orange-500",
      change: "+15%",
      description: "Certificates generated"
    },
    {
      title: "Verified Certificates",
      value: stats.totalCertificatesVerified,
      icon: CheckCircle,
      color: "bg-emerald-500",
      change: "+18%",
      description: "Successfully verified"
    },
    {
      title: "Total Transactions",
      value: stats.totalTransactions,
      icon: CreditCard,
      color: "bg-pink-500",
      change: "+10%",
      description: "Payment transactions"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-cyan-500",
      change: "+25%",
      description: "Revenue generated"
    },
    {
      title: "Platform Activity",
      value: "95%",
      icon: Activity,
      color: "bg-indigo-500",
      change: "+5%",
      description: "User engagement"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {card.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-xs text-gray-500">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Newly registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentUsers.length > 0 ? (
                  stats.recentUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No recent users</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Statistics</CardTitle>
              <CardDescription>Key metrics overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium">Certificates/User</span>
                  </div>
                  <span className="text-sm font-bold">
                    {stats.totalUsers > 0 ? (stats.totalCertificatesIssued / stats.totalUsers).toFixed(1) : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Verification Rate</span>
                  </div>
                  <span className="text-sm font-bold">
                    {stats.totalCertificatesIssued > 0 
                      ? ((stats.totalCertificatesVerified / stats.totalCertificatesIssued) * 100).toFixed(0) 
                      : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">Avg. Enrollments/Course</span>
                  </div>
                  <span className="text-sm font-bold">
                    {stats.totalCourses > 0 ? (stats.totalEnrollments / stats.totalCourses).toFixed(1) : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-medium">Avg. Transaction Value</span>
                  </div>
                  <span className="text-sm font-bold">
                    ${stats.totalTransactions > 0 ? (stats.totalRevenue / stats.totalTransactions).toFixed(0) : 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Server Uptime</span>
                  <span className="font-medium text-green-600">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">API Response Time</span>
                  <span className="font-medium text-blue-600">145ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Storage Used</span>
                  <span className="font-medium text-orange-600">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;
