"use client";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";

const WardrobePagination = ({
  paginationDetails: { totalPages },
}: {
  paginationDetails: Omit<GetUserWardrobeItemResponse, "items">;
}) => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" disabled>
            {page} / {totalPages}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="mr-2 h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default WardrobePagination;
