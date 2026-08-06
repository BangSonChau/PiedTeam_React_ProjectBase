import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import type { PaginationMeta } from "../type";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/shared/components/ui/pagination";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

//className dùng có thể override lại syle của pagination component

function Pagination({ meta, onPageChange }: PaginationProps) {
  const { currentPage, totalPages, hasPreviousPage, hasNextPage } = meta;

  if (totalPages <= 1) return null; //nếu chỉ có 1 trang thì không hiển thị pagination

  const getPageNumbers = (): (number | "...")[] => {
    const pageNumbers: (number | "...")[] = [];
    const maxVisiblePages = 5; // Số trang hiển thị tối đa

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPreviousPage}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

export default Pagination;
