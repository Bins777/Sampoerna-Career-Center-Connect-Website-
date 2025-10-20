import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Eye, Building, Copy } from 'lucide-react';
import { Internship } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface InternshipModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyClick: (internshipId: string) => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  internship,
  isOpen,
  onClose,
  onApplyClick,
}) => {
  const { toast } = useToast();
  
  if (!internship) return null;

  const handleApplyClick = () => {
    onApplyClick(internship.id);
  };

  const handleCopyEmail = () => {
    if (internship.applicationMethod === 'email') {
      navigator.clipboard.writeText(internship.applicationValue);
      toast({
        title: "Email copied!",
        description: "The email address has been copied to your clipboard.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-3xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {internship.title}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="font-medium text-primary">{internship.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{internship.views} views</span>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Required Majors</h3>
            <div className="flex flex-wrap gap-2">
              {internship.major.map((major) => (
                <Badge key={major} variant="secondary">
                  {major}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Industry</h3>
            <div className="flex flex-wrap gap-1">
              {internship.industry.map((ind, index) => (
                <Badge key={index} variant="outline">{ind}</Badge>
              ))}
            </div>
          </div>

          {internship.imageUrl && (
            <div>
              <h3 className="font-semibold mb-2">Internship Flyer</h3>
              <img 
                src={internship.imageUrl} 
                alt={`${internship.title} flyer`}
                className="w-full max-w-md h-64 object-cover rounded-lg border"
              />
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <div className="prose prose-sm max-w-none">
              <DialogDescription className="text-base leading-relaxed whitespace-pre-wrap">
                {internship.description}
              </DialogDescription>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">How to Apply</h3>
          {internship.applicationMethod === 'external' ? (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button 
                variant="default"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleApplyClick}
                asChild
              >
                <a href={internship.applicationValue} target="_blank" rel="noopener noreferrer">
                  Apply Online
                </a>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                To apply, send your CV to:
              </p>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <a 
                  href={`mailto:${internship.applicationValue}`}
                  className="text-primary hover:underline font-medium flex-1"
                >
                  {internship.applicationValue}
                </a>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  Copy Email
                </Button>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};