import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-[#0e0e11] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-sm font-semibold text-gray-400">
            ResumeForge
          </span>
        </div>

        <div className="flex gap-6 text-sm text-gray-500">
          <h1 className="text-sm text-neutral-600">
            © 2026 ResumeForge. Built for ambitious careers.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
