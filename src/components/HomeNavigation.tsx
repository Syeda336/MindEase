import { Home, Settings, User, BookOpen, Activity } from "lucide-react";
import { Button } from "./ui/button";

interface HomeNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function HomeNavigation({ currentPage, onNavigate }: HomeNavigationProps) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-white" />
            <span className="text-white font-semibold text-xl">MindCare</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={currentPage === 'homepage' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('homepage')}
              className={currentPage === 'homepage' ? '' : 'text-white hover:bg-white/20'}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button
              variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('dashboard')}
              className={currentPage === 'dashboard' ? '' : 'text-white hover:bg-white/20'}
            >
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={currentPage === 'journal' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('journal')}
              className={currentPage === 'journal' ? '' : 'text-white hover:bg-white/20'}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Journal
            </Button>
            <Button
              variant={currentPage === 'settings' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('settings')}
              className={currentPage === 'settings' ? '' : 'text-white hover:bg-white/20'}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant={currentPage === 'profile' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('profile')}
              className={currentPage === 'profile' ? '' : 'text-white hover:bg-white/20'}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
