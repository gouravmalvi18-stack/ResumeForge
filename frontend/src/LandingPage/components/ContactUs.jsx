import { motion } from "motion/react";

const ContactUs = () => {
  // Variants for staggered entrance animation of form children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    // Main section animates the entire content as a block
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-3xl flex-grow px-6  py-20"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Contact Us</h2>
        <p className="text-gray-400">
          Have a question or feedback? We'd love to hear from you. Fill out the
          form below and our team will get back to you shortly.
        </p>
      </div>

      {/* The form container triggers the staggered animation for its children */}
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 rounded-2xl border border-gray-800 bg-[#121214] p-8 shadow-2xl md:p-10"
      >
        {/* Full Name Field */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="w-full rounded-lg border border-gray-800 bg-[#0a0a0c] px-4 py-3 text-sm text-white transition-colors focus:border-[#6348ea] focus:ring-1 focus:ring-[#6348ea] focus:outline-none"
          />
        </motion.div>

        {/* Email Address Field */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            className="w-full rounded-lg border border-gray-800 bg-[#0a0a0c] px-4 py-3 text-sm text-white transition-colors focus:border-[#6348ea] focus:ring-1 focus:ring-[#6348ea] focus:outline-none"
          />
        </motion.div>

        {/* Your Message Textarea */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
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
        </motion.div>

        {/* Send Message Button with Hover and Tap Animations */}
        <motion.button
          type="button"
          variants={itemVariants}
          whileHover={{ scale: 1.02, backgroundColor: "#5035cc" }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full rounded-lg bg-[#6348ea] py-3.5 font-medium text-white shadow-lg transition-colors"
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default ContactUs;
