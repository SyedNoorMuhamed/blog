import Post from "../../../components/Post";

export async function generateMetadata({ params }) {
    const id = params.id;

    const post = await fetch(process.env.NEXT_PUBLIC_API_URI + "post/" + id)
        .then((res) => res.json());

    return {
        title: post.title,
        description: post.description
    }
}

export default function Page({ params }) {
    return <Post params={params} />
}