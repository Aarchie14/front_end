import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  Home,
  Wallet,
  PiggyBank,
  List,
  CreditCard,
  Menu,
  Users,
  Target,
  Eye,
} from "lucide-react";
import darkfont from "@/assets/imgs/darkfont.webp";
import userimg from "@/assets/imgs/user.webp";
import { Separator } from "@/components/ui/separator";
import halfbg from "@/assets/imgs/halfbg.webp";
import art from "@/assets/imgs/heart.webp";
import vin from "@/assets/imgs/vin.webp";
import gil from "@/assets/imgs/jil.webp";
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

const Budgets = () => {
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Add actual logout logic here (e.g., clear auth token, redirect to login)
  };

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
          <NavItem icon={Wallet} label="Income" isSidebarOpen={true} />
          <NavItem icon={CreditCard} label="Expenses" isSidebarOpen={true} />
          <NavItem icon={PiggyBank} label="Goals" isSidebarOpen={true} />
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
        <main className="flex-1 p-0 overflow-y-auto">
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

          <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section
              className="relative h-[400px] bg-cover bg-center text-white"
              style={{ backgroundImage: `url(${halfbg})` }}
            >
              <div className="absolute inset-0 bg-black/50" />{" "}
              {/* Adds a dark overlay */}
              <div className="container mx-auto px-4 py-20 relative">
                <div className="max-w-3xl mx-auto text-center fade-in">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Welcome to FinanceFlow!
                  </h1>
                  <p className="text-lg md:text-xl opacity-90 text-justify">
                    At FinanceFlow, we believe that managing your personal
                    finances should be straightforward, empowering, and
                    accessible to everyone. Our mission is to help individuals
                    take control of their financial lives through a
                    comprehensive and user-friendly finance tracking tool that
                    simplifies budgeting, saving, and investing.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto slide-up">
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold">Our Story</h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed text-justify">
                    FinanceFlow was born out of a simple yet powerful idea: to
                    help individuals and businesses gain control over their
                    finances with ease. We realized that many people struggle
                    with budgeting, tracking expenses, and making informed
                    financial decisions.
                  </p>
                  <p className="mt-4 text-gray-700 text-lg leading-relaxed text-justify">
                    Our journey began with a passion for financial literacy and
                    technology. We assembled a team of experts in finance and
                    software development to create an intuitive platform that
                    simplifies financial management for everyone.
                  </p>
                  <p className="mt-4 text-gray-700 text-lg leading-relaxed text-justify">
                    Since our launch, we’ve been committed to continuous
                    innovation. We listen to our users, adapt to their needs,
                    and refine our platform to provide the best possible
                    experience. Our story is just beginning, and we’re excited
                    to be part of your financial journey.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-10 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto slide-up">
                  <div className="flex items-center gap-2 mb-6">
                    <Target className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed text-justify">
                    At FinanceFlow, our mission is to empower you to take charge
                    of your finances. We strive to provide you with the tools
                    and resources you need to make informed financial decisions,
                    set achievable goals, and ultimately achieve financial
                    freedom.
                  </p>
                  <p className="mt-4 text-gray-700 text-lg leading-relaxed text-justify">
                    We believe that everyone deserves the opportunity to build a
                    secure financial future. That’s why we are committed to
                    delivering a user-friendly, educational, and intuitive
                    platform that simplifies personal finance management.
                  </p>
                  <p className="mt-4 text-gray-700 text-lg leading-relaxed text-justify">
                    Our goal is not just to track your finances but to educate
                    and guide you toward smarter money habits, better
                    investments, and long-term financial stability. We are here
                    to support you every step of the way.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Vision Section */}
            <section className="py-10 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto slide-up">
                  <div className="flex items-center gap-2 mb-6">
                    <Eye className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed text-justify">
                    We prioritize simplicity by offering a user-friendly design
                    and straightforward features that make finance tracking
                    accessible to everyone. Transparency is at the core of our
                    approach, ensuring clear communication and honest practices
                    so users fully understand how our platform works. Our
                    mission is to empower individuals with the knowledge and
                    tools they need to take control of their financial future.
                    Additionally, we foster a strong sense of community,
                    providing a supportive space where users can share
                    experiences, tips, and encouragement.
                  </p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="py-20  bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto slide-up">
                  <h2 className="text-3xl font-bold text-center mb-4">
                    Meet Our Team
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed text-center text-justify mb-10">
                    Our dedicated team of finance enthusiasts, developers, and
                    customer support specialists is passionate about helping you
                    succeed. We are committed to continuously improving our
                    platform based on user feedback and the latest financial
                    trends.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {/* Team Member Cards */}
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <img
                      src={gil}
                      alt="Team Member"
                      className="w-full h-60 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl text-center font-semibold mb-2">
                      Gil John Rey Naldoza
                    </h3>
                    <p className="text-center text-indigo-500">
                      UI/UX Designer
                    </p>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <img
                      src={vin}
                      alt="Team Member"
                      className="w-full h-60 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl text-center font-semibold mb-2">
                      Vin Marcus Gerebise
                    </h3>
                    <p className="text-center text-indigo-500">
                      Backend and Frontend Logic Programmer
                    </p>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <img
                      src={art}
                      alt="Team Member"
                      className="w-full h-60 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl text-center font-semibold mb-2">
                      Heart Chiong
                    </h3>
                    <p className=" text-center text-indigo-500">
                      Frontend Logic and Frontend Design Programmer
                    </p>
                  </Card>
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-blue-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">FinanceFlow</h3>
                    <p className="text-white">Keep Your Finances</p>
                    <p>Flowing Smoothly</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-white">
                      <li>Dashboard</li>
                      <li>About Us</li>
                      <li>Privacy & Terms</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                    <p className="text-white">info@FinanceFlow.com</p>
                    <p className="text-white">(+63) 9363 6327 333</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                    <p className="text-white">Instagram</p>
                    <p className="text-white">Facebook</p>
                  </div>
                </div>
                <Separator className="my-8 bg-gray-800" />
                <p className="text-center text-gray-400 text-sm">
                  © {new Date().getFullYear()} Financial Expert. All rights
                  reserved.
                </p>
              </div>
            </footer>
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

export default Budgets;
