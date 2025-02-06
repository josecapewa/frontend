"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

export function CustomPagination({
  currentPage,
  totalPages,
  prefix,
}: {
  totalPages?: number;
  currentPage: number;
  prefix?: string;
}) {
  const queryName = prefix ? `${prefix}_page` : "page";
  const [searchParams, setSearchParams] = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params;
    },
    [searchParams]
  );

  const onClick = (page: number) => {
    setSearchParams(createQueryString(queryName, page.toString()));
  };
  if (totalPages === undefined) {
    return (
      <Pagination>
        <PaginationContent>
          <Skeleton className="h-10 w-10 mx-1" />
          <Skeleton className="h-10 w-10 mx-1" />
          <Skeleton className="h-10 w-10 mx-1" />
          <Skeleton className="h-10 w-10 mx-1" />
        </PaginationContent>
      </Pagination>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage - 1 < 1}
            onClick={() => onClick(currentPage - 1)}
          />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => onClick(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink onClick={() => onClick(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => onClick(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            disabled={totalPages <= currentPage}
            onClick={() => onClick(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
