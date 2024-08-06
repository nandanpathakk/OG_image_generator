import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

export const AddPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [ogImageUrl, setOGImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (ogImageUrl) {
      const timer = setTimeout(() => {
        setOGImageUrl(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [ogImageUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append('postImage', image);

    try {
      const response = await axios.post("https://og-image-generator-ce56.onrender.com/userpost", formData);
      setOGImageUrl(response.data.post.ogImageUrl);
    } catch (error) {
      console.error("Error submitting the form", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto flex">
      <div className="w-1/2 p-4 bg-white shadow-md rounded">
      <button
          onClick={() => navigate("/")} // Navigate to the home page
          className="flex items-center mt-4 text-black border font-semibold py-2 px-4 mb-5 rounded focus:outline-none focus:shadow-outline">
          <IoIosArrowRoundBack /> Back to Home
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the title"
              onChange={e => setTitle(e.target.value)}
              type="text"
              value={title}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write here"
              onChange={e => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Image</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              onChange={e => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Post
          </button>
        </form>
       
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-white shadow-md rounded p-4">
          <h1 className="text-xl font-bold mb-2">Preview</h1>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="mb-4">{content}</p>
          {image && <img className="mt-4" src={URL.createObjectURL(image)} alt="preview" />}
          {loading ? (
            <div className="flex items-center justify-center mt-4">
              <svg
                className="animate-spin h-6 w-6 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0114.09-5.57A2 2 0 0116 8h-1.39a6 6 0 00-6.72-3.48A2 2 0 016.28 7.6A8 8 0 014 12z"
                ></path>
              </svg>
            </div>
          ) : (
            ogImageUrl && (
              <div>
                <h2 className="text-xl font-bold mt-4">OG Image</h2>
                <img src={ogImageUrl} alt="OG Image" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
