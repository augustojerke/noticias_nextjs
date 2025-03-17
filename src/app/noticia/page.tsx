"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Noticias() {
  const { data: session } = useSession();
  const name = session?.user?.name || "Usuário";
  const image = session?.user?.image || "/default-avatar.png";
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/noticias");
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };
    fetchNoticias();
  }, []);

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
        {noticias?.map((n: any, index) => (
          <div
            key={index}
            className="bg-slate-950 border border-slate-600 rounded-3xl mt-5 hover:bg-slate-200 hover:text-black"
          >
            <Link href={`/noticia/${n.id}`}>{n.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
