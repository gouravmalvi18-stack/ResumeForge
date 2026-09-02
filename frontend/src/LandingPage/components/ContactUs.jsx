import React from "react";

const ContactUs = () => {
  return (
    <section className="mx-auto w-full max-w-3xl flex-grow px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Contact Us</h2>
        <p className="text-gray-400">
          Have a question or feedback? We'd love to hear from you. Fill out the
          form below and our team will get back to you shortly.
        </p>
      </div>

      <form className="flex flex-col gap-6 rounded-2xl border border-gray-800 bg-[#121214] p-8 shadow-2xl md:p-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="w-full rounded-lg border border-gray-800 bg-[#0a0a0c] px-4 py-3 text-sm text-white transition-colors focus:border-[#6348ea] focus:ring-1 focus:ring-[#6348ea] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            className="w-full rounded-lg border border-gray-800 bg-[#0a0a0c] px-4 py-3 text-sm text-white transition-colors focus:border-[#6348ea] focus:ring-1 focus:ring-[#6348ea] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-300"
          >
            Your Message
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="How can we help you?"
            className="w-full resize-none rounded-lg border border-gray-800 bg-[#0a0a0c] px-4 py-3 text-sm text-white transition-colors focus:border-[#6348ea] focus:ring-1 focus:ring-[#6348ea] focus:outline-none"
          ></textarea>
        </div>

        <button
          type="button"
          className="mt-2 w-full rounded-lg bg-[#6348ea] py-3.5 font-medium text-white transition-colors hover:bg-[#5035cc]"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
