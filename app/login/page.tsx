import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
        <LoginForm />
      </div>
    </main>
  );
}