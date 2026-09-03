import { motion } from "motion/react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="mt-auto border-t border-gray-800 bg-[#0e0e11] py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <motion.svg
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="h-4 w-4 cursor-pointer text-gray-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </motion.svg>
          <span className="text-sm font-semibold text-gray-400">
            ResumeForge
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-6 text-sm text-gray-500"
        >
          <h1 className="text-sm text-neutral-600">
            © 2026 ResumeForge. Built for ambitious careers.
          </h1>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
