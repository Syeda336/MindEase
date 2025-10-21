import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft,
  Settings,
  Target,
  Calendar,
  Award,
  TrendingUp,
  Bell,
  Heart,
  Brain,
  Moon,
  BookOpen,
  Dumbbell,
  Clock,
  CheckCircle,
  Star,
  Gift,
  Users,
  MessageCircle,
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
  Shield,
  Palette,
  Volume2,
  Smartphone
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePageProps {
  onBack: () => void;
}

interface Goal {
  id: string;
  title: string;
  target: string;
  progress: number;
  icon: any;
  color: string;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: any;
  color: string;
  rarity: 'common' | 'rare' | 'epic';
}

interface Session {
  id: string;
  type: 'therapy' | 'meditation' | 'checkup';
  title: string;
  date: string;
  time: string;
  therapist?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const mockMoodData = [
  { day: 'Mon', mood: 7, anxiety: 4, energy: 6 },
  { day: 'Tue', mood: 8, anxiety: 3, energy: 7 },
  { day: 'Wed', mood: 6, anxiety: 5, energy: 5 },
  { day: 'Thu', mood: 9, anxiety: 2, energy: 8 },
  { day: 'Fri', mood: 8, anxiety: 3, energy: 7 },
  { day: 'Sat', mood: 9, anxiety: 2, energy: 9 },
  { day: 'Sun', mood: 7, anxiety: 4, energy: 6 }
];

const mockProgressData = [
  { month: 'Jan', sessions: 8, meditation: 450, journaling: 20 },
  { month: 'Feb', sessions: 10, meditation: 520, journaling: 25 },
  { month: 'Mar', sessions: 12, meditation: 680, journaling: 30 },
  { month: 'Apr', sessions: 15, meditation: 750, journaling: 28 }
];

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Sleep 8 hours daily',
    target: '8 hours',
    progress: 85,
    icon: Moon,
    color: 'bg-purple-100 text-purple-700',
    completed: false
  },
  {
    id: '2',
    title: 'Journal Daily',
    target: 'Every day',
    progress: 92,
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-700',
    completed: false
  },
  {
    id: '3',
    title: 'Exercise 3x/week',
    target: '3 sessions',
    progress: 100,
    icon: Dumbbell,
    color: 'bg-green-100 text-green-700',
    completed: true
  },
  {
    id: '4',
    title: 'Meditate 20 min/day',
    target: '20 minutes',
    progress: 78,
    icon: Brain,
    color: 'bg-teal-100 text-teal-700',
    completed: false
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '7 Days of Journaling Streak',
    description: 'Completed 7 consecutive days of journaling',
    date: '2024-01-15',
    icon: BookOpen,
    color: 'bg-blue-500',
    rarity: 'common'
  },
  {
    id: '2',
    title: 'First Therapy Session',
    description: 'Completed your first therapy session',
    date: '2024-01-10',
    icon: Users,
    color: 'bg-green-500',
    rarity: 'common'
  },
  {
    id: '3',
    title: 'Mindfulness Master',
    description: 'Completed 100 hours of meditation',
    date: '2024-01-20',
    icon: Brain,
    color: 'bg-purple-500',
    rarity: 'rare'
  },
  {
    id: '4',
    title: 'Wellness Warrior',
    description: 'Maintained all habits for 30 days',
    date: '2024-01-25',
    icon: Award,
    color: 'bg-yellow-500',
    rarity: 'epic'
  }
];

const mockSessions: Session[] = [
  {
    id: '1',
    type: 'therapy',
    title: 'Weekly Therapy Session',
    date: '2024-02-01',
    time: '2:00 PM',
    therapist: 'Dr. Sarah Johnson',
    status: 'upcoming'
  },
  {
    id: '2',
    type: 'meditation',
    title: 'Morning Mindfulness',
    date: '2024-01-30',
    time: '8:00 AM',
    status: 'upcoming'
  },
  {
    id: '3',
    type: 'checkup',
    title: 'Monthly Progress Review',
    date: '2024-02-05',
    time: '10:00 AM',
    therapist: 'Dr. Sarah Johnson',
    status: 'upcoming'
  }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
  name: '',
  email: '',
  age: '',
  phone: '',
  location: '',
  bio: '',
  memberSince: ''
});

