import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  ArrowLeft,
  Search,
  Plus,
  Filter,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Bell,
  Apple,
  Wheat,
  Fish,
  Coffee,
  ChefHat,
  Trash2,
  Edit,
  Save,
  BarChart3,
  PieChart,
  Activity,
  Utensils,
  Brain
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PieChart as RechartsPieChart, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar } from 'recharts';

interface Food {
  id: string;
  name: string;
  category: 'fruits' | 'grains' | 'protein' | 'beverages' | 'vegetables' | 'dairy' | 'custom';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  sodium: number;
  vitaminC: number;
  calcium: number;
  iron: number;
  serving: string;
  image?: string;
}

interface DietPlan {
  id: string;
  name: string;
  description: string;
  foods: Food[];
  createdAt: Date;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
}

interface MealSlot {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  foods: Food[];
}

interface DietPlanPageProps {
  onBack: () => void;
}

const foodCategories = [
  { value: 'all', label: 'All Foods', icon: ChefHat },
  { value: 'fruits', label: 'Fruits', icon: Apple },
  { value: 'grains', label: 'Grains', icon: Wheat },
  { value: 'protein', label: 'Protein', icon: Fish },
  { value: 'beverages', label: 'Beverages', icon: Coffee },
  { value: 'vegetables', label: 'Vegetables', icon: Apple },
  { value: 'dairy', label: 'Dairy', icon: Coffee }
];

