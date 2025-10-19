import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase"; 

import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { 
  Brain, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight,
  ArrowLeft,
  Bot,
  BookOpen,
  Users,
  Gamepad2,
  Utensils,
  BarChart3,
  Quote,
  Shield,
  Sparkles
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onBack: () => void;
  onSignIn: () => void;
}

export default function LoginPage({ onBack, onSignIn }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const features = [
    { icon: Bot, text: "AI Care Buddy", color: "text-blue-500" },
    { icon: BookOpen, text: "Personal Journal", color: "text-green-500" },
    { icon: Users, text: "Professional Help", color: "text-purple-500" },
    { icon: Gamepad2, text: "Mini Games", color: "text-orange-500" },
    { icon: Utensils, text: "Diet Plans", color: "text-teal-500" },
    { icon: BarChart3, text: "Progress Dashboard", color: "text-indigo-500" },
    { icon: Quote, text: "Motivational Quotes", color: "text-rose-500" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // ✅ Firebase log-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("✅ Logged in:", user);

    onSignIn();
  } catch (error: any) {
    console.error("❌ Login error:", error.message);
    alert("Invalid email or password. Please try again.");
  }
};


  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1758800624783-1b0ac07ae4fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMHdlbGxuZXNzJTIwY2FsbSUyMGRheWxpZ2h0fGVufDF8fHx8MTc1OTA0NjEzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Serene wellness landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-teal-900/60"></div>
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button 
          onClick={onBack}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - App Features Showcase */}
        <div className="hidden lg:block space-y-8">
          <div className="text-white space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="h-8 w-8 text-blue-300" />
              <h1 className="text-4xl text-white">
                MindCare
              </h1>
            </div>
            <h2 className="text-3xl leading-tight">
              Your AI-powered path to
              <span className="block text-blue-300">better mental health</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join thousands who have transformed their wellness journey with our comprehensive mental health platform.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex-shrink-0">
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <span className="text-white text-sm">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-sm">24/7 AI Support</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl text-gray-900">MindCare</h2>
              </div>
              <Badge className="mx-auto bg-blue-100 text-blue-700 hover:bg-blue-200">
                Your AI-powered path to better mental health
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6"
                  size="lg"
                >
                  Log In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* Forgot Password */}
              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm hover:underline">
                  Forgot your password?
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  or continue with
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-white border-gray-200 hover:bg-gray-50"
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full bg-white border-gray-200 hover:bg-gray-50"
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button className="text-blue-600 hover:text-blue-700 hover:underline">
                  Sign up for free
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Feature Highlights */}
          <div className="lg:hidden mt-6 grid grid-cols-2 gap-3">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <feature.icon className={`h-4 w-4 ${feature.color}`} />
                <span className="text-white text-xs">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-black/20 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-4">
                <span>© 2024 MindCare</span>
                <div className="flex gap-4">
                  <button className="hover:text-white transition-colors">Terms</button>
                  <button className="hover:text-white transition-colors">Privacy Policy</button>
                  <button className="hover:text-white transition-colors">Contact</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-xs">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}