import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Brain, 
  Send,
  Mic,
  MicOff,
  Sun,
  Moon,
  Gamepad2,
  Wind,
  ArrowLeft
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import robotBuddy from './figma/care_buddy.png';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface VoiceOption {
  value: string;
  label: string;
  pitch: number;
  rate: number;
}

const voiceOptions: VoiceOption[] = [
  { value: "female", label: "Female", pitch: 1.2, rate: 0.9 },
  { value: "male", label: "Male", pitch: 0.8, rate: 0.9 },
  { value: "child", label: "Child", pitch: 1.8, rate: 1.1 }
];

interface CareBuddyPageProps {
  onBack: () => void;
  onDietPlanClick: () => void;
  onProfileClick: () => void;
  onGamesClick?: () => void;
  onBreathingClick?: () => void;
}

export default function CareBuddyPage({ onBack, onDietPlanClick, onProfileClick, onGamesClick, onBreathingClick }: CareBuddyPageProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("female");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm your Care Buddy! 🌟 I'm so happy to meet you. How are you feeling today? I'm here to listen, support, and help you on your wellness journey. What's on your mind?",
      isUser: false,
      timestamp: new Date(Date.now() - 1000)
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceInput = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voiceOptions.find(v => v.value === selectedVoice);
      if (voice) {
        utterance.pitch = voice.pitch;
        utterance.rate = voice.rate;
      }
      speechSynthesis.speak(utterance);
    }
  };

  const callOpenAI = async (message: string): Promise<string> => {
    // Mock OpenAI response for demo
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('depres') || lowerMessage.includes('sad')) {
      return "I hear that you're going through a difficult time. Depression can feel overwhelming, but remember that you're not alone. Have you tried any of our breathing exercises? They can help bring some immediate relief. Would you also like to talk about what's been making you feel this way? 💙";
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worry')) {
      return "Anxiety can be really challenging. Let's try a grounding technique together: Can you name 5 things you can see right now? This can help bring you back to the present moment. I also recommend trying our Box Breathing exercise - it's specifically designed to calm anxiety quickly. Would you like me to guide you through it? 🌟";
    } else if (lowerMessage.includes('stress')) {
      return "Stress is something we all experience. The good news is there are effective ways to manage it! Have you tried our mini games? They're designed to help distract your mind and reduce stress. Also, maintaining a regular journal can help process stressful thoughts. What's causing you the most stress right now? 💚";
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return "Sleep difficulties can really affect your wellbeing. Try the 4-7-8 breathing technique before bed - it's proven to help people fall asleep faster. Also, journaling before bed can help clear your mind. Are you having trouble falling asleep or staying asleep? ✨";
    } else if (lowerMessage.includes('thank')) {
      return "You're very welcome! I'm always here for you. Remember, taking care of your mental health is a sign of strength, not weakness. Feel free to reach out anytime you need support. 🌈";
    } else {
      return "Thank you for sharing that with me. Your feelings are valid and I'm here to support you. Would you like to try one of our wellness activities? We have breathing exercises for immediate calm, mini games for stress relief, or you could write in your journal to process your thoughts. What sounds most helpful right now? 💙";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const responseText = await callOpenAI(inputMessage);
      
      setIsTyping(false);
      
      const buddyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, buddyMessage]);
      speakMessage(responseText);
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now, but I'm still here for you! 💙 Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        {/* Navigation Header */}
        <header className="border-b border-border bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Back Button */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
                <div className="flex items-center gap-2">
                  <Brain className="h-8 w-8 text-blue-600" />
                  <span className="text-xl text-foreground">MindCare</span>
                  <Badge variant="secondary" className="ml-2">Care Buddy</Badge>
                </div>
              </div>

              {/* Settings Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {voiceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content - Chat Left, Buddy Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chat Section - Left Side (2/3 width) */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col shadow-2xl border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-white">
                        <AvatarImage src={robotBuddy} alt="Care Buddy" />
                        <AvatarFallback>🌟</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg">Care Buddy</h3>
                        <p className="text-sm text-blue-100">Always here to help 💙</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!message.isUser && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={robotBuddy} alt="Care Buddy" />
                              <AvatarFallback>🌟</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                              message.isUser
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <span className={`text-xs ${message.isUser ? 'text-blue-100' : 'text-gray-500'} mt-1 block`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={robotBuddy} alt="Care Buddy" />
                            <AvatarFallback>🌟</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-6 py-4">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Share what's on your mind... 💙"
                          className="pr-12 h-12 rounded-full border-2 border-blue-200 focus:border-blue-400 bg-white dark:bg-gray-700"
                          disabled={isTyping}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleVoiceInput}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full ${
                            isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-blue-500'
                          }`}
                          disabled={isTyping}
                        >
                          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSendMessage} 
                        size="lg" 
                        className="h-12 px-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        disabled={isTyping || !inputMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Care Buddy Image - Right Side (1/3 width) */}
            <div className="lg:col-span-1">
              <Card className="h-[600px] overflow-hidden shadow-2xl border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-0 h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <div className="text-center p-6">
                    <ImageWithFallback
                      src={robotBuddy}
                      alt="Care Buddy"
                      className="w-full h-auto rounded-2xl shadow-lg mb-4"
                    />
                    <h3 className="text-2xl text-gray-800 dark:text-gray-200 mb-2">Your Care Buddy</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      I'm here 24/7 to listen, support, and guide you on your wellness journey 🌟
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Action Buttons at Bottom */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="gap-2 rounded-full px-6 py-6 border-2 hover:border-purple-400 hover:bg-purple-50"
              onClick={onGamesClick}
            >
              <Gamepad2 className="h-5 w-5" />
              Mini Games
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 rounded-full px-6 py-6 border-2 hover:border-teal-400 hover:bg-teal-50"
              onClick={onBreathingClick}
            >
              <Wind className="h-5 w-5" />
              Breathing Exercises
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
