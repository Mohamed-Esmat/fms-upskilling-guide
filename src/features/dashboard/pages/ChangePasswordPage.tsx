import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Input, Button } from "@/components/ui";
import { useChangePassword } from "@/features/auth/hooks";
import { changePasswordSchema } from "@/lib/validations";
import type { ChangePasswordFormValues } from "@/lib/validations";

export function ChangePasswordPage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Change"
        highlightedText="Password"
        description="Update your password to keep your account secure"
      />

      <div className="bg-white rounded-2xl p-6 max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type={showOldPassword ? "text" : "password"}
            placeholder="Old Password"
            icon={<Lock className="h-5 w-5" />}
            endIcon={
              showOldPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )
            }
            onEndIconClick={() => setShowOldPassword(!showOldPassword)}
            error={errors.oldPassword?.message}
            {...register("oldPassword")}
          />

          <Input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            icon={<Lock className="h-5 w-5" />}
            endIcon={
              showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )
            }
            onEndIconClick={() => setShowNewPassword(!showNewPassword)}
            error={errors.newPassword?.message}
            {...register("newPassword")}
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
            error={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />

          <Button type="submit" isLoading={isPending} className="w-full">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
