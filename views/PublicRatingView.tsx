
import React, { useState } from 'react';
import { Icons } from '../constants';

import { useParams, useSearchParams } from 'react-router-dom';

const PublicRatingView: React.FC = () => {
  const { businessId } = useParams();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('rid'); // Assuming we pass ?rid=... in the link

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [businessName, setBusinessName] = useState('Loading...');
  const [googleUrl, setGoogleUrl] = useState('https://maps.google.com');
  const [ratingEventId, setRatingEventId] = useState<string | null>(null);

  React.useEffect(() => {
    if (businessId) {
      fetch(`http://localhost:5000/api/rate/${businessId}`)
        .then(res => res.json())
        .then(data => {
          if (data.business_name) {
            setBusinessName(data.business_name);
            setGoogleUrl(data.google_review_url);
          }
        })
        .catch(err => setBusinessName('Business Not Found'));
    }
  }, [businessId]);

  const handleRatingSelect = async (selectedRating: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rate/${businessId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stars: selectedRating,
          request_id: requestId
        })
      });
      const data = await res.json();

      setRating(selectedRating);
      if (data.redirect) {
        setGoogleUrl(data.url); // Prepare URL (or auto redirect if preferred)
      } else if (data.feedback_form) {
        setRatingEventId(data.rating_event_id);
        setShowFeedbackForm(true);
      }
    } catch (err) {
      console.error("Error submitting rating", err);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating_event_id: ratingEventId,
          message: comment,
          contact_optional: contact
        })
      });
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error("Error submitting feedback", err);
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-orange-50 text-orange-600 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-premium shadow-orange-500/10">
          <Icons.Check className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black text-slate-950 tracking-tighter mb-4">Thank you for your feedback</h1>
        <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed">
          Your insights help us improve. We've received your comments and will review them shortly.
        </p>
      </div>
    );
  }

  if (rating === 5) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-orange-50 text-orange-600 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-premium shadow-orange-500/10">
          <Icons.Star className="w-12 h-12 fill-orange-600" />
        </div>
        <h1 className="text-4xl font-black text-slate-950 tracking-tighter mb-4">We're so glad you enjoyed it!</h1>
        <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed mb-12">
          Could you take 30 seconds to share your experience on Google? It helps others find us.
        </p>
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-950 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-slate-800 transition-all shadow-stripe hover:-translate-y-1"
        >
          Continue to Google Reviews
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        {!showFeedbackForm ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 border border-orange-100">
              Customer Experience
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter mb-8 leading-tight">
              How was your <br />visit to <span className="text-orange-600">{businessName}</span>?
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-16">Select a rating to share your feedback.</p>

            <div className="flex justify-center gap-3 md:gap-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onMouseEnter={() => setHoveredRating(s)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => handleRatingSelect(s)}
                  className="group relative"
                >
                  <Icons.Star
                    className={`w-12 h-12 md:w-20 md:h-20 transition-all duration-300 ${(hoveredRating || rating) >= s ? 'text-orange-500 scale-110 drop-shadow-xl' : 'text-slate-100'
                      } group-hover:scale-125`}
                  />
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {s === 1 ? 'Poor' : s === 3 ? 'Good' : s === 5 ? 'Perfect' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 text-left">
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="text-slate-400 font-bold text-sm mb-8 flex items-center gap-2 hover:text-slate-900 transition-colors"
            >
              <Icons.ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <h2 className="text-4xl font-black text-slate-950 tracking-tighter mb-4 leading-tight">How can we improve?</h2>
            <p className="text-lg text-slate-500 font-medium mb-10">We're sorry we didn't meet your expectations. Please let us know what happened so we can make it right.</p>

            <form onSubmit={handleSubmitFeedback} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Your Feedback</label>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-6 py-5 rounded-3xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none h-40 transition-all font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Phone or Email (Optional)</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="If you'd like a follow-up"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-stripe"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Powered by</span>
        <div className="flex items-center gap-1.5 font-bold text-orange-600 text-sm">
          <Icons.Star className="w-4 h-4 fill-orange-600" />
          TrustPulse
        </div>
      </div>
    </div>
  );
};

export default PublicRatingView;
