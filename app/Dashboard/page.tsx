// app/admin/dashboard/page.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
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

// Mock Data
const mockGiveaways = [
  {
    id: 1,
    name: 'Mega Giveaway 2024',
    status: 'active',
    participants: 1200,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    description: 'Win amazing prizes!',
  },
  {
    id: 2,
    name: 'Tech Bonanza',
    status: 'completed',
    participants: 850,
    startDate: '2023-11-01',
    endDate: '2023-12-01',
    description: 'Tech gadgets giveaway',
  },
];

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/user1.jpg',
    entries: 5,
    referrals: 3,
    lastActivity: '2024-03-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: '/user2.jpg',
    entries: 2,
    referrals: 1,
    lastActivity: '2024-03-10',
    status: 'inactive',
  },
];

const mockPrizes = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    image: '/iphone.jpg',
    stock: 10,
    value: '1,200,000',
  },
  {
    id: 2,
    name: 'MacBook Pro',
    image: '/macbook.jpg',
    stock: 5,
    value: '2,500,000',
  },
];

// New: Mock Comments Data
const mockComments = [
  {
    id: 1,
    name: 'Alice',
    avatar: '/user1.jpg',
    comment:
      "I'm so excited for this giveaway! I've been waiting for something like this all year.",
    timestamp: '2 hours ago',
    likes: 12,
    dislikes: 1,
  },
  {
    id: 2,
    name: 'Bob',
    avatar: '/user2.jpg',
    comment: "Can't wait to see the prizes. Fingers crossed for me!",
    timestamp: '1 day ago',
    likes: 8,
    dislikes: 0,
  },
  {
    id: 3,
    name: 'Charlie',
    avatar: '/user3.jpg',
    comment: "This is the best giveaway ever! The prizes look amazing.",
    timestamp: '3 days ago',
    likes: 15,
    dislikes: 2,
  },
  {
    id: 4,
    name: 'Dana',
    avatar: '/user4.jpg',
    comment: "I shared it with all my friends already. Let's win big!",
    timestamp: '5 days ago',
    likes: 20,
    dislikes: 3,
  },
];

// BarChart Data
const chartData = [
  { name: 'iPhone 15 Pro', participants: 1200, prizesWon: 200 },
  { name: 'MacBook Pro', participants: 850, prizesWon: 150 },
  { name: 'PlayStation 5', participants: 600, prizesWon: 100 },
  { name: 'Samsung Galaxy S23', participants: 500, prizesWon: 80 },
  { name: 'Nintendo Switch', participants: 400, prizesWon: 60 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  // For the Participants dropdown option:
  const [participantOption, setParticipantOption] = useState<'participants' | 'comments'>('participants');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Settings state variables
  const [logoUrl, setLogoUrl] = useState('/logo.png');
  const [winRatio, setWinRatio] = useState(0.1); // 10% default
  const [tryAgainText, setTryAgainText] = useState('Try Again');

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
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
            onClick={() => {
              setActiveTab('giveaways');
              setIsSidebarOpen(false);
            }}
          >
            <Gift className="mr-2 h-5 w-5" />
            Prizes & Giveaways
          </Button>
          {/* Participants Dropdown */}
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
                  <AvatarFallback>AD</AvatarFallback>
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
            <TabsList className="hidden lg:grid w-full grid-cols-5 bg-green-50 p-3 rounded-lg mb-6">
              <TabsTrigger value="overview" className="rounded-md">
                Overview
              </TabsTrigger>
              <TabsTrigger value="giveaways" className="rounded-md">
                Giveaways
              </TabsTrigger>
              {/* Participants tab is now a single trigger showing the dropdown selection */}
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

            {/* Giveaways Tab */}
            <TabsContent value="giveaways">
              <Card className="bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-green-900">Manage Giveaways</CardTitle>
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                    Create New
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockGiveaways.map((giveaway) => (
                        <TableRow key={giveaway.id}>
                          <TableCell>{giveaway.name}</TableCell>
                          <TableCell>
                            <Badge variant={giveaway.status === 'active' ? 'default' : 'secondary'}>
                              {giveaway.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{giveaway.participants}</TableCell>
                          <TableCell>{giveaway.startDate}</TableCell>
                          <TableCell>{giveaway.endDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">⋯</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Participants (Dropdown) Tab */}
            <TabsContent value="participants">
              {participantOption === 'participants' ? (
                // Participants Management Table
                <Card className="bg-white hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">Participants Management</CardTitle>
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
                        {mockUsers.map((user) => (
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
                // Comments Management Table
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
                        {mockComments.map((comment) => (
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
                              <span className="text-gray-800">
                                {comment.comment.length > 50
                                  ? comment.comment.substring(0, 50) + '...'
                                  : comment.comment}
                              </span>
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
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  Approve
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Delete
                                </Button>
                              </div>
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
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                    Add New Prize
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPrizes.map((prize) => (
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
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline">Edit</Button>
                          <Button variant="destructive">Delete</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
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
                    <div>
                      <label className="block text-green-900 font-semibold mb-1">Logo URL</label>
                      <Input
                        type="text"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="Enter logo image URL"
                        className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-green-900 font-semibold mb-1">Win Ratio / Probability</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={winRatio}
                        onChange={(e) => setWinRatio(parseFloat(e.target.value))}
                        placeholder="e.g., 0.1 for 10%"
                        className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                      />
                    </div>
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
