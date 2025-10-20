import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  MousePointer, 
  Plus, 
  FileText, 
  CheckCircle, 
  XCircle,
  Eye
} from 'lucide-react';
import { DashboardMetrics, AIGeneratedDraft, Internship } from '@/types';
import { AddInternshipForm } from './AddInternshipForm';
import { useInternships } from '@/contexts/InternshipContext';
import { useAuth } from '@/contexts/AuthContext';

// Mock data
const mockMetrics: DashboardMetrics = {
  totalInternships: 12,
  totalClicks: 35,
  totalStudents: 156,
  activeApplications: 87
};

const mockAIDrafts: AIGeneratedDraft[] = [
  {
    id: '1',
    title: 'Data Science Intern',
    company: 'PT Analytics Pro',
    sourceFile: 'internship_posting_001.pdf',
    parsedContent: {
      title: 'Data Science Intern',
      company: 'PT Analytics Pro',
      location: 'Jakarta, Indonesia',
      duration: '4 months',
      description: 'Join our data science team to work on machine learning projects...',
      major: ['Computer Science', 'Statistics'],
      industry: ['Technology']
    },
    status: 'pending'
  },
  {
    id: '2',
    title: 'Marketing Assistant',
    company: 'Creative Agency XYZ',
    sourceFile: 'marketing_intern_req.pdf',
    parsedContent: {
      title: 'Marketing Assistant Intern',
      company: 'Creative Agency XYZ',
      location: 'Surabaya, Indonesia',
      duration: '3 months',
      description: 'Support marketing campaigns and content creation...',
      major: ['Business Administration', 'Visual Communication'],
      industry: ['Marketing']
    },
    status: 'pending'
  }
];

export const AdminDashboard: React.FC = () => {
  const [aiDrafts, setAIDrafts] = useState<AIGeneratedDraft[]>(mockAIDrafts);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const { addInternship } = useInternships();
  const { setUser } = useAuth();

  const handleReviewDraft = (id: string) => {
    // In a real app, this would open a detailed review modal
    console.log('Reviewing draft:', id);
  };

  const handleApproveDraft = (id: string) => {
    setAIDrafts(prev => prev.map(draft =>
      draft.id === id ? { ...draft, status: 'approved' as const } : draft
    ));
  };

  const handleRejectDraft = (id: string) => {
    setAIDrafts(prev => prev.map(draft =>
      draft.id === id ? { ...draft, status: 'rejected' as const } : draft
    ));
  };

  const handleAddInternship = (internshipData: Omit<Internship, 'id' | 'views' | 'applyClicks' | 'isStarred' | 'isViewed'>) => {
    addInternship(internshipData);
    console.log('New internship added:', internshipData);
  };

  const handleSwitchToStudentView = () => {
    setUser({ id: '1', name: 'Demo Student', email: 'student@sampoerna.edu', role: 'student' });
  };

  const pendingDrafts = aiDrafts.filter(draft => draft.status === 'pending');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage internship listings and monitor platform analytics
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSwitchToStudentView}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Student Dashboard
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Internships</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.totalInternships}</div>
            <p className="text-xs text-muted-foreground">
              Active listings on platform
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockMetrics.totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              Apply button clicks tracked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.activeApplications}</div>
            <p className="text-xs text-muted-foreground">
              Applications in progress
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage" className="space-y-6">
        <TabsList>
          <TabsTrigger value="manage">Manage Listings</TabsTrigger>
          <TabsTrigger value="ai-drafts">
            AI Drafts 
            {pendingDrafts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingDrafts.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Internship Management
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => setIsAddFormOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add New Internship
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Manual Posting</p>
                <p>Click the "Add New Internship" button to manually create a new internship listing.</p>
                <p className="text-sm mt-2">This feature would open a form to input internship details.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-drafts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Review AI-Generated Drafts
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Review and approve internship listings automatically parsed from PDF files
              </p>
            </CardHeader>
            <CardContent>
              {pendingDrafts.length > 0 ? (
                <div className="space-y-4">
                  {pendingDrafts.map((draft) => (
                    <Card key={draft.id} className="border border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {draft.title}
                              </h3>
                              <p className="text-sm text-primary font-medium">
                                {draft.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              <span>Source: {draft.sourceFile}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {draft.parsedContent.major?.map((major) => (
                                <Badge key={major} variant="outline" className="text-xs">
                                  {major}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReviewDraft(draft.id)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              Review
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleApproveDraft(draft.id)}
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectDraft(draft.id)}
                              className="flex items-center gap-1"
                            >
                              <XCircle className="h-3 w-3" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No Pending Drafts</p>
                  <p>All AI-generated drafts have been reviewed.</p>
                  <p className="text-sm mt-2">New drafts will appear here when PDF files are processed.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddInternshipForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddInternship}
      />
    </div>
  );
};