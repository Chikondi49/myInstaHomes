import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Clock, User, Loader2, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setPosts(fetched);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blogs: ", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Full Post View
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-28 pb-20">
          <article className="max-w-4xl mx-auto px-6">
            <button onClick={() => setSelectedPost(null)} className="text-brand-teal font-bold mb-8 hover:text-brand-gold transition-colors">&larr; Back to all posts</button>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8" />
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1"><User size={14} /> {selectedPost.author}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {formatDate(selectedPost.createdAt)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-teal mb-8">{selectedPost.title}</h1>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedPost.content}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  // Blog Listing View
  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-teal mb-4">Blog</h1>
          <div className="h-1.5 w-16 bg-brand-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stories, travel tips, and updates from Mai Insta Homes in the heart of Lilongwe.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20">
              <Loader2 className="animate-spin text-brand-gold mb-4" size={48} />
              <p className="text-gray-500 font-medium">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center p-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-medium text-lg mb-4">No blog posts yet.</p>
              <p className="text-brand-teal text-sm">Check back soon for updates and travel tips!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-teal mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.content}</p>
                    <span className="inline-flex items-center text-brand-gold font-bold text-sm group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
