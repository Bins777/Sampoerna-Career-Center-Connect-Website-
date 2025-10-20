import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterSidebar } from './FilterSidebar';
import { MobileFilterSheet } from './MobileFilterSheet';
import { InternshipCard } from './InternshipCard';
import { InternshipModal } from './InternshipModal';
import { useToast } from '@/hooks/use-toast';
import { Internship, FilterState } from '@/types';
import { useInternships } from '@/contexts/InternshipContext';

// Mock data - in real app this would come from an API
const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'TechCorp Indonesia',
    location: 'Jakarta, Indonesia',
    duration: '3 months',
    description: `We are seeking a motivated Software Engineering Intern to join our dynamic development team. This internship offers hands-on experience in full-stack development, working with modern technologies and contributing to real-world projects.

Key Responsibilities:
• Develop and maintain web applications using React and Node.js
• Collaborate with senior developers on feature implementation
• Participate in code reviews and team meetings
• Write clean, maintainable, and well-documented code
• Assist in testing and debugging applications

Requirements:
• Currently pursuing a degree in Computer Science or related field
• Basic knowledge of JavaScript, HTML, and CSS
• Familiarity with React framework
• Understanding of version control (Git)
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork abilities

What We Offer:
• Mentorship from experienced software engineers
• Exposure to modern development practices and technologies
• Opportunity to work on production applications
• Flexible working hours
• Potential for full-time employment upon graduation`,
    major: ['Computer Science'],
    industry: ['Technology'],
    views: 124,
    isStarred: false,
    isViewed: false,
    applyClicks: 15,
    applicationMethod: 'external' as const,
    applicationValue: 'https://techcorp.id/careers/apply'
  },
  {
    id: '2',
    title: 'Financial Analyst Intern',
    company: 'Banking Solutions Ltd',
    location: 'Surabaya, Indonesia',
    duration: '4 months',
    description: `Join our finance team as a Financial Analyst Intern and gain valuable experience in corporate finance, investment analysis, and financial modeling.

Key Responsibilities:
• Assist in financial statement analysis and reporting
• Support investment research and due diligence processes
• Create and maintain financial models and forecasts
• Prepare presentations for management and stakeholders
• Analyze market trends and competitor performance

Requirements:
• Currently pursuing a degree in Business Administration, Finance, or Economics
• Strong analytical and quantitative skills
• Proficiency in Microsoft Excel and PowerPoint
• Knowledge of financial principles and accounting
• Excellent written and verbal communication skills
• Detail-oriented with strong organizational abilities

What We Offer:
• Exposure to various aspects of corporate finance
• Training in financial modeling and analysis tools
• Networking opportunities within the financial industry
• Professional development workshops
• Competitive stipend`,
    major: ['Business Administration'],
    industry: ['Finance'],
    views: 89,
    isStarred: false,
    isViewed: false,
    applyClicks: 8,
    applicationMethod: 'email' as const,
    applicationValue: 'careers@bankingsolutions.co.id'
  },
  {
    id: '3',
    title: 'Mechanical Design Intern',
    company: 'Engineering Solutions Inc',
    location: 'Bandung, Indonesia',
    duration: '6 months',
    description: `We are looking for a passionate Mechanical Design Intern to support our engineering team in developing innovative mechanical solutions.

Key Responsibilities:
• Assist in 3D modeling and CAD design using SolidWorks
• Support product development and prototyping
• Conduct basic engineering calculations and analysis
• Participate in design reviews and testing procedures
• Document design specifications and technical reports

Requirements:
• Currently pursuing a degree in Mechanical Engineering
• Proficiency in CAD software (SolidWorks preferred)
• Understanding of mechanical design principles
• Knowledge of manufacturing processes
• Strong mathematical and analytical skills
• Ability to work in a team environment

What We Offer:
• Hands-on experience with cutting-edge design tools
• Mentorship from senior engineers
• Opportunity to work on real engineering projects
• Access to modern engineering facilities
• Professional development opportunities`,
    major: ['Mechanical Engineering'],
    industry: ['Machinery'],
    views: 67,
    isStarred: false,
    isViewed: false,
    applyClicks: 12,
    applicationMethod: 'external' as const,
    applicationValue: 'https://engsolutions.co.id/apply-internship'
  }
];

