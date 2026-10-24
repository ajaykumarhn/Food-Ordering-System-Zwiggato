import React from 'react';

const ContactPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-primary text-white px-8 py-10">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-white/80">We're here to help. Reach out anytime and we'll respond as soon as possible.</p>
        </div>
        <div className="p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-secondary">Contact Information</h2>
                <p className="mt-3 text-gray-600">Reach out to our support team for help with orders, account issues, or general questions.</p>
              </div>
              <div className="rounded-3xl border border-gray-100 p-6 bg-gray-50">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">Name</p>
                <p className="text-lg font-medium text-secondary">AJAY</p>
              </div>
              <div className="rounded-3xl border border-gray-100 p-6 bg-gray-50">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">Phone</p>
                <p className="text-lg font-medium text-secondary">6360895454</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 p-6 bg-gray-50">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">Email</p>
                <p className="text-lg font-medium text-secondary">ajaykumar392004@gmail.com</p>
              </div>
              <div className="rounded-3xl border border-gray-100 p-6 bg-gray-50">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">Location</p>
                <p className="text-lg font-medium text-secondary">Ramanagara</p>
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-3xl border border-gray-100 p-8 bg-white">
            <h2 className="text-xl font-semibold text-secondary mb-4">Send a Message</h2>
            <form className="grid grid-cols-1 gap-6">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              <textarea rows="5" placeholder="How can we help?" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none"></textarea>
              <button type="submit" className="w-full bg-primary text-white rounded-2xl py-3 font-semibold hover:bg-orange-600 transition-colors">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
