import { Cake, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../stores/auth-store";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLogingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function validation() {
    if (!formData.email) return toast.error("enter email");
    if (formData.password.length < 6)
      return toast.error("passsword must be greater than 6");

    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const success = validation();

    if (success === true) login(formData);
  }
  return (
    <div className="flex justify-center items-center h-screen max-w-7xl mx-auto">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 w-full">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <Cake className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Login Account</h1>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="z-10 absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              {isLogingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login to Account"
              )}
            </button>
          </form>
        </div>
        <div className="flex gap-6 mt-4 label font-medium">
          <h1>if you dont have any account:</h1>
          <Link to={"/signup"} className="text-blue-400 font-medium underline">
            signup
          </Link>
        </div>
      </div>
    </div>
  );
}
