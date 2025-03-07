export default async function Noticia({ params }: any) {
  const { id } = params;

  const [postRes, commentsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`),
  ]);

  const noticia = await postRes.json();
  const comentarios = await commentsRes.json();

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
