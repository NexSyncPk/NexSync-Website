import { useAuth } from "../contexts/AuthContext";
import {
  BarChart3,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Calendar,
  Activity,
  Award,
  Target,
  MessageSquare,
  Globe,
  ChevronRight,
  Eye,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Jobs Management",
      description: "Manage job postings, applications, and recruitment process",
      icon: Briefcase,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      features: ["Current Jobs", "Archived Jobs", "Application Overview"],
      route: "/JobsManagement/ApplicationOverview",
    },
    {
      title: "Media Management",
      description: "Control website content, images, and media assets",
      icon: Globe,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      features: ["Homepage Content", "About Page", "Contact Page"],
      route: "/MediaManagement/HomePage",
    },
    {
      title: "Analytics & Reports",
      description: "Track performance metrics and generate insights",
      icon: BarChart3,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
      features: ["Traffic Analysis", "User Engagement", "Application Stats"],
      route: "/Analytics/AppliedJobs",
    },
    {
      title: "User Management",
      description: "Manage admin users and access permissions",
      icon: Users,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
      features: ["Admin Users", "Role Management", "Access Control"],
      route: "/admin/users",
    },
  ];

  const quickStats = [
    {
      label: "Total Applications",
      value: "247",
      change: "+12%",
      icon: FileText,
    },
    { label: "Active Jobs", value: "15", change: "+3", icon: Briefcase },
    { label: "Page Views", value: "12.5K", change: "+18%", icon: Eye },
    { label: "Response Rate", value: "85%", change: "+5%", icon: Target },
  ];

  const recentActivities = [
    {
      action: "New job application received",
      time: "2 minutes ago",
      type: "application",
    },
    { action: "Homepage content updated", time: "1 hour ago", type: "content" },
    { action: "New job posting published", time: "3 hours ago", type: "job" },
    { action: "Analytics report generated", time: "1 day ago", type: "report" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.email?.split("@")[0] || "Admin"}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your platform today
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Notifications
              </Button> */}
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Management Cards */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Management Center
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboardCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate(card.route)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 ${card.lightColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Icon className={`w-6 h-6 ${card.textColor}`} />
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {card.description}
                      </p>

                      <div className="space-y-2">
                        {card.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-sm text-gray-500"
                          >
                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Activity
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate("/JobsManagement/CurrentJobs")}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Create New Job
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate("/Analytics/AppliedJobs")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate("/MediaManagement/HomePage")}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Update Content
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Platform Overview
              </h3>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">↗ 23%</p>
                <p className="text-sm text-gray-600">Application Growth</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-sm text-gray-600">System Uptime</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">4.8/5</p>
                <p className="text-sm text-gray-600">User Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
