"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, X, Send, ThumbsUp } from 'lucide-react';
import type { Review } from '@/types/product';

interface HomeReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

function getRandomHelpful(id: string) {
  // Use a seeded pseudo-random for stable numbers per review
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const min = 9, max = 27;
  return min + (Math.abs(hash) % (max - min + 1));
}

const HomeReviews: React.FC<HomeReviewsProps> = ({ 
  reviews = [], 
  averageRating = 0, 
  totalReviews = 0 
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    title: '',
    content: ''
  });
  // Track likes per review (not persisted)
  const [likes, setLikes] = useState(() => {
    const initial: Record<string, number> = {};
    reviews.forEach(r => {
      initial[r.id] = getRandomHelpful(r.id);
    });
    return initial;
  });
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Placeholder avatar for reviews without custom avatars
  const placeholderAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80";

  // Show only 5 reviews
  const displayReviews = reviews.slice(0, 5);

  const handleLike = (id: string) => {
    if (liked[id]) return;
    setLikes(l => ({ ...l, [id]: l[id] + 1 }));
    setLiked(l => ({ ...l, [id]: true }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReviewForm(false);
    setShowSuccess(true);
    setFormData({ name: '', rating: 5, title: '', content: '' });
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (reviews.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-gray-300" />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share your experience with our products!</p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-[#0046be] hover:bg-[#003494] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Reviews Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {/* Rating Summary */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-[#0046be] fill-[#0046be]' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Based on {totalReviews} reviews</p>
                    </div>
                  </div>
                </div>

                {/* Write Review Button */}
                <div className="flex items-center">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-[#0046be] hover:bg-[#003494] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Write a Review
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="divide-y divide-gray-200">
              {displayReviews.map((review, index) => (
                <div key={`${review.id}-${index}`} className="p-6">
                  <div className="flex items-start gap-4">
                    <Image 
                      src={review.avatar || placeholderAvatar} 
                      alt={review.author}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 flex items-center gap-2 flex-wrap sm:flex-nowrap">
                            {review.author}
                            {review.verified && (
                              <span className="flex items-center text-[#0046be] text-sm">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Verified Purchase
                              </span>
                            )}
                          </h3>
                          <div className="text-sm text-gray-500">
                            {review.location && `${review.location} 2 `}
                            {review.purchaseDate && `Purchased ${review.purchaseDate}`}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                      </div>

                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-[#0046be] fill-[#0046be]' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>

                      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-600">{review.content}</p>
                      <button
                        onClick={() => handleLike(review.id)}
                        className={`mt-2 flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors duration-200 ${
                          liked[review.id] 
                            ? 'bg-[#0046be] text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        aria-pressed={liked[review.id]}
                        disabled={liked[review.id]}
                      >
                        <ThumbsUp className="h-4 w-4" /> Helpful ({likes[review.id]})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Reviews Link */}
            {reviews.length > 5 && (
              <div className="p-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                  Showing 5 of {totalReviews} reviews
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowReviewForm(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        className={`p-1 ${i < formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-transparent"
                    placeholder="Summarize your experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Content
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-transparent resize-none"
                    placeholder="Share your detailed experience..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#0046be] hover:bg-[#003494] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Review submitted successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeReviews; 