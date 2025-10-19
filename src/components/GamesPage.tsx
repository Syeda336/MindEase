import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Gamepad2, Trophy, Star, Clock, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GamesPageProps {
  onBack: () => void;
}

const games = [
  {
    id: "memory",
    title: "Memory Match",
    description: "Improve focus and concentration with this classic memory game",
    difficulty: "Easy",
    duration: "5-10 min",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: "puzzle",
    title: "Mindful Puzzle",
    description: "Relax your mind while solving beautiful jigsaw puzzles",
    difficulty: "Medium",
    duration: "10-15 min",
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: "coloring",
    title: "Color Therapy",
    description: "De-stress with therapeutic digital coloring",
    difficulty: "Easy",
    duration: "15-20 min",
    color: "from-green-400 to-teal-500"
  },
  {
    id: "word",
    title: "Word Search Calm",
    description: "Find words and find your calm with this relaxing word game",
    difficulty: "Easy",
    duration: "5-10 min",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: "sudoku",
    title: "Zen Sudoku",
    description: "Challenge your mind with number puzzles in a peaceful setting",
    difficulty: "Hard",
    duration: "15-20 min",
    color: "from-indigo-400 to-purple-500"
  },
  {
    id: "pattern",
    title: "Pattern Recognition",
    description: "Train your brain with engaging pattern matching exercises",
    difficulty: "Medium",
    duration: "10 min",
    color: "from-pink-400 to-rose-500"
  }
];

export default function GamesPage({ onBack }: GamesPageProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const startGame = (gameId: string) => {
    setSelectedGame(gameId);
    // Game logic would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Care Buddy
              </Button>
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-8 w-8 text-purple-600" />
                <span className="text-xl">Mini Games</span>
                <Badge variant="secondary" className="ml-2">Wellness Activities</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Score: {score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-500" />
                <span>Level: {level}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl text-gray-800 mb-4">Mindfulness Mini Games</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a break and boost your mental wellness with fun, relaxing games designed to reduce stress and improve focus
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1622617760286-e11b543f5ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBnYW1lcyUyMHB1enpsZXxlbnwxfHx8fDE3NTk0NzExNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Mini Games"
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card 
              key={game.id} 
              className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-purple-300"
            >
              <CardHeader>
                <div className={`w-full h-32 bg-gradient-to-br ${game.color} rounded-lg mb-4 flex items-center justify-center`}>
                  <Gamepad2 className="h-16 w-16 text-white" />
                </div>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{game.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{game.duration}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => startGame(game.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="mt-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Benefits of Mindfulness Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-800 mb-1">Reduce Stress</h3>
                  <p className="text-sm text-gray-600">Games help distract from anxious thoughts and promote relaxation</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-800 mb-1">Improve Focus</h3>
                  <p className="text-sm text-gray-600">Concentration games enhance attention and cognitive function</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-800 mb-1">Boost Mood</h3>
                  <p className="text-sm text-gray-600">Fun activities release endorphins and improve emotional state</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-800 mb-1">Build Resilience</h3>
                  <p className="text-sm text-gray-600">Regular practice strengthens mental flexibility and coping skills</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
