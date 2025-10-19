import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const footerLinks = {
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Blog", href: "#blog" }
    ],
    Services: [
      { name: "Individual Therapy", href: "#therapy" },
      { name: "Group Sessions", href: "#group" },
      { name: "Crisis Support", href: "#crisis" },
      { name: "Wellness Tools", href: "#tools" }
    ],
    Resources: [
      { name: "Help Center", href: "#help" },
      { name: "Community Guidelines", href: "#guidelines" },
      { name: "Mental Health Resources", href: "#resources" },
      { name: "Insurance", href: "#insurance" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "HIPAA Compliance", href: "#hipaa" },
      { name: "Accessibility", href: "#accessibility" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand and Contact */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-3xl text-teal-400 tracking-tight">MindCare</span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
              Your trusted companion for mental wellbeing. Professional support, personalized care, 
              and practical tools to help you thrive every day.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <span className="text-gray-300">1-800-MINDCARE (1-800-646-3227)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <span className="text-gray-300">support@mindcare.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-teal-400" />
                <span className="text-gray-300">Available nationwide, 24/7</span>
              </div>
            </div>

            {/* Crisis Support Notice */}
            <div className="mt-8 p-4 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-200 text-sm">
                <strong>Crisis Support:</strong> If you're experiencing a mental health crisis, 
                call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg text-white mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl text-white mb-2">
                Stay Connected
              </h3>
              <p className="text-gray-400">
                Get mental health tips, resources, and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
              />
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 MindCare. All rights reserved. | HIPAA Compliant | Licensed in all 50 states
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}