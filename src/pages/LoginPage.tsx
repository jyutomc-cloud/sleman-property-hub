import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) throw error;
        toast.success("Registrasi berhasil! Silakan cek email untuk verifikasi.");
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success("Login berhasil!");
        navigate("/admin");
      }
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container flex items-center justify-center py-16">
        <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <LogIn className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">{isSignUp ? "Daftar Akun" : "Login Admin"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isSignUp ? "Buat akun baru untuk mengakses panel admin" : "Masuk ke panel admin SLM Properti"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls + " mt-1"} placeholder="admin@slmproperti.com" required />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls + " mt-1"} placeholder="••••••••" required minLength={6} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : isSignUp ? "Daftar" : "Masuk"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isSignUp ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-primary hover:underline">
              {isSignUp ? "Login" : "Daftar"}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
