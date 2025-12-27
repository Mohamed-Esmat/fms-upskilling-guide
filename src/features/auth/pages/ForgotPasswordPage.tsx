import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Input, Button } from "@/components/ui";
import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema } from "@/lib/validations";
import type { ForgotPasswordFormValues } from "@/lib/validations";

export function ForgotPasswordPage() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data);
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Forgot Your Password?
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          No worries! Please enter your email and we will send a password reset
          link
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          icon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" isLoading={isPending} className="w-full">
          Submit
        </Button>
      </form>
    </AuthLayout>
  );
}
