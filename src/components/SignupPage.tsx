import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebase/firebase"; // Keep your Firebase config import

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
  User,
  ArrowLeft,
  ArrowRight,
  Shield,
  Sparkles,
  Bot,
  BookOpen,
  Users,
  Gamepad2,
  Utensils,
  BarChart3,
  Quote
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SignupPageProps {
  onBack: () => void;
  onSignUp: () => void;
}

export default function SignupPage({ onBack, onSignUp }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🧩 Your vanilla Firebase signup logic inside React
  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match. Please recheck.");
      return;
    }

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const user = userCredential.user;

      // Optional: set display name
      await user?.updateProfile({ displayName: fullName });

      console.log("✅ Signed up as:", user?.email);
      alert("Account created successfully!");
      onSignUp();
    } catch (error: any) {
      console.error("❌ Error:", error.code, error.message);
      alert(`Signup failed: ${error.message}`);
    }
  }

  const features = [
    { icon: Bot, text: "AI Care Buddy", color: "text-blue-500" },
    { icon: BookOpen, text: "Personal Journal", color: "text-green-500" },
    { icon: Users, text: "Professional Help", color: "text-purple-500" },
    { icon: Gamepad2, text: "Mini Games", color: "text-orange-500" },
    { icon: Utensils, text: "Diet Plans", color: "text-teal-500" },
    { icon: BarChart3, text: "Progress Dashboard", color: "text-indigo-500" },
    { icon: Quote, text: "Motivational Quotes", color: "text-rose-500" }
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758800624783-1b0ac07ae4fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="hidden lg:block space-y-8">
          <div className="text-white space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="h-8 w-8 text-blue-300" />
              <h1 className="text-4xl text-white">MindCare</h1>
            </div>
            <h2 className="text-3xl leading-tight">
              Start your journey towards
              <span className="block text-blue-300">a calmer mind</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Create your account and begin your personalized mental wellness journey today.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                <span className="text-white text-sm">{feature.text}</span>
              </div>
            ))}
          </div>

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

        {/* Right Side */}
        <div className="w-full max-w-md mx-auto lg:ml-auto">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl text-gray-900">Create Your MindCare Account</h2>
              </div>
              <Badge className="mx-auto bg-blue-100 text-blue-700 hover:bg-blue-200">
                Begin your mental wellness journey
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Password */}
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Signup Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6"
                  size="lg"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
