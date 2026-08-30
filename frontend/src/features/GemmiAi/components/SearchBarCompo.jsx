import { SearchIcon } from "./AllSvg";

const SearchBarCompo = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex w-full items-center rounded-2xl border border-white/5 bg-[#201f20]/60 p-2 shadow-lg backdrop-blur-xl">
      <div className="relative w-full flex-1">
        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-neutral-500">
          <SearchIcon />
        </span>
        <input
          id="reportSearch"
          type="text"
          placeholder="Search by role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-transparent bg-[#2a2a2b]/50 py-3 pr-4 pl-12 text-sm text-neutral-100 transition-all placeholder:text-neutral-500 focus:ring-2 focus:ring-[#6348ea]/50 focus:outline-none md:text-base"
        />
      </div>
    </div>
  );
};

export default SearchBarCompo;
