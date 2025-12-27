import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Input, Button } from "@/components/ui";
import { useResetPassword } from "../hooks";
import { resetPasswordSchema } from "@/lib/validations";
import type { ResetPasswordFormValues } from "@/lib/validations";

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromState,
    },
  });

  useEffect(() => {
    if (emailFromState) {
      setValue("email", emailFromState);
    }
  }, [emailFromState, setValue]);

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetPassword(data);
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-500 text-sm mt-1">
          Please Enter Your OTP or Check Your Inbox
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input
          type="email"
          placeholder="Email"
          icon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          readOnly={!!emailFromState}
          {...register("email")}
        />

        <Input
          type="text"
          placeholder="OTP"
          icon={<Lock className="h-5 w-5" />}
          error={errors.seed?.message}
          {...register("seed")}
        />

        <Input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
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
          placeholder="Confirm New Password"
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

        <Button type="submit" isLoading={isPending} className="w-full">
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
