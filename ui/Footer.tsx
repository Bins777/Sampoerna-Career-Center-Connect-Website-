import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, GraduationCap, BookOpen, Briefcase, Users } from 'lucide-react';
import suLogo from '@/assets/su-logo-2.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-background to-background/95 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and University Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img 
              src={suLogo} 
              alt="Sampoerna University" 
              className="h-16 w-auto filter drop-shadow-sm"
            />
            <div className="text-center md:text-left">
              <h3 className="font-crimson font-semibold text-lg text-foreground">
                Sampoerna University
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Career Center
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-3">Contact Us</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 text-primary" />
                <span>career@sampoernauniversity.ac.id</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 21 5022 7788</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span>Student Portal</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Academic Calendar</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>Career Services</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Users className="h-4 w-4 text-primary" />
                <span>Alumni Network</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sampoerna University. All rights reserved.</p>
          <p className="mt-1">Internship Portal - Connecting Students with Opportunities</p>
        </div>
      </div>
    </footer>
  );
};