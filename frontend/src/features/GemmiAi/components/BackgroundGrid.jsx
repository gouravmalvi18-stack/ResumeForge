const BackgroundGrid = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-900/30 font-body-md text-on-surface">
      <div className="relative flex flex-col">
        {/* Decorative Ambient Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] h-[300px] w-[300px] animate-pulse rounded-full bg-primary/10 mix-blend-screen blur-[80px] duration-10000 md:top-[-20%] md:left-[-15%] md:h-[600px] md:w-[600px] md:blur-[120px]"></div>
          <div className="absolute right-[-5%] bottom-[-5%] h-[250px] w-[250px] rounded-full bg-secondary/10 mix-blend-screen blur-[60px] md:bottom-[-10%] md:h-[500px] md:w-[500px] md:blur-[100px]"></div>

          <svg className="absolute inset-0 h-full w-full opacity-5">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
              </pattern>
            </defs>
            <rect fill="url(#grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-20 min-h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundGrid;
