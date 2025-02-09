/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Gift, Users, Settings, LogOut, ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import { BarChart, ResponsiveContainer, Bar } from 'recharts';
import { Input } from '@/components/ui/input';

// -----------------
// Define TypeScript interfaces for our data
// -----------------

interface Question {
  id: string;
  question: string;
  answers: string[];
}

interface Prize {
  id: string;
  name: string;
  image: string;
  description: string;
  stock: number;
  value: string;
}

interface Comment {
  id: string;
  name: string;
  avatar: string;
  comment: string;
  timestamp: string;
  likes: number;
  dislikes: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  entries: number;
  referrals: number;
  lastActivity: string;
  status: string;
}

// -----------------
// Dummy Data for Frontend Purposes
// -----------------

const dummyQuestions: Question[] = [
  {
    id: 'q1',
    question: 'What is your favorite color?',
    answers: ['Red', 'Blue', 'Green'],
  },
  {
    id: 'q2',
    question: 'What is your favorite animal?',
    answers: ['Dog', 'Cat', 'Bird'],
  },
];

const dummyPrizes: Prize[] = [
  {
    id: 'p1',
    name: 'Gift Card',
    image: '/giftcard.jpg',
    description: 'A $50 gift card',
    stock: 10,
    value: '$50',
  },
  {
    id: 'p2',
    name: 'MacBook',
    image: '/macbook.jpg',
    description: 'Cool macbook pro m4',
    stock: 20,
    value: '$1500',
  },
  {
    id: 'p3',
    name: 'Iphone',
    image: '/iphone.jpg',
    description: 'Latest iphone',
    stock: 20,
    value: '$650',
  },
];

const dummyComments: Comment[] = [
  {
    id: 'c1',
    name: 'Alice',
    avatar: 'user.jpg',
    comment: 'Thought it was usual scam, turns out to be legit ',
    timestamp: '2025-02-08',
    likes: 10,
    dislikes: 0,
  },
  {
    id: 'c2',
    name: 'Bob',
    avatar: 'user.jpg',
    comment: 'Needs improvement tho, but thanks for the giftcard',
    timestamp: '2025-02-07',
    likes: 2,
    dislikes: 3,
  },
];

const dummyUsers: User[] = [
  {
    id: 'u1',
    name: 'Charlie',
    avatar: 'user.jpg',
    entries: 5,
    referrals: 2,
    lastActivity: '2025-02-08',
    status: 'active',
  },
  {
    id: 'u2',
    name: 'Dana',
    avatar: 'user.jpg',
    entries: 3,
    referrals: 1,
    lastActivity: '2025-02-06',
    status: 'inactive',
  },
];

// -----------------
// Mock BarChart Data (unchanged)
// -----------------
const chartData = [
  { name: 'iPhone 15 Pro', participants: 1200, prizesWon: 200 },
  { name: 'MacBook Pro', participants: 850, prizesWon: 150 },
  { name: 'PlayStation 5', participants: 600, prizesWon: 100 },
  { name: 'Samsung Galaxy S23', participants: 500, prizesWon: 80 },
  { name: 'Trip to Maldives', participants: 400, prizesWon: 60 },
];

