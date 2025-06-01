
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileButton from "./ProfileButton";
import AIChatRoom from "./AIChatRoom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleSignupSuccess = () => {
    setIsSignupOpen(false);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-700">InfluStyle</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  placeholder="Search products, influencers..."
                  className="pl-10 bg-gray-50"
                  onClick={() => setIsSearchOpen(true)}
                  readOnly
                />
              </div>
              <AIChatRoom />
            </div>
            <a href="#how-it-works" className="text-gray-700 hover:text-brand-600">How It Works</a>
            <a href="#for-influencers" className="text-gray-700 hover:text-brand-600">For Influencers</a>
            <a href="#for-shoppers" className="text-gray-700 hover:text-brand-600">For Shoppers</a>
            
            {isLoggedIn ? (
              <ProfileButton />
            ) : (
              <div className="flex space-x-3">
                <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline">Log In</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Log In to Your Account</SheetTitle>
                      <SheetDescription>
                        Enter your credentials to access your account
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <LoginForm onSuccess={handleLoginSuccess} />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Sheet open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                  <SheetTrigger asChild>
                    <Button>Sign Up</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Create Your Account</SheetTitle>
                      <SheetDescription>
                        Fill out the form below to get started
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <SignupForm onSuccess={handleSignupSuccess} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <div className="px-3 py-2">
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  placeholder="Search products, influencers..." 
                  className="pl-10 w-full bg-gray-50"
                  onClick={() => setIsSearchOpen(true)}
                  readOnly
                />
              </div>
              <AIChatRoom />
            </div>
            <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              How It Works
            </a>
            <a href="#for-influencers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              For Influencers
            </a>
            <a href="#for-shoppers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              For Shoppers
            </a>
            <div className="mt-4 space-y-2 px-3">
              {isLoggedIn ? (
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = "/profile";
                  }}
                >
                  My Profile
                </Button>
              ) : (
                <>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="w-full" variant="outline">Log In</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Log In to Your Account</SheetTitle>
                        <SheetDescription>
                          Enter your credentials to access your account
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <LoginForm onSuccess={() => setIsMenuOpen(false)} />
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="w-full">Sign Up</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Create Your Account</SheetTitle>
                        <SheetDescription>
                          Fill out the form below to get started
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <SignupForm onSuccess={() => setIsMenuOpen(false)} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search products, influencers..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Products">
              <CommandItem className="flex items-center gap-2 py-3">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Headphones" 
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <p className="font-medium">Wireless Noise-Cancelling Headphones</p>
                  <p className="text-sm text-gray-500">$249</p>
                </div>
              </CommandItem>
              <CommandItem className="flex items-center gap-2 py-3">
                <img 
                  src="https://images.unsplash.com/photo-1611741385334-864f40e100b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Yoga Mat" 
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <p className="font-medium">Premium Yoga Mat</p>
                  <p className="text-sm text-gray-500">$89</p>
                </div>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Influencers">
              <CommandItem className="flex items-center gap-2 py-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Emma Johnson" 
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <p className="font-medium">Emma Johnson</p>
                  <p className="text-sm text-gray-500">Fashion & Style</p>
                </div>
              </CommandItem>
              <CommandItem className="flex items-center gap-2 py-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Alex Rivera" 
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <p className="font-medium">Alex Rivera</p>
                  <p className="text-sm text-gray-500">Fitness & Wellness</p>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </nav>
  );
};

export default Navbar;
