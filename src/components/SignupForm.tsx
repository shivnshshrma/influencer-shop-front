
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Phone, Check } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().length(10, { message: "Phone number must be exactly 10 digits" }).regex(/^\d+$/, { message: "Phone number must contain only digits" }).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

// OTP verification schema
const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters" })
});

type OTPData = z.infer<typeof otpSchema>;

const SignupForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [userData, setUserData] = useState<FormData | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: false
    }
  });
  
  const otpForm = useForm<OTPData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    }
  });
  
  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Store user data for later submission after OTP verification
      setUserData(data);
      
      // Simulate sending OTP to email and phone
      console.log("Sending OTP to:", {
        email: data.email,
        phone: data.phoneNumber ? `+91${data.phoneNumber}` : undefined
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Verification code sent to your email and phone number");
      setShowOtpVerification(true);
    } catch (error) {
      toast.error("Failed to send verification code. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOtpSubmit = async (data: OTPData) => {
    setIsLoading(true);
    
    try {
      if (!userData) {
        throw new Error("User data is missing");
      }
      
      // This is a mock OTP verification - in a real app, you'd verify with a backend
      console.log("Verifying OTP:", data.otp);
      console.log("Creating account with:", {
        name: userData.fullName,
        email: userData.email,
        phone: userData.phoneNumber ? `+91${userData.phoneNumber}` : undefined,
        termsAccepted: userData.terms
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Account created successfully!");
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Go back to signup form
  const handleBackToForm = () => {
    setShowOtpVerification(false);
  };
  
  // Generate mock OTP for demo purposes
  const handleResendOtp = async () => {
    toast.success("New verification code sent");
  };
  
  if (showOtpVerification) {
    return (
      <Form {...otpForm}>
        <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">Verify Your Account</h2>
            <p className="text-gray-600">
              Enter the 6-digit verification code sent to your email and phone number
            </p>
          </div>
          
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP 
                    maxLength={6} 
                    {...field} 
                    onChange={(value) => field.onChange(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="text-center">
            <button 
              type="button" 
              onClick={handleResendOtp}
              className="text-sm text-brand-600 hover:underline"
            >
              Didn't receive a code? Resend
            </button>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify & Create Account"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={handleBackToForm}
              disabled={isLoading}
            >
              Back
            </Button>
          </div>
        </form>
      </Form>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="flex items-center justify-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md">
                    <Phone className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm font-medium">+91</span>
                  </div>
                  <Input
                    className="rounded-l-none"
                    type="text" 
                    inputMode="numeric"
                    placeholder="1234567890"
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      e.target.value = value;
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="******" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="******" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  I agree to the <a href="#" className="text-brand-600 hover:underline">Terms and Conditions</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending Verification Code..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