const mockFoodDatabase: Food[] = [
  {
    id: '1',
    name: 'Apple',
    category: 'fruits',
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fats: 0.3,
    fiber: 4,
    sugar: 19,
    sodium: 2,
    vitaminC: 8.4,
    calcium: 11,
    iron: 0.2,
    serving: '1 medium (182g)',
    image: 'https://images.unsplash.com/photo-1757332334757-4ae9658176ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGFwcGxlJTIwZnJ1aXQlMjBoZWFsdGh5fGVufDF8fHx8MTc1OTEyMzE0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    name: 'Chicken Breast',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    vitaminC: 0,
    calcium: 15,
    iron: 0.9,
    serving: '100g',
    image: 'https://images.unsplash.com/photo-1577194509876-4bb24787a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGJyZWFzdCUyMHByb3RlaW58ZW58MXx8fHwxNzU5MTIzMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '3',
    name: 'Brown Rice',
    category: 'grains',
    calories: 216,
    protein: 5,
    carbs: 45,
    fats: 1.8,
    fiber: 4,
    sugar: 0.7,
    sodium: 10,
    vitaminC: 0,
    calcium: 23,
    iron: 1.5,
    serving: '1 cup cooked (195g)',
    image: 'https://images.unsplash.com/photo-1714040292680-5a9ea419b6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMHJpY2UlMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NTkxMjMxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '4',
    name: 'Green Tea',
    category: 'beverages',
    calories: 2,
    protein: 0.5,
    carbs: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
    sodium: 2,
    vitaminC: 6,
    calcium: 5,
    iron: 0.2,
    serving: '1 cup (240ml)',
    image: 'https://images.unsplash.com/photo-1569022330085-7a11c7ec3ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRlYSUyMGN1cCUyMGhlYWx0aHklMjBkcmlua3xlbnwxfHx8fDE3NTkxMjMxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '5',
    name: 'Spinach',
    category: 'vegetables',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    sodium: 79,
    vitaminC: 28.1,
    calcium: 99,
    iron: 2.7,
    serving: '100g',
    image: 'https://images.unsplash.com/photo-1653301652759-62291a91f6a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwaW5hY2glMjBsZWF2ZXMlMjBncmVlbnxlbnwxfHx8fDE3NTkxMjMxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '6',
    name: 'Greek Yogurt',
    category: 'dairy',
    calories: 100,
    protein: 17,
    carbs: 6,
    fats: 0.4,
    fiber: 0,
    sugar: 6,
    sodium: 65,
    vitaminC: 0,
    calcium: 200,
    iron: 0.1,
    serving: '170g container',
    image: 'https://images.unsplash.com/photo-1670843838196-0c1c15e85d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHlvZ3VydCUyMGJvd2wlMjBoZWFsdGh5fGVufDF8fHx8MTc1OTEyMzE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const mockDietPlans: DietPlan[] = [
  {
    id: '1',
    name: 'Weight Loss Plan',
    description: 'Low-calorie, high-protein diet for healthy weight loss',
    foods: mockFoodDatabase.slice(0, 4),
    createdAt: new Date('2024-01-15'),
    targetCalories: 1500,
    targetProtein: 120,
    targetCarbs: 150,
    targetFats: 50
  },
  {
    id: '2',
    name: 'Muscle Gain Plan',
    description: 'High-protein, balanced macros for muscle building',
    foods: [mockFoodDatabase[1], mockFoodDatabase[2], mockFoodDatabase[5]],
    createdAt: new Date('2024-01-10'),
    targetCalories: 2500,
    targetProtein: 180,
    targetCarbs: 300,
    targetFats: 80
  }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function DietPlanPage({ onBack }: DietPlanPageProps) {
  const [activeTab, setActiveTab] = useState('database');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foodDatabase, setFoodDatabase] = useState<Food[]>(mockFoodDatabase);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [dietPlans, setDietPlans] = useState<DietPlan[]>(mockDietPlans);
  const [currentPlan, setCurrentPlan] = useState<DietPlan | null>(null);
  const [mealSlots, setMealSlots] = useState<MealSlot[]>([
    { id: '1', type: 'breakfast', time: '7:00 AM', foods: [] },
    { id: '2', type: 'lunch', time: '12:00 PM', foods: [] },
    { id: '3', type: 'dinner', time: '7:00 PM', foods: [] },
    { id: '4', type: 'snack', time: '3:00 PM', foods: [] }
  ]);

  const mealImages = {
    breakfast: 'https://images.unsplash.com/photo-1641130382532-2514a6c93859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0JTIwbWVhbCUyMHBsYW5uaW5nfGVufDF8fHx8MTc1OTEyMzE2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lunch: 'https://images.unsplash.com/photo-1744116432654-574391dbe3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5jaCUyMHBsYXRlJTIwaGVhbHRoeSUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTEyMzE2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    dinner: 'https://images.unsplash.com/photo-1656389863133-84c5dc407e98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5uZXIlMjBwbGF0ZSUyMHNhbG1vbiUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MTIzMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    snack: 'https://images.unsplash.com/photo-1671981200629-014c03829abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwbnV0cyUyMGZydWl0fGVufDF8fHx8MTc1OTEyMzE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'Time for your afternoon snack!', time: '3:00 PM', enabled: true },
    { id: '2', message: 'Don\'t forget to drink water', time: '2:00 PM', enabled: true },
    { id: '3', message: 'Lunch reminder', time: '12:00 PM', enabled: false }
  ]);

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateTotalNutrients = (foods: Food[]) => {
    return foods.reduce((total, food) => ({
      calories: total.calories + food.calories,
      protein: total.protein + food.protein,
      carbs: total.carbs + food.carbs,
      fats: total.fats + food.fats,
      fiber: total.fiber + food.fiber,
      sugar: total.sugar + food.sugar,
      sodium: total.sodium + food.sodium,
      vitaminC: total.vitaminC + food.vitaminC,
      calcium: total.calcium + food.calcium,
      iron: total.iron + food.iron
    }), {
      calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0,
      sodium: 0, vitaminC: 0, calcium: 0, iron: 0
    });
  };

  const handleAddFood = (food: Food) => {
    if (!selectedFoods.find(f => f.id === food.id)) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const handleRemoveFood = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(f => f.id !== foodId));
  };

  const createDietPlan = (name: string, description: string) => {
    const newPlan: DietPlan = {
      id: Date.now().toString(),
      name,
      description,
      foods: selectedFoods,
      createdAt: new Date(),
      targetCalories: 2000,
      targetProtein: 150,
      targetCarbs: 250,
      targetFats: 65
    };
    setDietPlans([...dietPlans, newPlan]);
    setCurrentPlan(newPlan);
    setSelectedFoods([]);
    setActiveTab('chart');
  };

  const planNutrients = currentPlan ? calculateTotalNutrients(currentPlan.foods) : null;
  const selectedNutrients = calculateTotalNutrients(selectedFoods);

  const macroData = planNutrients ? [
    { name: 'Protein', value: planNutrients.protein * 4, color: '#10b981' },
    { name: 'Carbs', value: planNutrients.carbs * 4, color: '#3b82f6' },
    { name: 'Fats', value: planNutrients.fats * 9, color: '#f59e0b' }
  ] : [];

  const weeklyData = [
    { day: 'Mon', calories: 1850, target: 2000 },
    { day: 'Tue', calories: 2100, target: 2000 },
    { day: 'Wed', calories: 1950, target: 2000 },
    { day: 'Thu', calories: 2050, target: 2000 },
    { day: 'Fri', calories: 1900, target: 2000 },
    { day: 'Sat', calories: 2200, target: 2000 },
    { day: 'Sun', calories: 1800, target: 2000 }
  ];

  const calorieProgress = planNutrients ? Math.min((planNutrients.calories / 2000) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
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
                <Utensils className="h-8 w-8 text-green-600" />
                <div>
                  <h1 className="text-xl text-foreground">Diet Plan Manager</h1>
                  <p className="text-sm text-muted-foreground">Create and manage your nutrition plans</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Activity className="h-3 w-3 mr-1" />
              Nutrition Focused
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-32 overflow-hidden">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1676300186581-6dbe4c15adb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGF0YWJhc2UlMjBpbmdyZWRpZW50cyUyMGhlYWx0aHl8ZW58MXx8fHwxNzU5MTIzMTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Healthy food ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl mb-2">Smart Nutrition Planning</h2>
            <p className="text-green-100">Discover, plan, and track your perfect diet</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 rounded-xl p-1">
            <TabsTrigger value="database" className="gap-2">
              <Search className="h-4 w-4" />
              Food Database
            </TabsTrigger>
            <TabsTrigger value="builder" className="gap-2">
              <Plus className="h-4 w-4" />
              Plan Builder
            </TabsTrigger>
            <TabsTrigger value="chart" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Diet Chart
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="gap-2">
              <Calendar className="h-4 w-4" />
              Meal Scheduler
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Food Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-green-600" />
                  Food Database
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search foods..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-400"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px] border-green-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {foodCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <category.icon className="h-4 w-4" />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4" />
                        Add Custom Food
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Custom Food</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Food Name</Label>
                          <Input placeholder="Enter food name" />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {foodCategories.slice(1).map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Calories (per serving)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label>Protein (g)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label>Carbs (g)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label>Fats (g)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div className="col-span-2">
                          <Label>Serving Size</Label>
                          <Input placeholder="e.g., 1 cup, 100g, 1 piece" />
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Add to Database
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-green-50/50">
                        <TableHead>Food</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Calories</TableHead>
                        <TableHead>Protein</TableHead>
                        <TableHead>Carbs</TableHead>
                        <TableHead>Fats</TableHead>
                        <TableHead>Fiber</TableHead>
                        <TableHead>Vitamin C</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFoods.map((food) => (
                        <TableRow key={food.id} className="hover:bg-green-50/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {food.image ? (
                                <ImageWithFallback 
                                  src={food.image} 
                                  alt={food.name}
                                  className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                  {food.category === 'fruits' && <Apple className="h-6 w-6 text-red-500" />}
                                  {food.category === 'grains' && <Wheat className="h-6 w-6 text-yellow-600" />}
                                  {food.category === 'protein' && <Fish className="h-6 w-6 text-blue-600" />}
                                  {food.category === 'beverages' && <Coffee className="h-6 w-6 text-brown-600" />}
                                  {food.category === 'vegetables' && <Apple className="h-6 w-6 text-green-600" />}
                                  {food.category === 'dairy' && <Coffee className="h-6 w-6 text-blue-400" />}
                                </div>
                              )}
                              <div>
                                <span className="font-medium">{food.name}</span>
                                <p className="text-xs text-muted-foreground">{food.serving}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {food.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{food.calories}</TableCell>
                          <TableCell>{food.protein}g</TableCell>
                          <TableCell>{food.carbs}g</TableCell>
                          <TableCell>{food.fats}g</TableCell>
                          <TableCell>{food.fiber}g</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{food.vitaminC}mg</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddFood(food)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                              disabled={selectedFoods.some(f => f.id === food.id)}
                            >
                              {selectedFoods.some(f => f.id === food.id) ? 'Added' : 'Add'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plan Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-blue-600" />
                      Selected Foods ({selectedFoods.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedFoods.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <ChefHat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No foods selected yet</p>
                        <p className="text-sm">Go to Food Database to add foods</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedFoods.map((food) => (
                          <div key={food.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {food.image ? (
                                <ImageWithFallback 
                                  src={food.image} 
                                  alt={food.name}
                                  className="w-12 h-12 rounded-lg object-cover border border-white shadow-sm"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                  {food.category === 'fruits' && <Apple className="h-6 w-6 text-red-500" />}
                                  {food.category === 'grains' && <Wheat className="h-6 w-6 text-yellow-600" />}
                                  {food.category === 'protein' && <Fish className="h-6 w-6 text-blue-600" />}
                                  {food.category === 'beverages' && <Coffee className="h-6 w-6 text-brown-600" />}
                                  {food.category === 'vegetables' && <Apple className="h-6 w-6 text-green-600" />}
                                  {food.category === 'dairy' && <Coffee className="h-6 w-6 text-blue-400" />}
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{food.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {food.calories} cal • {food.protein}g protein • {food.serving}
                                </p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleRemoveFood(food.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">Nutrition Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl text-blue-600">{selectedNutrients.calories}</p>
                        <p className="text-muted-foreground">Calories</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl text-green-600">{selectedNutrients.protein.toFixed(1)}g</p>
                        <p className="text-muted-foreground">Protein</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <p className="text-2xl text-yellow-600">{selectedNutrients.carbs.toFixed(1)}g</p>
                        <p className="text-muted-foreground">Carbs</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl text-orange-600">{selectedNutrients.fats.toFixed(1)}g</p>
                        <p className="text-muted-foreground">Fats</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">Create Diet Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Plan Name</Label>
                      <Input placeholder="e.g., Weight Loss Plan" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Brief description of your diet plan" />
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={selectedFoods.length === 0}
                      onClick={() => createDietPlan("New Diet Plan", "Custom diet plan")}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Diet Chart Tab */}
          <TabsContent value="chart" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="text-lg">Saved Plans</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dietPlans.map((plan) => (
                    <div 
                      key={plan.id} 
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentPlan?.id === plan.id ? 'bg-blue-100 border-blue-200 border' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentPlan(plan)}
                    >
                      <p className="text-sm">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">{plan.foods.length} foods</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-6">
                {currentPlan && (
                  <>
                    <Card className="shadow-lg border-0 bg-white/90">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-blue-600" />
                            {currentPlan.name}
                          </CardTitle>
                          <Badge className="bg-blue-100 text-blue-700">{planNutrients?.calories} calories</Badge>
                        </div>
                        <div className="relative h-20 rounded-lg overflow-hidden mt-3">
                          <ImageWithFallback 
                            src="https://images.unsplash.com/photo-1670698783848-5cf695a1b308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBkaWV0JTIwcGxhbiUyMGNoYXJ0fGVufDF8fHx8MTc1OTEyMzE3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Nutrition plan chart"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/70"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white text-sm">Nutritional Analysis & Tracking</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="daily" className="space-y-4">
                          <TabsList>
                            <TabsTrigger value="daily">Daily View</TabsTrigger>
                            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="daily" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="mb-4">Macronutrient Distribution</h4>
                                <ResponsiveContainer width="100%" height={250}>
                                  <RechartsPieChart>
                                    <Pie
                                      data={macroData}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={80}
                                      dataKey="value"
                                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                      {macroData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                  </RechartsPieChart>
                                </ResponsiveContainer>
                              </div>

                              <div className="space-y-4">
                                <h4>Calorie Progress</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Daily Calories</span>
                                      <span>{planNutrients?.calories}/2000</span>
                                    </div>
                                    <Progress value={calorieProgress} className="h-3" />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Protein</span>
                                      <span>{planNutrients?.protein.toFixed(1)}g/150g</span>
                                    </div>
                                    <Progress value={(planNutrients?.protein || 0) / 150 * 100} className="h-3" />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Carbs</span>
                                      <span>{planNutrients?.carbs.toFixed(1)}g/250g</span>
                                    </div>
                                    <Progress value={(planNutrients?.carbs || 0) / 250 * 100} className="h-3" />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Fats</span>
                                      <span>{planNutrients?.fats.toFixed(1)}g/65g</span>
                                    </div>
                                    <Progress value={(planNutrients?.fats || 0) / 65 * 100} className="h-3" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-4">Food Breakdown</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {currentPlan.foods.map((food) => (
                                  <div key={food.id} className="p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                      {food.image ? (
                                        <ImageWithFallback 
                                          src={food.image} 
                                          alt={food.name}
                                          className="w-10 h-10 rounded-lg object-cover border border-white"
                                        />
                                      ) : (
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                                          {food.category === 'fruits' && <Apple className="h-5 w-5 text-red-500" />}
                                          {food.category === 'grains' && <Wheat className="h-5 w-5 text-yellow-600" />}
                                          {food.category === 'protein' && <Fish className="h-5 w-5 text-blue-600" />}
                                          {food.category === 'beverages' && <Coffee className="h-5 w-5 text-brown-600" />}
                                          {food.category === 'vegetables' && <Apple className="h-5 w-5 text-green-600" />}
                                          {food.category === 'dairy' && <Coffee className="h-5 w-5 text-blue-400" />}
                                        </div>
                                      )}
                                      <span className="text-sm font-medium">{food.name}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground space-y-1">
                                      <p>{food.calories} calories</p>
                                      <p>P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="weekly">
                            <div>
                              <h4 className="mb-4">Weekly Calorie Tracking</h4>
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={weeklyData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="day" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="calories" fill="#3b82f6" name="Actual" />
                                  <Bar dataKey="target" fill="#10b981" name="Target" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Meal Scheduler Tab */}
          <TabsContent value="scheduler" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Meal Scheduling Board
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Drag and drop foods into meal slots to create your daily schedule
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mealSlots.map((slot) => (
                    <div key={slot.id} className="space-y-3">
                      <div className="relative overflow-hidden rounded-lg">
                        <ImageWithFallback 
                          src={mealImages[slot.type]} 
                          alt={`${slot.type} meal`}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{slot.time}</span>
                          </div>
                          <h3 className="capitalize font-medium">{slot.type}</h3>
                        </div>
                      </div>
                      
                      <div className="min-h-[200px] p-3 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                        {slot.foods.length === 0 ? (
                          <div className="text-center text-muted-foreground py-8">
                            <ChefHat className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">Drop foods here</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {slot.foods.map((food) => (
                              <div key={food.id} className="flex items-center gap-2 p-2 bg-white rounded border text-sm">
                                {food.image ? (
                                  <ImageWithFallback 
                                    src={food.image} 
                                    alt={food.name}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                                    {food.category === 'fruits' && <Apple className="h-3 w-3 text-red-500" />}
                                    {food.category === 'grains' && <Wheat className="h-3 w-3 text-yellow-600" />}
                                    {food.category === 'protein' && <Fish className="h-3 w-3 text-blue-600" />}
                                    {food.category === 'beverages' && <Coffee className="h-3 w-3 text-brown-600" />}
                                    {food.category === 'vegetables' && <Apple className="h-3 w-3 text-green-600" />}
                                    {food.category === 'dairy' && <Coffee className="h-3 w-3 text-blue-400" />}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{food.name}</p>
                                  <p className="text-xs text-muted-foreground">{food.calories} cal</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-blue-600" />
                    Daily Totals
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-2xl text-blue-600">0</p>
                      <p className="text-muted-foreground">Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-green-600">0g</p>
                      <p className="text-muted-foreground">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-yellow-600">0g</p>
                      <p className="text-muted-foreground">Carbs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-orange-600">0g</p>
                      <p className="text-muted-foreground">Fats</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg border-0 bg-white/90">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Progress Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="mb-4">Weekly Nutrient Balance</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{value: 85}]}>
                              <RadialBar dataKey="value" fill="#10b981" />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm">85%</span>
                          </div>
                        </div>
                        <p className="text-sm">Goal Achievement</p>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{value: 92}]}>
                              <RadialBar dataKey="value" fill="#3b82f6" />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm">92%</span>
                          </div>
                        </div>
                        <p className="text-sm">Consistency</p>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{value: 78}]}>
                              <RadialBar dataKey="value" fill="#8b5cf6" />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm">78%</span>
                          </div>
                        </div>
                        <p className="text-sm">Nutrition Balance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    Reminders & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <Switch 
                        checked={notification.enabled}
                        onCheckedChange={(checked) => {
                          setNotifications(notifications.map(n => 
                            n.id === notification.id ? {...n, enabled: checked} : n
                          ));
                        }}
                      />
                    </div>
                  ))}
                  
                  <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    Add New Reminder
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}