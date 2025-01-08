import { Calendar, Home, User, Utensils } from 'lucide-react';
import MobileNavLink from './mobileNavlink';

const MobileNavbar = ({ locale }: { locale: string }) => {
  return (
    <nav className="absolute lg:hidden bottom-0 w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto sm:px-4">
        <div className="flex justify-around py-3">
          <MobileNavLink href="/dashboard" locale={locale}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </MobileNavLink>
          <MobileNavLink href="/meals" locale={locale}>
            <Utensils className="h-6 w-6" />
            <span className="text-xs mt-1">Meals</span>
          </MobileNavLink>
          <MobileNavLink href="/planner" locale={locale}>
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Planner</span>
          </MobileNavLink>
          <MobileNavLink href="/profile" locale={locale}>
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
