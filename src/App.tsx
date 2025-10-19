import { useState } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage"; // ✅ Added import
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
import CareBuddyPage from "./components/CareBuddyPage";
import DietPlanPage from "./components/DietPlanPage";
import PersonalJournalPage from "./components/PersonalJournalPage";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import GamesPage from "./components/GamesPage";
import BreathingExercisesPage from "./components/BreathingExercisesPage";

type PageType =
  | 'landing'
  | 'login'
  | 'signup'     // ✅ Added signup page type
  | 'homepage'
  | 'dashboard'
  | 'carebuddy'
  | 'dietplan'
  | 'journal'
  | 'profile'
  | 'settings'
  | 'games'
  | 'breathing';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  const handleLoginClick = () => setCurrentPage('login');
  const handleSignUpClick = () => setCurrentPage('signup'); // ✅ new handler

  const handleSignIn = () => setCurrentPage('homepage');
  const handleSignUp = () => setCurrentPage('homepage'); // ✅ after signup success

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    scrollToTop();
  };

  // ✅ Signup Page
  if (currentPage === 'signup') {
    return (
      <div className="relative">
        <SignupPage
          onBack={() => setCurrentPage('login')}  // go back to login
          onSignUp={handleSignUp}                 // when signup completes
        />
      </div>
    );
  }

  // ✅ Login Page
  if (currentPage === 'login') {
    return (
      <div className="relative">
        <LoginPage
          onBack={() => setCurrentPage('landing')}
          onSignIn={handleSignIn}
        />
        {/* Optional: Add “Sign up” link to go to signup page */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <button
            className="text-blue-200 hover:text-white text-sm underline"
            onClick={() => setCurrentPage('signup')}
          >
            Don’t have an account? Sign up
          </button>
        </div>
      </div>
    );
  }

  // ✅ Home Page (after login/signup)
  if (currentPage === 'homepage') return <HomePage onNavigate={handleNavigate} />;

  if (currentPage === 'dashboard') return <DashboardPage onNavigate={handleNavigate} />;
  if (currentPage === 'carebuddy')
    return (
      <CareBuddyPage
        onBack={() => setCurrentPage('homepage')}
        onDietPlanClick={() => setCurrentPage('dietplan')}
        onProfileClick={() => setCurrentPage('profile')}
        onGamesClick={() => setCurrentPage('games')}
        onBreathingClick={() => setCurrentPage('breathing')}
      />
    );
  if (currentPage === 'games') return <GamesPage onBack={() => setCurrentPage('carebuddy')} />;
  if (currentPage === 'breathing') return <BreathingExercisesPage onBack={() => setCurrentPage('carebuddy')} />;
  if (currentPage === 'dietplan') return <DietPlanPage onBack={() => setCurrentPage('homepage')} />;
  if (currentPage === 'journal') return <PersonalJournalPage onNavigate={handleNavigate} />;
  if (currentPage === 'profile') return <ProfilePage onBack={() => setCurrentPage('homepage')} />;
  if (currentPage === 'settings') return <SettingsPage onNavigate={handleNavigate} />;

  // ✅ Landing Page (before login/signup)
  return (
    <div className="min-h-screen">
      <Navigation 
        onLoginClick={handleLoginClick} 
        onSignUpClick={handleSignUpClick} // ✅ new prop
      />

      <main>
        <HeroSection
          onGetStartedClick={handleLoginClick}
          onStartJourneyClick={scrollToTop}
        />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
