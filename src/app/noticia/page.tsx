"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

async function fetchNoticias() {
  const response = await fetch("http://localhost:3000/api/noticias");
  if (!response.ok) {
    throw new Error("Erro ao buscar notícias");
  }
  return response.json();
}

export default function Noticias() {
  const { data: session } = useSession();
  const name = session?.user?.name || "Usuário";
  const image = session?.user?.image || "/default-avatar.png";

  const { data: noticias, error, isLoading } = useQuery({
    queryKey: ["noticias"],
    queryFn: fetchNoticias,
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar notícias.</p>;

  return (
    <div className="text-center px-72">
      <div className="flex justify-center items-center gap-5">
        <h1 className="font-bold text-4xl">Notícias do {name}</h1>
        <Image
          src={image}
          alt={name}
          width={60}
          height={60}
          className="rounded-full mt-4"
        />
      </div>
      <div className="flex-col justify-center items-center">
        {noticias?.map((n) => (
          <div
            key={n.id}
            className="bg-slate-950 border border-slate-600 rounded-3xl mt-5 hover:bg-slate-200 hover:text-black"
          >
            <Link href={`/noticia/${n.id}`}>{n.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}