export const StudentDashboard: React.FC = () => {
  const { internships, updateInternship } = useInternships();
  const [filters, setFilters] = useState<FilterState>({ majors: [], industries: [], timePosted: 'all', location: 'all' });
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const filteredInternships = useMemo(() => {
    let filtered = internships;

    // Apply filters
    if (filters.majors.length > 0) {
      filtered = filtered.filter(internship =>
        internship.major.some(major => filters.majors.includes(major))
      );
    }

    if (filters.industries.length > 0) {
      filtered = filtered.filter(internship =>
        internship.industry.some(industry => filters.industries.includes(industry))
      );
    }

    // Apply time filters
    if (filters.timePosted && filters.timePosted !== 'all') {
      const now = new Date();
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());
      
      // Mock creation dates for demonstration (in real app, this would be from the data)
      filtered = filtered.map(internship => ({
        ...internship,
        createdAt: internship.createdAt || new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000) // Random date within last 60 days
      }));

      switch (filters.timePosted) {
        case 'newest':
          filtered = filtered.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
          break;
        case '1month':
          filtered = filtered.filter(internship => 
            internship.createdAt && new Date(internship.createdAt) >= oneMonthAgo
          );
          break;
        case '2months':
          filtered = filtered.filter(internship => 
            internship.createdAt && new Date(internship.createdAt) >= twoMonthsAgo
          );
          break;
        case 'oldest':
          filtered = filtered.sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
          break;
      }
    }

    // Apply location filters
    if (filters.location && filters.location !== 'all') {
      const jabodetabekAreas = ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi'];
      
      switch (filters.location) {
        case 'jabodetabek':
          filtered = filtered.filter(internship => 
            jabodetabekAreas.some(area => 
              internship.location.toLowerCase().includes(area)
            )
          );
          break;
        case 'non-jabodetabek':
          filtered = filtered.filter(internship => 
            !jabodetabekAreas.some(area => 
              internship.location.toLowerCase().includes(area)
            )
          );
          break;
      }
    }

    // Filter out expired internships
    const now = new Date();
    filtered = filtered.filter(internship => 
      !internship.expiresAt || internship.expiresAt > now
    );

    // Apply tab filters
    switch (activeTab) {
      case 'starred':
        filtered = filtered.filter(internship => internship.isStarred);
        break;
      case 'viewed':
        filtered = filtered.filter(internship => internship.isViewed);
        break;
      default:
        break;
    }

    return filtered;
  }, [internships, filters, activeTab]);

  const handleToggleStar = (id: string) => {
    const internship = internships.find(i => i.id === id);
    if (internship) {
      updateInternship(id, { isStarred: !internship.isStarred });
    }
  };

  const handleViewDetails = (internship: Internship) => {
    // Mark as viewed and increment view count
    updateInternship(internship.id, { 
      isViewed: true, 
      views: internship.views + 1 
    });
    
    setSelectedInternship({ ...internship, isViewed: true, views: internship.views + 1 });
    setIsModalOpen(true);
  };

  const handleApplyClick = (internshipId: string) => {
    // Track apply click
    const internship = internships.find(i => i.id === internshipId);
    if (internship) {
      updateInternship(internshipId, { applyClicks: internship.applyClicks + 1 });
    }

    toast({
      title: "Application Tracked",
      description: "Your interest has been recorded. You would normally be redirected to the application portal.",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Available Internships
                </h2>
                <p className="text-muted-foreground">
                  Discover exciting internship opportunities tailored for Sampoerna University students
                </p>
              </div>
              <MobileFilterSheet filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="all">All Listings</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
              <TabsTrigger value="viewed">Viewed Listings</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship) => (
                    <InternshipCard
                      key={internship.id}
                      internship={internship}
                      onToggleStar={handleToggleStar}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No internships match your current filters.</p>
                    <p className="text-sm mt-1">Try adjusting your search criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="starred" className="space-y-4">
              <div className="grid gap-4">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship) => (
                    <InternshipCard
                      key={internship.id}
                      internship={internship}
                      onToggleStar={handleToggleStar}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No starred internships found.</p>
                    <p className="text-sm mt-1">Star internships you're interested in to see them here.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="viewed" className="space-y-4">
              <div className="grid gap-4">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship) => (
                    <InternshipCard
                      key={internship.id}
                      internship={internship}
                      onToggleStar={handleToggleStar}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No viewed internships found.</p>
                    <p className="text-sm mt-1">View internship details to see them here.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modal */}
      <InternshipModal
        internship={selectedInternship}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyClick={handleApplyClick}
      />
    </div>
  );
};