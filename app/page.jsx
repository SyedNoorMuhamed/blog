"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]); 
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URI + "posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  const searchPost = (e) => {
    if (e.type == 'keydown' && e.key !== 'Enter') {
      return;
    }
    setSearch(true);
    fetch(process.env.NEXT_PUBLIC_API_URI + "posts?q=" + inputRef.current.value)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearch(false))
  }

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Here you can the latest articles.</p>
      </main>
      <div className="flex justify-end px-4">
        <input ref={inputRef} onKeyDown={searchPost} disabled={search} type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button onClick={searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{`${!search ? 'Search' : '...'}`}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p) => (
          <Link href={"/post/" + p._id} key={p._id}>
            <div className="border border-gray-200 p-4">
              <img className="w-full h-48 object-contain mb-4" src={p.image} alt="Post Image" />
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-gray-600">{p.short_description}</p>
            </div>
          </Link>
        ))}
        {!posts.length > 0 && inputRef.current.value && (
          <p>No Posts Available for this query: <b>{inputRef.current.value}</b></p>
        )}
      </div>
    </>
  );
}
