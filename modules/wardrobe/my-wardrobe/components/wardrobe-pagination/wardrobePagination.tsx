"use client";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";
import { useLocale, useTranslations } from "next-intl";

const WardrobePagination = ({
  paginationDetails: { totalPages },
}: {
  paginationDetails: Omit<GetUserWardrobeItemResponse, "items">;
}) => {
  const t = useTranslations("Wardrobe.pagination");
  const local = useLocale();
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
          {local == "en" ? (
            <Button
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 me-2 rtl:rotate-180" />
              {t("previous")}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              {t("next")}
              <ChevronLeft className="h-4 w-4 ms-2 rtl:rotate-180" />
            </Button>
          )}
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" disabled>
            {page} / {totalPages}
          </Button>
        </PaginationItem>
        <PaginationItem>
          {local == "en" ? (
            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              {t("next")}
              <ChevronRight className="h-4 w-4 ms-2 rtl:rotate-180" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronRight className="h-4 w-4 me-2 rtl:rotate-180" />
              {t("previous")}
            </Button>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default WardrobePagination;
