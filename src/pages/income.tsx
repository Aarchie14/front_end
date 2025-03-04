import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  Home,
  Wallet,
  PiggyBank,
  List,
  CreditCard,
  Menu,
  ArrowLeft,
  Check,
} from "lucide-react";
import darkfont from "@/assets/imgs/darkfont.webp";
import userimg from "@/assets/imgs/user.webp";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Income = () => {
  const NavItem = ({ icon: Icon, label, active, isSidebarOpen }) => (
    <div
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
        active ? "text-indigo-900 font-medium" : "text-gray-400"
      } hover:text-indigo-900 hover:font-medium`}
    >
      {active && (
        <div className="absolute left-0 top-0 h-full w-1 bg-indigo-900 rounded-r-md" />
      )}
      <Icon
        size={24}
        className={`transition-all duration-200 ${
          active ? "text-indigo-900" : "text-gray-400"
        } group-hover:text-indigo-900`}
      />
      {isSidebarOpen && (
        <span className="transition-opacity duration-200 opacity-100 group-hover:opacity-100">
          {label}
        </span>
      )}
    </div>
  );

  const StatCard = ({ title, amount }) => (
    <Card className="p-4 bg-white shadow-lg rounded-2xl mb-4 flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-4 bottom-0 bg-white text-black hover:text-white px-3 py-1">
            <Menu size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Delete clicked")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CardContent className="text-center flex-1">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-black">{amount}</p>
      </CardContent>
    </Card>
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Add actual logout logic here (e.g., clear auth token, redirect to login)
  };

  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex h-screen bg-indigo-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 z-50 h-screen bg-white shadow-md p-4 transition-all duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-48 md:flex-shrink-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16">
          <img
            src={darkfont}
            alt="Logo"
            className="w-32 transition-all duration-300"
          />
          <button onClick={toggleSidebar} className="p-2 rounded-md md:hidden">
            <Menu size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 space-y-2">
          <NavItem icon={Home} label="Dashboard" isSidebarOpen={true} />
          <NavItem
            icon={Wallet}
            label="Income"
            active
            isSidebarOpen={true} // Always show labels in sidebar
          />
          <NavItem icon={CreditCard} label="Expenses" isSidebarOpen={true} />
          <NavItem icon={PiggyBank} label="Savings" isSidebarOpen={true} />
          <NavItem icon={List} label="Budgets" isSidebarOpen={true} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-30 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Menu toggle button - only visible on mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <Menu size={24} />
              </Button>
              <h1 className="text-base sm:text-lg md:text-xl font-bold">
                Income Overview
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-base sm:text-lg md:text-xl font-bold text-black hover:underline">
                About Us
              </button>

              {/* Avatar with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <img
                      src={userimg}
                      alt="User"
                      className="h-full w-full object-cover rounded-full"
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white shadow-lg rounded-md"
                >
                  <DropdownMenuItem
                    onClick={() => console.log("View Profile Clicked")}
                  >
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()} // Prevents dropdown from closing
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Logout Confirmation Dialog */}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will log you out of your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="bg-indigo-100 hover:bg-indigo-300"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-indigo-100 hover:bg-indigo-300 text-black"
                  onClick={handleLogout}
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Chart and Stats Container - Side by Side Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Pie Chart - Takes 2/3 of the space on desktop */}
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px]"
                  >
                    <PieChart>
                      <Pie data={chartData} dataKey="visitors" />
                      <ChartLegend
                        content={<ChartLegendContent nameKey="browser" />}
                        className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards - Stacked vertically, takes 1/3 of the space on desktop */}
            <div className="md:col-span-1 flex flex-col justify-between">
              <StatCard title="Total Income" amount="₱100.00" />
              <StatCard title="Total Expenses" amount="₱100.00" />
              <StatCard title="Total Savings" amount="₱100.00" />
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Income;
