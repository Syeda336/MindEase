import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import HomeNavigation from "./HomeNavigation";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const mockData = [
  { name: "Mon", mood: 65 },
  { name: "Tue", mood: 75 },
  { name: "Wed", mood: 60 },
  { name: "Thu", mood: 80 },
  { name: "Fri", mood: 85 },
  { name: "Sat", mood: 70 },
  { name: "Sun", mood: 90 },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <HomeNavigation currentPage="homepage" onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Preview Section */}
        <Card className="mb-8 border-2 border-blue-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-700">Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Summary */}
              <div className="space-y-4">
                <h3 className="text-xl text-gray-700">Weekly Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Mood</span>
                    <span className="font-semibold text-blue-600">75%</span>
                  </div>
                  <Progress value={75} className="h-3" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Journal Entries</span>
                    <span className="font-semibold text-teal-600">12 this week</span>
                  </div>
                  <Progress value={60} className="h-3" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Care Buddy Sessions</span>
                    <span className="font-semibold text-green-600">8 sessions</span>
                  </div>
                  <Progress value={80} className="h-3" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Diet Plan Adherence</span>
                    <span className="font-semibold text-purple-600">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                
                <Button 
                  onClick={() => onNavigate('dashboard')} 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  View Details
                </Button>
              </div>
              
              {/* Right: Bar Chart */}
              <div>
                <h3 className="text-xl text-gray-700 mb-4">Weekly Mood Tracker</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="mood" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Care Buddy Section */}
        <Card className="mb-8 border-2 border-teal-200 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left: Picture */}
              <div className="flex justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1621887348744-6b0444f8a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBjYXJlJTIwYnVkZHl8ZW58MXx8fHwxNzU5NDY5NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Care Buddy"
                  className="rounded-2xl shadow-lg object-cover w-full h-80"
                />
              </div>
              
              {/* Right: Details */}
              <div className="space-y-4">
                <h2 className="text-3xl text-teal-700">AI Care Buddy</h2>
                <p className="text-gray-600">
                  Your personal mental health companion powered by AI. Get instant support, 
                  guidance, and compassionate conversations whenever you need it. Our Care Buddy 
                  is available 24/7 to listen, provide coping strategies, and help you navigate 
                  through difficult emotions.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>24/7 Availability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Voice & Text Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Personalized Guidance</span>
                  </div>
                </div>
                <Button 
                  onClick={() => onNavigate('carebuddy')} 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  Talk Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diet Plan Section */}
        <Card className="mb-8 border-2 border-green-200 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left: Details */}
              <div className="space-y-4">
                <h2 className="text-3xl text-green-700">Personalized Diet Plan</h2>
                <p className="text-gray-600">
                  Nutrition plays a crucial role in mental health. Our personalized diet plans 
                  are designed to support your mental wellbeing through balanced, nutritious meals. 
                  Track your food intake, discover healthy recipes, and build better eating habits.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Custom Meal Plans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Nutritional Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Healthy Recipe Database</span>
                  </div>
                </div>
                <Button 
                  onClick={() => onNavigate('dietplan')} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  View Diet Chart
                </Button>
              </div>
              
              {/* Right: Picture */}
              <div className="flex justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1670164745517-5b41d4660613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZGlldCUyMGZvb2R8ZW58MXx8fHwxNzU5NDY5NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Healthy Diet"
                  className="rounded-2xl shadow-lg object-cover w-full h-80"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Journal Section */}
        <Card className="mb-8 border-2 border-purple-200 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left: Picture */}
              <div className="flex justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1638953478022-5f3fe9c731c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGpvdXJuYWwlMjB3cml0aW5nfGVufDF8fHx8MTc1OTQ2OTQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Personal Journal"
                  className="rounded-2xl shadow-lg object-cover w-full h-80"
                />
              </div>
              
              {/* Right: Details */}
              <div className="space-y-4">
                <h2 className="text-3xl text-purple-700">Personal Journal</h2>
                <p className="text-gray-600">
                  Express your thoughts, emotions, and experiences in your private journal. 
                  Use voice typing, set personal reminders, and write messages to your future self. 
                  Journaling is a powerful tool for self-reflection and emotional processing.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>Voice Typing Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>Future Self Messaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>Task Reminders</span>
                  </div>
                </div>
                <Button 
                  onClick={() => onNavigate('journal')} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Open Personal Journal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
