import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ArrowLeft, Wind, Play, Pause, RotateCcw, Timer } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BreathingExercisesPageProps {
  onBack: () => void;
}

const exercises = [
  {
    id: "box",
    title: "Box Breathing",
    description: "4-4-4-4 breathing pattern used by Navy SEALs for stress relief",
    duration: "5 min",
    steps: [
      { phase: "Inhale", duration: 4, color: "bg-blue-400" },
      { phase: "Hold", duration: 4, color: "bg-purple-400" },
      { phase: "Exhale", duration: 4, color: "bg-teal-400" },
      { phase: "Hold", duration: 4, color: "bg-green-400" }
    ]
  },
  {
    id: "478",
    title: "4-7-8 Breathing",
    description: "Dr. Weil's relaxation technique for quick calm",
    duration: "3 min",
    steps: [
      { phase: "Inhale", duration: 4, color: "bg-blue-400" },
      { phase: "Hold", duration: 7, color: "bg-purple-400" },
      { phase: "Exhale", duration: 8, color: "bg-teal-400" }
    ]
  },
  {
    id: "deep",
    title: "Deep Belly Breathing",
    description: "Diaphragmatic breathing for deep relaxation",
    duration: "7 min",
    steps: [
      { phase: "Inhale Deeply", duration: 5, color: "bg-blue-400" },
      { phase: "Hold", duration: 3, color: "bg-purple-400" },
      { phase: "Exhale Slowly", duration: 6, color: "bg-teal-400" }
    ]
  },
  {
    id: "alternate",
    title: "Alternate Nostril",
    description: "Yogic breathing for balance and clarity",
    duration: "5 min",
    steps: [
      { phase: "Left Inhale", duration: 4, color: "bg-blue-400" },
      { phase: "Hold", duration: 4, color: "bg-purple-400" },
      { phase: "Right Exhale", duration: 4, color: "bg-teal-400" },
      { phase: "Right Inhale", duration: 4, color: "bg-green-400" },
      { phase: "Hold", duration: 4, color: "bg-yellow-400" },
      { phase: "Left Exhale", duration: 4, color: "bg-orange-400" }
    ]
  }
];

export default function BreathingExercisesPage({ onBack }: BreathingExercisesPageProps) {
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    if (!isActive || !selectedExercise) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next step
          const nextIndex = (currentStepIndex + 1) % selectedExercise.steps.length;
          setCurrentStepIndex(nextIndex);
          
          // Increment cycle count when we complete a full cycle
          if (nextIndex === 0) {
            setCompletedCycles((c) => c + 1);
          }
          
          return selectedExercise.steps[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentStepIndex, selectedExercise]);

  const startExercise = (exercise: typeof exercises[0]) => {
    setSelectedExercise(exercise);
    setCurrentStepIndex(0);
    setTimeLeft(exercise.steps[0].duration);
    setCompletedCycles(0);
    setIsActive(true);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setCompletedCycles(0);
    if (selectedExercise) {
      setTimeLeft(selectedExercise.steps[0].duration);
    }
  };

  const stopExercise = () => {
    setSelectedExercise(null);
    setIsActive(false);
    setCurrentStepIndex(0);
    setTimeLeft(0);
    setCompletedCycles(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
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
                <Wind className="h-8 w-8 text-teal-600" />
                <span className="text-xl">Breathing Exercises</span>
                <Badge variant="secondary" className="ml-2">Mindfulness</Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedExercise ? (
          <>
            {/* Hero Section */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl text-gray-800 mb-4">Guided Breathing Exercises</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Calm your mind and reduce stress with scientifically-proven breathing techniques
              </p>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1716284129276-c84a6b77325f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxheGF0aW9uJTIwYnJlYXRoaW5nJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NTk0NzExNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Breathing Exercises"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Exercises Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {exercises.map((exercise) => (
                <Card 
                  key={exercise.id} 
                  className="hover:shadow-xl transition-shadow border-2 hover:border-teal-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle>{exercise.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Timer className="h-4 w-4" />
                        <span>{exercise.duration}</span>
                      </div>
                    </div>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm">Pattern:</p>
                      <div className="flex flex-wrap gap-2">
                        {exercise.steps.map((step, idx) => (
                          <Badge key={idx} variant="outline" className="gap-1">
                            {step.phase}: {step.duration}s
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={() => startExercise(exercise)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Exercise
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Benefits of Breathing Exercises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">Reduce Anxiety</h3>
                      <p className="text-sm text-gray-600">Activates the parasympathetic nervous system for instant calm</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">Lower Blood Pressure</h3>
                      <p className="text-sm text-gray-600">Regular practice helps reduce cardiovascular stress</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">Improve Sleep</h3>
                      <p className="text-sm text-gray-600">Calming techniques help you fall asleep faster and sleep deeper</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">Increase Focus</h3>
                      <p className="text-sm text-gray-600">Better oxygen flow enhances mental clarity and concentration</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Active Exercise View */
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-teal-300 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">{selectedExercise.title}</CardTitle>
                <CardDescription>{selectedExercise.description}</CardDescription>
                <div className="mt-4">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Cycle {completedCycles + 1}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Breathing Circle Animation */}
                <div className="flex justify-center">
                  <div 
                    className={`relative w-64 h-64 rounded-full ${selectedExercise.steps[currentStepIndex].color} flex items-center justify-center transition-all duration-1000 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                    style={{
                      boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)',
                      animation: isActive ? 'pulse 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    <div className="text-center text-white">
                      <p className="text-2xl mb-2">{selectedExercise.steps[currentStepIndex].phase}</p>
                      <p className="text-6xl">{timeLeft}</p>
                      <p className="text-lg mt-2">seconds</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{currentStepIndex + 1} / {selectedExercise.steps.length} steps</span>
                  </div>
                  <Progress 
                    value={((currentStepIndex + 1) / selectedExercise.steps.length) * 100} 
                    className="h-3"
                  />
                </div>

                {/* Controls */}
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={togglePause}
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 gap-2"
                  >
                    {isActive ? (
                      <>
                        <Pause className="h-5 w-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={resetExercise}
                    size="lg"
                    variant="outline"
                    className="gap-2"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Reset
                  </Button>
                  <Button
                    onClick={stopExercise}
                    size="lg"
                    variant="outline"
                    className="gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back
                  </Button>
                </div>

                {/* Instructions */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <p className="text-center text-gray-700">
                      💡 Tip: Find a comfortable position, close your eyes, and follow the guided breathing pattern. 
                      Focus on your breath and let go of distracting thoughts.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
