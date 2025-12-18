"use client";

const TablePagination = () => {
  return (
    <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/30 flex items-center justify-between text-xs text-muted-foreground">
      <span>Showing 1-5 of 128 users</span>
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-md border border-stone-200 hover:bg-white transition-colors disabled:opacity-50">
          Previous
        </button>
        <button className="px-3 py-1 rounded-md border border-stone-200 hover:bg-white transition-colors">
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
