"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function Post({ params }) {
    const id = params.id;
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URI + "post/" + id)
            .then((res) => res.json())
            .then((res) => setPost(res));
    }, []);
    return <>{
        post && <main className="container mx-auto px-4 py-6">
            <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
            <p className="text-gray-500">Published On {post.created_at_formatted}</p>
            <img src={post.image} width={300} height={200} alt="Post Image" className="my-4" />
            <p>{post.description}</p>
        </main>
    }
    </>

}