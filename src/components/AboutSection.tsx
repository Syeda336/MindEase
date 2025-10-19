import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Quote, Star, CheckCircle } from "lucide-react";

export default function AboutSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Working Professional",
      content: "MindCare has been a game-changer for managing my anxiety. The 24/7 support gives me peace of mind, and the therapy sessions are incredibly convenient.",
      rating: 5
    },
    {
      name: "David L.",
      role: "College Student", 
      content: "The mood tracking feature helped me identify triggers I never noticed before. My therapist and I use the data to make real progress in our sessions.",
      rating: 5
    },
    {
      name: "Emily R.",
      role: "New Parent",
      content: "As a new mom dealing with postpartum depression, having access to professional help from home has been invaluable. The self-care tools are perfect for busy schedules.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "People Helped" },
    { number: "500+", label: "Licensed Therapists" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "Support Available" }
  ];

  const benefits = [
    "Evidence-based treatment approaches",
    "Personalized care plans",
    "Affordable and accessible mental health care",
    "Integration with healthcare providers",
    "Regular progress assessments",
    "Family and group therapy options"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Mental Health Care That Actually Works
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At MindCare, we believe everyone deserves access to quality mental health support. Our platform combines 
              the latest in digital health technology with compassionate, evidence-based care from licensed professionals.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
              Start Your Journey Today
            </Button>
          </div>

          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                  <div className="text-3xl text-teal-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-gray-900 mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from people who have transformed their mental health with MindCare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-teal-600 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}