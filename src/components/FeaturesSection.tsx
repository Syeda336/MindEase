import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Bot, 
  BookOpen, 
  Users, 
  Gamepad2, 
  Utensils, 
  Calendar,
  BarChart3,
  User,
  Clock,
  Quote,
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function FeaturesSection() {
  const mainFeatures = [
    {
      icon: Bot,
      title: "AI Care Buddy",
      description: "Your intelligent virtual assistant that provides 24/7 support and personalized guidance to help you navigate mental health challenges with empathy and understanding.",
      image: "https://images.unsplash.com/photo-1725798451557-fc60db3eb6a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGNoYXRib3QlMjBhc3Npc3RhbnQlMjBmcmllbmRseSUyMGNvbnZlcnNhdGlvbnxlbnwxfHx8fDE3NTkwNDkzODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-500 to-blue-600",
      category: "AI Support"
    },
    {
      icon: BookOpen,
      title: "Personal Journal",
      description: "A private, secure space to document your daily thoughts, feelings, and experiences. Track your emotional journey and gain insights into your mental health patterns.",
      image: "https://images.unsplash.com/photo-1638953478022-5f3fe9c731c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGpvdXJuYWwlMjBub3RlYm9vayUyMHdyaXRpbmclMjBkaWFyeXxlbnwxfHx8fDE3NTkwNDkzODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-green-500 to-green-600",
      category: "Self Reflection"
    },
    {
      icon: Users,
      title: "Professional Help",
      description: "Connect with licensed therapists and mental health professionals through secure video calls, messaging, and scheduled appointments when you need expert support.",
      image: "https://images.unsplash.com/photo-1703449481095-bb99a6928f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB0aGVyYXBpc3QlMjBwcm9mZXNzaW9uYWwlMjBtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1OTA0OTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-purple-500 to-purple-600",
      category: "Expert Care"
    },
    {
      icon: Gamepad2,
      title: "Mini Games by Care Buddy",
      description: "Engaging, therapeutic mini-games designed to improve cognitive function, reduce stress, and make mental health exercises fun and interactive during your chat sessions.",
      image: "https://images.unsplash.com/photo-1622617760286-e11b543f5ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBnYW1lcyUyMHB1enpsZSUyMGJyYWluJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzU5MDQ5MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-orange-500 to-orange-600",
      category: "Interactive"
    }
  ];

  const supportFeatures = [
    {
      icon: Utensils,
      title: "Diet Plan by Care Buddy",
      description: "Personalized nutrition recommendations based on your mental health goals, mood patterns, and dietary preferences for optimal wellness.",
      image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMGRpZXQlMjBudXRyaXRpb24lMjBwbGFubmluZ3xlbnwxfHx8fDE3NTkwNDkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      icon: Calendar,
      title: "Diet Chart Option",
      description: "Visual tracking of your nutrition history, meal patterns, and progress towards your wellness goals with interactive charts and calendar views.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmVzcyUyMGRhc2hib2FyZCUyMGFuYWx5dGljcyUyMGNoYXJ0cyUyMGRhdGF8ZW58MXx8fHwxNzU5MDQ5NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: BarChart3,
      title: "Dashboard (Progress)",
      description: "Comprehensive analytics showing your progress in games, diet adherence, mood trends, and recovery milestones with beautiful visualizations.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmVzcyUyMGRhc2hib2FyZCUyMGFuYWx5dGljcyUyMGNoYXJ0cyUyMGRhdGF8ZW58MXx8fHwxNzU5MDQ5NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: User,
      title: "Profile",
      description: "Personalized user profile with preferences, achievements, health metrics, and customization options tailored to your unique wellness journey.",
      image: "https://images.unsplash.com/photo-1586006552138-ea18985ab492?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGF2YXRhciUyMHBlcnNvbiUyMGFjY291bnR8ZW58MXx8fHwxNzU5MDQ5NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: Clock,
      title: "History of Activities",
      description: "Complete timeline of your interactions, sessions, journal entries, and progress over time with detailed activity logs and insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmVzcyUyMGRhc2hib2FyZCUyMGFuYWx5dGljcyUyMGNoYXJ0cyUyMGRhdGF8ZW58MXx8fHwxNzU5MDQ5NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "text-violet-600",
      bgColor: "bg-violet-50"
    },
    {
      icon: Quote,
      title: "Motivational Quotes",
      description: "Daily inspirational messages and personalized affirmations to keep you motivated and positive on your wellness journey.",
      image: "https://images.unsplash.com/photo-1633021708009-a671181167c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RpdmF0aW9uYWwlMjBxdW90ZXMlMjBpbnNwaXJhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc1OTA0OTQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            🧠 Complete Mental Wellness Platform
          </Badge>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
            Everything You Need for Mental Health
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MindCare combines AI technology, professional support, and interactive tools 
            to create a comprehensive mental health ecosystem tailored just for you.
          </p>
        </div>

        {/* Main Features - Large Cards with Images */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group h-full">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={feature.image}
                    alt={`${feature.title} illustration`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {feature.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    {feature.description}
                  </p>
                  <Button variant="ghost" className="self-start p-0 h-auto text-blue-600 hover:text-blue-700">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supporting Features - Compact Grid */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-gray-900 mb-4">
              Comprehensive Support Tools
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Additional features designed to support every aspect of your mental health journey with data, insights, and personalization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportFeatures.map((feature, index) => (
              <div key={index} className="group">
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
                  <CardContent className="p-0">
                    {/* Mini Image */}
                    <div className="relative h-32 overflow-hidden">
                      <ImageWithFallback 
                        src={feature.image}
                        alt={`${feature.title} preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className={`absolute bottom-2 right-2 w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center`}>
                        <feature.icon className={`h-4 w-4 ${feature.color}`} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h4 className="text-lg text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Quote Showcase */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1633021708009-a671181167c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RpdmF0aW9uYWwlMjBxdW90ZXMlMjBpbnNwaXJhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc1OTA0OTQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Motivational wellness inspiration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-900/80"></div>
          </div>
          
          <div className="relative z-10 text-center py-16 px-8">
            <Quote className="h-12 w-12 mx-auto mb-6 text-blue-300 opacity-80" />
            <blockquote className="text-3xl md:text-4xl text-white mb-6 leading-relaxed max-w-4xl mx-auto">
              "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity."
            </blockquote>
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-blue-200 text-lg mb-8">
              Join thousands who have transformed their mental wellness with MindCare
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Start Your Journey Today
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                See Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}