import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

interface Post {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    ogImageUrl: string;
}

export const Post = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getpost');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="space-y-4">
            {posts.map(post => (
                <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
                    <Helmet>
                        <meta property="og:image" content={post.ogImageUrl} />
                        <meta property="og:title" content={post.title} />
                        <meta property="og:description" content={post.content} />
                    </Helmet>
                    <h2>Post</h2>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p className="mb-4">{post.content}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" className="mb-4 max-w-full h-auto" />}
                    <h2>Generated OG Image</h2>
                    {post.ogImageUrl && <img src={post.ogImageUrl} alt="OG Image" className="mb-4 max-w-full h-auto" />}
                </div>
            ))}
        </div>
    );
};
