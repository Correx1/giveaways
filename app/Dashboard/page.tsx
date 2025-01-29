// app/admin/dashboard/page.tsx
'use client';
import { useState } from 'react';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Gift, Users, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

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
    image: '/iphone.jpg',
    stock: 5,
    value: '2,500,000',
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-green-700 text-white p-6">
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Giveaway Admin</h1>
        </div>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
          >
            <Home className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
          >
            <Gift className="mr-2 h-4 w-4" />
            Giveaways
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
          >
            <Users className="mr-2 h-4 w-4" />
            Participants
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-green-600"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white shadow-sm px-6">
          <h2 className="text-xl font-semibold text-green-900">Dashboard</h2>
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
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Dashboard Area */}
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-green-50 p-2 rounded-lg">
              <TabsTrigger value="overview" className="rounded-md">
                Overview
              </TabsTrigger>
              <TabsTrigger value="giveaways" className="rounded-md">
                Giveaways
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-md">
                Participants
              </TabsTrigger>
              <TabsTrigger value="prizes" className="rounded-md">
                Prizes
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">
                      Total Participants
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-700">2,458</div>
                    <div className="text-sm text-green-500">
                      +12.3% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">
                      Active Giveaways
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-700">5</div>
                    <div className="text-sm text-green-500">2 ending soon</div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">
                      Prizes Awarded
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-700">189</div>
                    <div className="text-sm text-green-500">
                      +8.5% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-900">
                      Referral Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-700">68%</div>
                    <div className="text-sm text-green-500">
                      +10.2% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Giveaways Tab */}
            <TabsContent value="giveaways" className="mt-6">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-900">
                      Manage Giveaways
                    </CardTitle>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Create New
                    </Button>
                  </div>
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
                            <Badge
                              variant={
                                giveaway.status === 'active'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
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

            {/* Participants Tab */}
            <TabsContent value="users" className="mt-6">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-green-900">
                    Participants Management
                  </CardTitle>
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
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                  {user.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.entries}</TableCell>
                          <TableCell>{user.referrals}</TableCell>
                          <TableCell>{user.lastActivity}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === 'active'
                                  ? 'default'
                                  : 'destructive'
                              }
                            >
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
            </TabsContent>

            {/* Prizes Tab */}
            <TabsContent value="prizes" className="mt-6">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-900">
                      Prize Inventory
                    </CardTitle>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Add New Prize
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPrizes.map((prize) => (
                      <Card key={prize.id} className="bg-green-50">
                        <CardHeader>
                          <CardTitle className="text-green-900">
                            {prize.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>

                          
                          <Image
                            src={prize.image}
                            width={100}
                            height={100}
                            alt={prize.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />


                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                              <span>Stock:</span>
                              <Badge>{prize.stock}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Value:</span>
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
          </Tabs>
        </main>
      </div>
    </div>
  );
}