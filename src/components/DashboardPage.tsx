import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import HomeNavigation from "./HomeNavigation";
import { Activity, TrendingUp, Heart, Calendar, Clock } from "lucide-react";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const moodData = [
  { name: "Mon", mood: 65, anxiety: 35, stress: 40 },
  { name: "Tue", mood: 75, anxiety: 30, stress: 35 },
  { name: "Wed", mood: 60, anxiety: 45, stress: 50 },
  { name: "Thu", mood: 80, anxiety: 25, stress: 30 },
  { name: "Fri", mood: 85, anxiety: 20, stress: 25 },
  { name: "Sat", mood: 70, anxiety: 30, stress: 35 },
  { name: "Sun", mood: 90, anxiety: 15, stress: 20 },
];

const activityData = [
  { name: "Journal", value: 35 },
  { name: "Care Buddy", value: 30 },
  { name: "Mini Games", value: 20 },
  { name: "Diet Tracking", value: 15 },
];

const COLORS = ['#8b5cf6', '#14b8a6', '#3b82f6', '#10b981'];

const monthlyProgress = [
  { month: "Sep", score: 55 },
  { month: "Oct", score: 62 },
  { month: "Nov", score: 68 },
  { month: "Dec", score: 72 },
  { month: "Jan", score: 78 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 82 },
];

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <HomeNavigation currentPage="dashboard" onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl text-gray-800 mb-2">Mental Health Dashboard</h1>
          <p className="text-gray-600">Track your progress and wellbeing metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Current Mood</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">Excellent</div>
              <Progress value={90} className="mt-2 h-2" />
              <p className="text-xs text-gray-600 mt-2">+15% from last week</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Weekly Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-teal-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">24</div>
              <Progress value={75} className="mt-2 h-2" />
              <p className="text-xs text-gray-600 mt-2">8 more than last week</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Journal Entries</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">12</div>
              <Progress value={60} className="mt-2 h-2" />
              <p className="text-xs text-gray-600 mt-2">Consistent this week</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Overall Health</CardTitle>
              <Heart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">85%</div>
              <Progress value={85} className="mt-2 h-2" />
              <p className="text-xs text-gray-600 mt-2">Great progress!</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Mood Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Tracker</CardTitle>
              <CardDescription>Your mood patterns over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mood" fill="#3b82f6" name="Mood Score" />
                    <Bar dataKey="anxiety" fill="#f59e0b" name="Anxiety" />
                    <Bar dataKey="stress" fill="#ef4444" name="Stress" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Distribution</CardTitle>
              <CardDescription>How you're spending your wellness time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Progress Trend</CardTitle>
            <CardDescription>Your mental health score over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#14b8a6" 
                    strokeWidth={3}
                    name="Wellbeing Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest wellness activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Care Buddy Session</p>
                  <p className="text-sm text-gray-600">Discussed anxiety management techniques</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="font-medium">Journal Entry</p>
                  <p className="text-sm text-gray-600">Reflected on today's positive moments</p>
                </div>
                <span className="text-sm text-gray-500">5 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Diet Plan Update</p>
                  <p className="text-sm text-gray-600">Logged healthy breakfast and lunch</p>
                </div>
                <span className="text-sm text-gray-500">8 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-teal-50 rounded-lg">
                <Clock className="h-5 w-5 text-teal-600" />
                <div className="flex-1">
                  <p className="font-medium">Mini Game Session</p>
                  <p className="text-sm text-gray-600">Completed relaxation breathing exercise</p>
                </div>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
