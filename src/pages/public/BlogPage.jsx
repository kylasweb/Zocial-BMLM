import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BlogPage() {
  const [posts] = useState([
    {
      id: 1,
      title: 'Understanding Binary Matrix Systems',
      excerpt: 'Learn how our binary matrix system works and how to maximize your earnings...',
      author: 'John Doe',
      date: '2023-12-01',
      category: 'Education',
      image: '/blog/binary-matrix.jpg'
    },
    {
      id: 2,
      title: 'The Future of Blockchain in MLM',
      excerpt: 'Explore how blockchain technology is revolutionizing the MLM industry...',
      author: 'Jane Smith',
      date: '2023-11-28',
      category: 'Technology',
      image: '/blog/blockchain.jpg'
    },
    // Add more blog posts
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-xl md:text-2xl mb-8">Latest News and Updates</p>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Post image placeholder */}
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {post.category} • {post.date}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="text-gray-900 font-medium">{post.author}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}