// ✅ Fetch logged-in user info from Firebase Auth
useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        name: user.displayName || "Not provided",
        email: user.email || "Not provided",
        memberSince: user.metadata?.creationTime
          ? new Date(user.metadata.creationTime).toLocaleDateString()
          : "N/A",
      }));
    }
  });

  return () => unsubscribe();
}, []);


  const [notifications, setNotifications] = useState({
    therapy: true,
    meditation: true,
    habits: false,
    progress: true,
    achievements: true
  });

  const totalMeditationMinutes = mockProgressData.reduce((sum, month) => sum + month.meditation, 0);
  const totalSessions = mockProgressData.reduce((sum, month) => sum + month.sessions, 0);
  const averageMood = mockMoodData.reduce((sum, day) => sum + day.mood, 0) / mockMoodData.length;

  const completedGoals = mockGoals.filter(goal => goal.completed).length;
  const totalGoals = mockGoals.length;

  const moodDistribution = [
    { name: 'Great (8-10)', value: 35, color: '#10b981' },
    { name: 'Good (6-7)', value: 45, color: '#3b82f6' },
    { name: 'Okay (4-5)', value: 15, color: '#f59e0b' },
    { name: 'Low (1-3)', value: 5, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Care Buddy
              </Button>
              <div className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-green-600" />
                <div>
                  <h1 className="text-xl text-foreground">My Profile</h1>
                  <p className="text-sm text-muted-foreground">Your wellness journey</p>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Profile Settings</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
                      </div>
                      <div>
                        <Label>Age</Label>
                        <Input type="number" value={userData.age} onChange={(e) => setUserData({...userData, age: parseInt(e.target.value)})} />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea value={userData.bio} onChange={(e) => setUserData({...userData, bio: e.target.value})} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Therapy Reminders</p>
                          <p className="text-sm text-muted-foreground">Get notified about upcoming therapy sessions</p>
                        </div>
                        <Switch checked={notifications.therapy} onCheckedChange={(checked) => setNotifications({...notifications, therapy: checked})} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Meditation Reminders</p>
                          <p className="text-sm text-muted-foreground">Daily meditation practice reminders</p>
                        </div>
                        <Switch checked={notifications.meditation} onCheckedChange={(checked) => setNotifications({...notifications, meditation: checked})} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Habit Tracking</p>
                          <p className="text-sm text-muted-foreground">Reminders for daily wellness habits</p>
                        </div>
                        <Switch checked={notifications.habits} onCheckedChange={(checked) => setNotifications({...notifications, habits: checked})} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Progress Updates</p>
                          <p className="text-sm text-muted-foreground">Weekly progress summary notifications</p>
                        </div>
                        <Switch checked={notifications.progress} onCheckedChange={(checked) => setNotifications({...notifications, progress: checked})} />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="privacy" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-green-600" />
                          <div>
                            <p>Data Privacy</p>
                            <p className="text-sm text-muted-foreground">Your data is encrypted and secure</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Protected</Badge>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>• All personal data is encrypted using industry-standard protocols</p>
                        <p>• We never share your information with third parties</p>
                        <p>• You can export or delete your data at any time</p>
                        <p>• Session notes are only accessible by you and your assigned therapist</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Profile Banner */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1696354257272-bcadc48b280b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwcGVhY2VmdWwlMjBuYXR1cmUlMjBiYWNrZ3JvdW5kJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1OTEyNDc5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Peaceful mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Profile Photo */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmclMjBuYXR1cmFsJTIwbGlnaHRpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkxMjQ3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Profile photo" 
              />
              <AvatarFallback className="text-2xl">SM</AvatarFallback>
            </Avatar>
            <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-white text-gray-600 hover:bg-gray-50 border shadow-lg">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Info Card */}
        <div className="pt-20 pb-8">
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl mb-2">{userData.name}</h2>
              <div className="flex items-center justify-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {userData.age} years old
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {userData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Member since {userData.memberSince}
                </span>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">{userData.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl text-blue-600 mb-1">{totalSessions}</div>
                  <div className="text-sm text-muted-foreground">Therapy Sessions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl text-green-600 mb-1">{totalMeditationMinutes}</div>
                  <div className="text-sm text-muted-foreground">Meditation Minutes</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl text-purple-600 mb-1">{averageMood.toFixed(1)}/10</div>
                  <div className="text-sm text-muted-foreground">Average Mood</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="text-2xl text-yellow-600 mb-1">{mockAchievements.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 rounded-xl p-1">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="goals" className="gap-2">
              <Target className="h-4 w-4" />
              Goals & Habits
            </TabsTrigger>
            <TabsTrigger value="sessions" className="gap-2">
              <Calendar className="h-4 w-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-600" />
                    Weekly Mood Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={mockMoodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />
                      <Line type="monotone" dataKey="anxiety" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Mood</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Anxiety</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Energy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Mood Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={moodDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {moodDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    {moodDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Monthly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mockProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#3b82f6" name="Therapy Sessions" />
                      <Bar dataKey="journaling" fill="#10b981" name="Journal Entries" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    Quick Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm">Therapy session today</p>
                      <p className="text-xs text-muted-foreground">2:00 PM with Dr. Johnson</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Brain className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm">Morning meditation</p>
                      <p className="text-xs text-muted-foreground">Take 10 minutes to center yourself</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm">Journal reflection</p>
                      <p className="text-xs text-muted-foreground">How are you feeling today?</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-green-600" />
                        Wellness Goals ({completedGoals}/{totalGoals} completed)
                      </CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {Math.round((completedGoals / totalGoals) * 100)}% Complete
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockGoals.map((goal) => (
                      <div key={goal.id} className="p-4 border rounded-xl bg-gray-50/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${goal.color}`}>
                              <goal.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className={goal.completed ? 'line-through text-muted-foreground' : ''}>{goal.title}</h4>
                              <p className="text-sm text-muted-foreground">Target: {goal.target}</p>
                            </div>
                          </div>
                          {goal.completed && <CheckCircle className="h-6 w-6 text-green-600" />}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">Goal Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{value: (completedGoals / totalGoals) * 100}]}>
                          <RadialBar dataKey="value" fill="#10b981" />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl text-green-600">{completedGoals}</div>
                          <div className="text-xs text-muted-foreground">of {totalGoals}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      You're making great progress on your wellness journey!
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">Habit Tracker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-24 rounded-lg overflow-hidden mb-4">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1610540604745-3e96fba9ccef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMGdvYWxzJTIwdHJhY2tlciUyMGpvdXJuYWx8ZW58MXx8fHwxNzU5MTI0ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Mindfulness journal and goals"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm">Track your daily habits</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      <div className="text-center p-1">M</div>
                      <div className="text-center p-1">T</div>
                      <div className="text-center p-1">W</div>
                      <div className="text-center p-1">T</div>
                      <div className="text-center p-1">F</div>
                      <div className="text-center p-1">S</div>
                      <div className="text-center p-1">S</div>
                      {Array.from({length: 7}, (_, i) => (
                        <div key={i} className={`aspect-square rounded ${i < 5 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-xl bg-gray-50/50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            session.type === 'therapy' ? 'bg-blue-100 text-blue-700' :
                            session.type === 'meditation' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {session.type === 'therapy' && <Users className="h-5 w-5" />}
                            {session.type === 'meditation' && <Brain className="h-5 w-5" />}
                            {session.type === 'checkup' && <CheckCircle className="h-5 w-5" />}
                          </div>
                          <div>
                            <h4>{session.title}</h4>
                            <p className="text-sm text-muted-foreground">{session.date} at {session.time}</p>
                            {session.therapist && (
                              <p className="text-sm text-muted-foreground">with {session.therapist}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    Session History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-32 rounded-lg overflow-hidden mb-6">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1631972757546-a9c28c924c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwc2Vzc2lvbiUyMGNhbGVuZGFyJTIwYXBwb2ludG1lbnR8ZW58MXx8fHwxNzU5MTI0ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Therapy session calendar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white">Your wellness journey</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm">Last therapy session</p>
                        <p className="text-xs text-muted-foreground">January 25, 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Completed</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm">Meditation streak</p>
                        <p className="text-xs text-muted-foreground">7 days in a row</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="text-sm">Progress review</p>
                        <p className="text-xs text-muted-foreground">Monthly check-in</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Your Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockAchievements.map((achievement) => (
                        <div key={achievement.id} className="p-4 border rounded-xl bg-gradient-to-br from-white to-gray-50/50">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-full ${achievement.color} text-white`}>
                              <achievement.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4>{achievement.title}</h4>
                                <Badge variant="outline" className={`text-xs ${
                                  achievement.rarity === 'epic' ? 'border-yellow-500 text-yellow-700' :
                                  achievement.rarity === 'rare' ? 'border-purple-500 text-purple-700' :
                                  'border-gray-500 text-gray-700'
                                }`}>
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                              <p className="text-xs text-muted-foreground">Earned on {achievement.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">Achievement Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1614036417651-efe5912149d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjaGlldmVtZW50JTIwYmFkZ2UlMjBzdWNjZXNzfGVufDF8fHx8MTc1OTEyNDgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Achievement success"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm">Celebrate your progress</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Achievements</span>
                        <Badge className="bg-yellow-100 text-yellow-700">{mockAchievements.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Epic Badges</span>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          {mockAchievements.filter(a => a.rarity === 'epic').length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Rare Badges</span>
                        <Badge className="bg-purple-100 text-purple-700">
                          {mockAchievements.filter(a => a.rarity === 'rare').length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Common Badges</span>
                        <Badge className="bg-gray-100 text-gray-700">
                          {mockAchievements.filter(a => a.rarity === 'common').length}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Next Milestone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Gift className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="mb-2">30-Day Streak Master</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Complete all daily habits for 30 consecutive days
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>23/30 days</span>
                        </div>
                        <Progress value={76.7} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

