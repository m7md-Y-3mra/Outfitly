"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IMetaPagination } from "@/@types/database.type";

interface TablePaginationProps {
  meta?: IMetaPagination;
  basePath: string;
}

const TablePagination = ({ meta, basePath }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!meta) {
    return null;
  }

  const { page, limit, total, totalPages } = meta;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-900/30 flex items-center justify-between text-xs text-muted-foreground">
      <span>
        Showing {start}-{end} of {total} items
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 rounded-md border border-stone-200 dark:border-stone-700 hover:bg-white dark:hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-3 py-1 text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 rounded-md border border-stone-200 dark:border-stone-700 hover:bg-white dark:hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
