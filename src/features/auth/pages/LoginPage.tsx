import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Input, Button } from "@/components/ui";
import { useLogin } from "../hooks";
import { loginSchema } from "@/lib/validations";
import type { LoginFormValues } from "@/lib/validations";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Log In</h2>
        <p className="text-gray-500 text-sm mt-1">
          Welcome Back! Please enter your details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input
          type="email"
          placeholder="Enter your E-mail"
          icon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register("email")}
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

        <div className="flex items-center justify-between text-sm">
          <Link to="/register" className="text-gray-600 hover:text-gray-900">
            Register Now?
          </Link>
          <Link
            to="/forgot-password"
            className="text-green-600 hover:text-green-700"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" isLoading={isPending} className="w-full">
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}
