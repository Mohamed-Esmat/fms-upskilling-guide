import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Input, Button } from "@/components/ui";
import { useVerifyAccount } from "../hooks";
import { verifyAccountSchema } from "@/lib/validations";
import type { VerifyAccountFormValues } from "@/lib/validations";

export function VerifyAccountPage() {
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const { mutate: verifyAccount, isPending } = useVerifyAccount();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyAccountFormValues>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      email: emailFromState,
    },
  });

  useEffect(() => {
    if (emailFromState) {
      setValue("email", emailFromState);
    }
  }, [emailFromState, setValue]);

  const onSubmit = (data: VerifyAccountFormValues) => {
    verifyAccount(data);
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verify Account</h2>
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
          error={errors.code?.message}
          {...register("code")}
        />

        <Button type="submit" isLoading={isPending} className="w-full">
          send
        </Button>
      </form>
    </AuthLayout>
  );
}
