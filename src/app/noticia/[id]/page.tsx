"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";

async function fetchNoticia(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar a notícia");
  }
  return response.json();
}

async function fetchComentarios(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar comentários");
  }
  return response.json();
}

export default function Noticia({ params }: any) {
  const { id } : any = use(params);

  const { data: noticia, error: noticiaError, isLoading: noticiaLoading } = useQuery({
    queryKey: ["noticia", id],
    queryFn: () => fetchNoticia(id),
  });

  const { data: comentarios, error: comentariosError, isLoading: comentariosLoading } = useQuery({
    queryKey: ["comentarios", id],
    queryFn: () => fetchComentarios(id),
  });

  if (noticiaLoading || comentariosLoading) return <p>Carregando...</p>;
  if (noticiaError || comentariosError) return <p>Erro ao carregar a notícia ou comentários.</p>;

  return (
    <div className="flex-col justify-center items-center h-screen text-center px-10 sm:px-24">
      <h1 className="font-bold text-3xl">Noticia {id}</h1>
      <div>
        <h2 className="mt-10 font-bold text-5xl">{noticia.title}</h2>
        <div className="p-5 mt-5">
          <h2>{noticia.body}</h2>
        </div>
        <h2 className="mt-10 font-bold text-xl text-left">Comentários:</h2>
        <ul className="mt-5 pb-10">
          {comentarios.map((comentario: any) => (
            <li
              key={comentario.id}
              className="border-b border-gray-600 bg-slate-600 p-4 mt-5 rounded-xl text-left"
            >
              <h2 className="text-left font-bold">
                usuario: {comentario.email}
              </h2>
              <strong>{comentario.name}</strong>: {comentario.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}