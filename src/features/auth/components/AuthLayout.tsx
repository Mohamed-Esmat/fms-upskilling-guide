import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import authBgImg from "@/assets/images/auth-bg.png";
import logoImg from "@/assets/images/logo.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${authBgImg})` }}
      >
        {/* Linear gradient overlay from green to black at 45deg with opacity */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, rgba(47, 140, 96, 0.85), rgba(0, 0, 0, 0.9))",
          }}
        />
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="block">
            <img
              src={logoImg}
              alt="Food Management System"
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