// -----------------
// AdminDashboard Component
// -----------------

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [participantOption, setParticipantOption] = useState<'participants' | 'comments'>('participants');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Settings state variables
  // Instead of a logo URL input, we use an upload mechanism:
  const [logoUrl, setLogoUrl] = useState('/logo.png');
  const [logoUploading, setLogoUploading] = useState<boolean>(false);
  const [winRatio, setWinRatio] = useState(0.1); // 10% default
  const [tryAgainText, setTryAgainText] = useState('Try Again');

  // Local state for our data using dummy data
  const [questions, setQuestions] = useState<Question[]>(dummyQuestions);
  const [prizes, setPrizes] = useState<Prize[]>(dummyPrizes);
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [users, setUsers] = useState<User[]>(dummyUsers);

  // State for editing/adding questions
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState<string>('');
  const [answersText, setAnswersText] = useState<string>(''); // comma-separated answers
  const [newQuestionMode, setNewQuestionMode] = useState<boolean>(false);

  // State for editing/adding prizes
  const [editingPrizeId, setEditingPrizeId] = useState<string | null>(null);
  const [prizeName, setPrizeName] = useState<string>('');
  const [prizeImage, setPrizeImage] = useState<string>(''); // will hold the image URL
  const [prizeDescription, setPrizeDescription] = useState<string>('');
  const [prizeStock, setPrizeStock] = useState<number>(0);
  const [prizeValue, setPrizeValue] = useState<string>('');
  const [newPrizeMode, setNewPrizeMode] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // State for editing/adding comments
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');

  // -----------------
  // Sidebar click-outside handler
  // -----------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings Saved:', { logoUrl, winRatio, tryAgainText });
    alert('Settings have been updated!');
  };

  // -----------------
  // Utility: simple ID generator
  // -----------------
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // -----------------
  // Additional logic for win ratio
  // -----------------
  const getWinRatioMessage = (ratio: number) => {
    // Ensure ratio is within 0 and 1.
    const clamped = Math.max(0, Math.min(1, ratio));
    const percentage = (clamped * 100).toFixed(0);
    if (clamped < 0.1) return `Win Ratio is ${percentage}%. Low probability.`;
    if (clamped < 0.3) return `Win Ratio is ${percentage}%. Moderate probability.`;
    return `Win Ratio is ${percentage}%. High probability.`;
  };

  // -----------------
  // Handler for logo upload
  // -----------------
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setLogoUploading(true);
    // Simulate an upload by generating a temporary URL
    const logoURL = URL.createObjectURL(file);
    setLogoUrl(logoURL);
    setLogoUploading(false);
  };

  // -----------------
  // CRUD Handlers for Questions (using local state)
  // -----------------
  const handleEditQuestion = (q: Question) => {
    setEditingQuestionId(q.id);
    setQuestionText(q.question);
    setAnswersText(q.answers.join(', '));
    setNewQuestionMode(false);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleSaveQuestion = () => {
    const trimmedQuestion = questionText.trim();
    const answersArray = answersText.split(',').map((ans) => ans.trim()).filter((ans) => ans);
    if (!trimmedQuestion || answersArray.length === 0) {
      alert('Please enter a valid question and at least one answer.');
      return;
    }

    if (newQuestionMode) {
      const newQuestion: Question = {
        id: generateId(),
        question: trimmedQuestion,
        answers: answersArray,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    } else if (editingQuestionId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestionId
            ? { ...q, question: trimmedQuestion, answers: answersArray }
            : q
        )
      );
    }
    setEditingQuestionId(null);
    setQuestionText('');
    setAnswersText('');
    setNewQuestionMode(false);
  };

  const handleCancelQuestion = () => {
    setEditingQuestionId(null);
    setQuestionText('');
    setAnswersText('');
    setNewQuestionMode(false);
  };

  const handleNewQuestion = () => {
    setNewQuestionMode(true);
    setEditingQuestionId(null);
    setQuestionText('');
    setAnswersText('');
  };

  // -----------------
  // CRUD Handlers for Prizes (using local state)
  // -----------------
  const handleEditPrize = (p: Prize) => {
    setEditingPrizeId(p.id);
    setPrizeName(p.name);
    setPrizeImage(p.image);
    setPrizeDescription(p.description);
    setPrizeStock(p.stock);
    setPrizeValue(p.value);
    setNewPrizeMode(false);
  };

  const handleDeletePrize = (id: string) => {
    if (confirm('Are you sure you want to delete this prize?')) {
      setPrizes((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSavePrize = () => {
    const trimmedName = prizeName.trim();
    if (!trimmedName) {
      alert('Please enter a valid prize name.');
      return;
    }
    if (newPrizeMode) {
      const newPrize: Prize = {
        id: generateId(),
        name: trimmedName,
        image: prizeImage,
        description: prizeDescription,
        stock: prizeStock,
        value: prizeValue,
      };
      setPrizes((prev) => [...prev, newPrize]);
    } else if (editingPrizeId) {
      setPrizes((prev) =>
        prev.map((p) =>
          p.id === editingPrizeId
            ? {
                ...p,
                name: trimmedName,
                image: prizeImage,
                description: prizeDescription,
                stock: prizeStock,
                value: prizeValue,
              }
            : p
        )
      );
    }
    setEditingPrizeId(null);
    setPrizeName('');
    setPrizeImage('');
    setPrizeDescription('');
    setPrizeStock(0);
    setPrizeValue('');
    setNewPrizeMode(false);
  };

  const handleCancelPrize = () => {
    setEditingPrizeId(null);
    setPrizeName('');
    setPrizeImage('');
    setPrizeDescription('');
    setPrizeStock(0);
    setPrizeValue('');
    setNewPrizeMode(false);
  };

  const handleNewPrize = () => {
    setNewPrizeMode(true);
    setEditingPrizeId(null);
    setPrizeName('');
    setPrizeImage('');
    setPrizeDescription('');
    setPrizeStock(0);
    setPrizeValue('');
  };

  // Simulated file upload for prize image using URL.createObjectURL
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setPrizeImage(imageURL);
  };

  // -----------------
  // CRUD Handlers for Comments (using local state)
  // -----------------
  const handleEditComment = (c: Comment) => {
    setEditingCommentId(c.id);
    setCommentText(c.comment);
  };

  const handleSaveComment = () => {
    if (!editingCommentId) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === editingCommentId ? { ...c, comment: commentText.trim() } : c
      )
    );
    setEditingCommentId(null);
    setCommentText('');
  };

  const handleDeleteComment = (id: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleCancelComment = () => {
    setEditingCommentId(null);
    setCommentText('');
  };

  // -----------------
  // Render the Dashboard
  // -----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Mobile Backdrop */}
      {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" />}
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-green-700 text-white p-6 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center gap-2 mb-8">
          <Image width={100} height={100} src={logoUrl} alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Giveaway Admin</h1>
        </div>
        <nav className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
            onClick={() => {
              setActiveTab('overview');
              setIsSidebarOpen(false);
            }}
          >
            <Home className="mr-2 h-5 w-5" />
            Overview
          </Button>
          {/* Questions Tab */}
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
            onClick={() => {
              setActiveTab('questions');
              setIsSidebarOpen(false);
            }}
          >
            <Gift className="mr-2 h-5 w-5" />
            Questions
          </Button>
          {/* Participants/Comments Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-between text-white hover:bg-green-600">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  {participantOption === 'participants' ? 'Participants' : 'Comments'}
                </div>
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                onClick={() => {
                  setParticipantOption('participants');
                  setActiveTab('participants');
                  setIsSidebarOpen(false);
                }}
              >
                Participants
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setParticipantOption('comments');
                  setActiveTab('participants');
                  setIsSidebarOpen(false);
                }}
              >
                Comments
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
            onClick={() => {
              setActiveTab('prizes');
              setIsSidebarOpen(false);
            }}
          >
            <Gift className="mr-2 h-5 w-5" />
            Prizes
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-between text-white hover:bg-green-600">
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </div>
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                onClick={() => {
                  setActiveTab('settings');
                  setIsSidebarOpen(false);
                }}
              >
                General
              </DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuItem>Security</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white shadow-sm px-4 sm:px-6">
          <Button variant="ghost" className="p-2 lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl font-semibold text-green-900">Dashboard</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/admin-avatar.png" alt="Admin" />
                  <AvatarFallback>GC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-5 w-5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Main Area */}
        <main className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Adjusted Tabs: Overview, Questions, Participants/Comments, Prizes, Settings */}
            <TabsList className="hidden lg:grid w-full grid-cols-5 bg-green-50 p-3 rounded-lg mb-6">
              <TabsTrigger value="overview" className="rounded-md">
                Overview
              </TabsTrigger>
              <TabsTrigger value="questions" className="rounded-md">
                Questions
              </TabsTrigger>
              <TabsTrigger value="participants" className="rounded-md">
                {participantOption === 'participants' ? 'Participants' : 'Comments'}
              </TabsTrigger>
              <TabsTrigger value="prizes" className="rounded-md">
                Prizes
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-md">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">Total Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-green-700">2,458</div>
                    <div className="text-sm text-green-500">+12.3% from last month</div>
                  </CardContent>
                </Card>
                <Card className="bg-white hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">Active Giveaways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-green-700">5</div>
                    <div className="text-sm text-green-500">2 ending soon</div>
                  </CardContent>
                </Card>
                <Card className="bg-white hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">Prizes Awarded</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-green-700">189</div>
                    <div className="text-sm text-green-500">+8.5% from last month</div>
                  </CardContent>
                </Card>
                <Card className="bg-white hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">Referral Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-green-700">68%</div>
                    <div className="text-sm text-green-500">+10.2% from last month</div>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-8 bg-white hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-green-900">Participants vs Prizes Won</CardTitle>
                </CardHeader>
                <CardContent className="h-[50vh]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <Bar dataKey="participants" fill="#2563eb" radius={4} />
                      <Bar dataKey="prizesWon" fill="#60a5fa" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions">
              <Card className="bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-green-900">Manage Questions</CardTitle>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleNewQuestion}
                  >
                    Add New Question
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Answers</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questions.map((q) => (
                        <TableRow key={q.id}>
                          <TableCell>{q.question}</TableCell>
                          <TableCell>{q.answers.join(', ')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditQuestion(q)}>
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteQuestion(q.id)}>
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {(editingQuestionId || newQuestionMode) && (
                    <div className="mt-4 border p-4 rounded">
                      <Input
                        type="text"
                        placeholder="Enter question"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Enter answers separated by commas"
                        value={answersText}
                        onChange={(e) => setAnswersText(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveQuestion} className="bg-green-600 hover:bg-green-700 text-white">
                          Save
                        </Button>
                        <Button onClick={handleCancelQuestion} variant="destructive">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Participants/Comments Tab */}
            <TabsContent value="participants">
              {participantOption === 'participants' ? (
                <Card className="bg-white hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">Users Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Entries</TableHead>
                          <TableHead>Referrals</TableHead>
                          <TableHead>Last Activity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                {user.name}
                              </div>
                            </TableCell>
                            <TableCell>{user.entries}</TableCell>
                            <TableCell>{user.referrals}</TableCell>
                            <TableCell>{user.lastActivity}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost">Manage</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">Manage Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Comment</TableHead>
                          <TableHead>Likes</TableHead>
                          <TableHead>Dislikes</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {comments.map((comment) => (
                          <TableRow key={comment.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.avatar} />
                                  <AvatarFallback>{comment.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-gray-900">{comment.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {editingCommentId === comment.id ? (
                                <Input
                                  type="text"
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                />
                              ) : (
                                <span className="text-gray-800">
                                  {comment.comment.length > 50
                                    ? comment.comment.substring(0, 50) + '...'
                                    : comment.comment}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge>{comment.likes}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{comment.dislikes}</Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-gray-600 text-sm">{comment.timestamp}</span>
                            </TableCell>
                            <TableCell>
                              {editingCommentId === comment.id ? (
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" onClick={handleSaveComment}>
                                    Save
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={handleCancelComment}>
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEditComment(comment)}>
                                    Edit
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Prizes Tab */}
            <TabsContent value="prizes">
              <Card className="bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-green-900">Prize Inventory</CardTitle>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleNewPrize}
                  >
                    Add New Prize
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prizes.map((prize) => (
                      <Card key={prize.id} className="bg-green-50 hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-green-900">{prize.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Image
                            width={500}
                            height={300}
                            src={prize.image}
                            alt={prize.name}
                            className="w-full h-56 object-cover rounded-lg"
                          />
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">Stock:</span>
                              <Badge>{prize.stock}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Value:</span>
                              <span>₦{prize.value}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {prize.description}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditPrize(prize)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeletePrize(prize.id)}>
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  {(editingPrizeId || newPrizeMode) && (
                    <div className="mt-4 border p-4 rounded">
                      <h3 className="text-lg font-bold mb-4">
                        {newPrizeMode ? 'Add New Prize' : 'Edit Prize'}
                      </h3>
                      <Input
                        type="text"
                        placeholder="Prize Name"
                        value={prizeName}
                        onChange={(e) => setPrizeName(e.target.value)}
                        className="mb-2"
                      />
                      {/* File input for prize image upload */}
                      <Input
                        type="file"
                        onChange={handleFileUpload}
                        className="mb-2"
                        disabled={uploading}
                      />
                      {uploading && <p className="text-sm text-gray-600">Uploading image...</p>}
                      {prizeImage && (
                        <div className="mb-2">
                          <Image src={prizeImage} alt="Prize Preview" width={200} height={150} className="rounded" />
                        </div>
                      )}
                      <Input
                        type="text"
                        placeholder="Description"
                        value={prizeDescription}
                        onChange={(e) => setPrizeDescription(e.target.value)}
                        className="mb-2"
                      />
                      <Input
                        type="number"
                        placeholder="Stock"
                        value={prizeStock}
                        onChange={(e) => setPrizeStock(Number(e.target.value))}
                        className="mb-2"
                      />
                      <Input
                        type="text"
                        placeholder="Value"
                        value={prizeValue}
                        onChange={(e) => setPrizeValue(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSavePrize} className="bg-green-600 hover:bg-green-700 text-white">
                          Save
                        </Button>
                        <Button onClick={handleCancelPrize} variant="destructive">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="bg-white hover:shadow-xl transition-shadow max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-green-900">General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    {/* Logo Upload Field */}
                    <div>
                      <label className="block text-green-900 font-semibold mb-1">Logo</label>
                      <Input
                        type="file"
                        onChange={handleLogoUpload}
                        className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        disabled={logoUploading}
                      />
                      {logoUploading && <p className="text-sm text-gray-600">Uploading logo...</p>}
                      {logoUrl && (
                        <div className="mt-2">
                          <Image src={logoUrl} alt="Logo Preview" width={100} height={100} className="rounded" />
                        </div>
                      )}
                    </div>
                    {/* Win Ratio Field with Additional Logic */}
                    <div>
                      <label className="block text-green-900 font-semibold mb-1">Win Ratio / Probability</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={winRatio}
                        onChange={(e) => setWinRatio(parseFloat(e.target.value))}
                        onBlur={() => {
                          // Clamp the win ratio between 0 and 1
                          if (winRatio < 0) setWinRatio(0);
                          if (winRatio > 1) setWinRatio(1);
                        }}
                        placeholder="e.g., 0.1 for 10%"
                        className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                      />
                      <p className="text-sm text-gray-600 mt-1">{getWinRatioMessage(winRatio)}</p>
                    </div>
                    {/* Try Again Action Text */}
                    <div>
                      <label className="block text-green-900 font-semibold mb-1">Try Again Action Text</label>
                      <Input
                        type="text"
                        value={tryAgainText}
                        onChange={(e) => setTryAgainText(e.target.value)}
                        placeholder="Enter button text"
                        className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                      />
                    </div>
                    <div>
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors">
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
