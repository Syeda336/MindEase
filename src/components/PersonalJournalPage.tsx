import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import HomeNavigation from "./HomeNavigation";
import { 
  BookOpen, Mic, MicOff, Volume2, VolumeX, Calendar, 
  Clock, Send, Save, Trash2, Plus 
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PersonalJournalPageProps {
  onNavigate: (page: string) => void;
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

interface FutureMessage {
  id: string;
  message: string;
  deliveryDate: string;
  created: string;
}

interface Task {
  id: string;
  task: string;
  time: string;
  completed: boolean;
}

export default function PersonalJournalPage({ onNavigate }: PersonalJournalPageProps) {
  const [currentEntry, setCurrentEntry] = useState("");
  const [currentMood, setCurrentMood] = useState("neutral");
  const [isRecording, setIsRecording] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2025-10-02",
      content: "Today was a good day. I felt more energized and motivated than usual. The breathing exercises helped a lot.",
      mood: "happy"
    },
    {
      id: "2",
      date: "2025-10-01",
      content: "Had some anxiety in the morning, but talking to Care Buddy helped me feel better. Grateful for this support.",
      mood: "calm"
    }
  ]);
  
  const [futureMessages, setFutureMessages] = useState<FutureMessage[]>([
    {
      id: "1",
      message: "Remember: You are stronger than you think. Look how far you've come!",
      deliveryDate: "2025-11-01",
      created: "2025-10-01"
    }
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", task: "Morning meditation", time: "08:00", completed: false },
    { id: "2", task: "Write in journal", time: "20:00", completed: false }
  ]);

  const [newFutureMessage, setNewFutureMessage] = useState("");
  const [newFutureDate, setNewFutureDate] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: currentEntry,
        mood: currentMood
      };
      setJournalEntries([newEntry, ...journalEntries]);
      setCurrentEntry("");
      setCurrentMood("neutral");
    }
  };

  const handleDeleteEntry = (id: string) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
  };

  const handleAddFutureMessage = () => {
    if (newFutureMessage.trim() && newFutureDate) {
      const message: FutureMessage = {
        id: Date.now().toString(),
        message: newFutureMessage,
        deliveryDate: newFutureDate,
        created: new Date().toISOString().split('T')[0]
      };
      setFutureMessages([...futureMessages, message]);
      setNewFutureMessage("");
      setNewFutureDate("");
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() && newTaskTime) {
      const task: Task = {
        id: Date.now().toString(),
        task: newTask,
        time: newTaskTime,
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewTaskTime("");
    }
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would use the Web Speech API
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    // In a real app, this would play/pause actual audio
  };

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      happy: "bg-yellow-100 text-yellow-700",
      sad: "bg-blue-100 text-blue-700",
      anxious: "bg-red-100 text-red-700",
      calm: "bg-green-100 text-green-700",
      neutral: "bg-gray-100 text-gray-700"
    };
    return colors[mood] || colors.neutral;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <HomeNavigation currentPage="journal" onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1638953478022-5f3fe9c731c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGpvdXJuYWwlMjB3cml0aW5nfGVufDF8fHx8MTc1OTQ2OTQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Journal"
            className="w-20 h-20 rounded-full object-cover shadow-lg"
          />
          <div>
            <h1 className="text-4xl text-gray-800">Personal Journal</h1>
            <p className="text-gray-600">Express yourself, track your thoughts, and plan for your future</p>
          </div>
        </div>

        <Tabs defaultValue="diary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diary">
              <BookOpen className="h-4 w-4 mr-2" />
              Diary
            </TabsTrigger>
            <TabsTrigger value="future">
              <Send className="h-4 w-4 mr-2" />
              Future Self
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <Clock className="h-4 w-4 mr-2" />
              Tasks & Alarms
            </TabsTrigger>
          </TabsList>

          {/* Diary Tab */}
          <TabsContent value="diary" className="space-y-6">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle>Write Your Thoughts</CardTitle>
                <CardDescription>Express your feelings and experiences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={toggleRecording}
                    className="flex-1"
                  >
                    {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {isRecording ? "Stop Recording" : "Voice Typing"}
                  </Button>
                  <Button
                    variant={isMusicPlaying ? "default" : "outline"}
                    onClick={toggleMusic}
                    className="flex-1"
                  >
                    {isMusicPlaying ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    {isMusicPlaying ? "Pause Music" : "Play Music"}
                  </Button>
                </div>

                <div>
                  <Label>How are you feeling?</Label>
                  <div className="flex gap-2 mt-2">
                    {["happy", "calm", "neutral", "anxious", "sad"].map((mood) => (
                      <Button
                        key={mood}
                        variant={currentMood === mood ? "default" : "outline"}
                        onClick={() => setCurrentMood(mood)}
                        className="flex-1 capitalize"
                      >
                        {mood}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Your Entry</Label>
                  <Textarea
                    placeholder="Write about your day, your thoughts, your feelings..."
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    className="min-h-[200px] mt-2"
                  />
                </div>

                <Button onClick={handleSaveEntry} className="w-full bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              </CardContent>
            </Card>

            {/* Previous Entries */}
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-800">Previous Entries</h2>
              {journalEntries.map((entry) => (
                <Card key={entry.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-3 items-center">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{entry.date}</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${getMoodColor(entry.mood)}`}>
                          {entry.mood}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <p className="text-gray-700">{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Future Self Tab */}
          <TabsContent value="future" className="space-y-6">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Message Your Future Self</CardTitle>
                <CardDescription>Write messages to be delivered to you in the future</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Your Message</Label>
                  <Textarea
                    placeholder="Write a message of encouragement, advice, or reflection..."
                    value={newFutureMessage}
                    onChange={(e) => setNewFutureMessage(e.target.value)}
                    className="min-h-[150px] mt-2"
                  />
                </div>

                <div>
                  <Label>Delivery Date</Label>
                  <Input
                    type="date"
                    value={newFutureDate}
                    onChange={(e) => setNewFutureDate(e.target.value)}
                    className="mt-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <Button onClick={handleAddFutureMessage} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Schedule Message
                </Button>
              </CardContent>
            </Card>

            {/* Scheduled Messages */}
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-800">Scheduled Messages</h2>
              {futureMessages.map((msg) => (
                <Card key={msg.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <div className="flex gap-2 items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Created: {msg.created}</span>
                        </div>
                        <div className="flex gap-2 items-center text-sm">
                          <Send className="h-4 w-4 text-blue-600" />
                          <span>Delivers: {msg.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3">{msg.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="border-2 border-teal-200">
              <CardHeader>
                <CardTitle>Personal Task Alarms</CardTitle>
                <CardDescription>Set reminders for your wellness activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Task Description</Label>
                  <Input
                    placeholder="e.g., Morning meditation, Evening journal..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button onClick={handleAddTask} className="w-full bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task Alarm
                </Button>
              </CardContent>
            </Card>

            {/* Task List */}
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-800">Your Task Alarms</h2>
              {tasks.map((task) => (
                <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500 bg-green-50' : 'border-l-teal-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskComplete(task.id)}
                          className="w-5 h-5 rounded border-gray-300"
                        />
                        <div className="flex-1">
                          <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.task}
                          </p>
                          <div className="flex gap-2 items-center text-sm text-gray-600 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>{task.time}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
