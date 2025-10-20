import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import suLogo from '@/assets/su-logo-2.png';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="site-header bg-gradient-to-r from-background to-background/95 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img 
            src={suLogo} 
            alt="Sampoerna University" 
            className="h-20 w-auto filter drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
          />
          <div className="flex items-center gap-4">
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-crimson font-semibold text-accent tracking-wide">
                Career Center
              </span>
              <span className="text-xs text-muted-foreground font-inter tracking-wider uppercase">
                Internship Portal
              </span>
            </div>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Welcome, {user.name}</span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                {user.role === 'admin' ? 'Admin' : 'Student'}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};