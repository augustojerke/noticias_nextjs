"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/noticia`);
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 rounded-lg shadow-md w-96">
        {session ? (
          <p className="text-xl font-semibold mb-4">
            Olá, {session.user?.name}!
          </p>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Entrar com Google
          </button>
        )}
      </div>
    </div>
  );
}
