import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Globe,
  Phone,
  Upload,
} from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Input, Button } from "@/components/ui";
import { useRegister } from "../hooks";
import { registerSchema } from "@/lib/validations";
import type { RegisterFormValues } from "@/lib/validations";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    // Build FormData for multipart request
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    registerUser(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Register</h2>
        <p className="text-gray-500 text-sm mt-1">
          Welcome Back! Please enter your details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="UserName"
            icon={<User className="h-5 w-5" />}
            error={errors.userName?.message}
            {...register("userName")}
          />

          <Input
            type="email"
            placeholder="Enter your E-mail"
            icon={<Mail className="h-5 w-5" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            type="text"
            placeholder="Country"
            icon={<Globe className="h-5 w-5" />}
            error={errors.country?.message}
            {...register("country")}
          />

          <Input
            type="tel"
            placeholder="PhoneNumber"
            icon={<Phone className="h-5 w-5" />}
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            icon={<Lock className="h-5 w-5" />}
            endIcon={
              showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )
            }
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="confirm-password"
            icon={<Lock className="h-5 w-5" />}
            endIcon={
              showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )
            }
            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        {/* Profile Image Upload (Optional) */}
        <div className="flex items-center gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <Upload className="h-5 w-5" />
            {profileImage ? "Change Image" : "Upload Profile Image"}
          </button>
          {profileImage && (
            <span className="text-sm text-gray-500">{profileImage.name}</span>
          )}
        </div>

        <div className="flex items-center justify-end text-sm">
          <Link to="/login" className="text-green-600 hover:text-green-700">
            Login Now?
          </Link>
        </div>

        <Button type="submit" isLoading={isPending} className="w-full">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
