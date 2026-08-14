import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])
  return [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
}

export function CategoryPagination({
  page,
  totalPages,
  disabled,
  onPageChange,
}: {
  page: number
  totalPages: number
  disabled: boolean
  onPageChange: (page: number) => void
}) {
  const normalizedTotalPages = Math.max(1, totalPages)
  const normalizedPage = Math.min(Math.max(1, page), normalizedTotalPages)
  const pages = getVisiblePages(normalizedPage, normalizedTotalPages)
  const goTo = (nextPage: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (
      !disabled &&
      nextPage !== normalizedPage &&
      nextPage >= 1 &&
      nextPage <= normalizedTotalPages
    ) {
      onPageChange(nextPage)
    }
  }

  return (
    <Pagination className="justify-end" aria-label="Phân trang danh mục">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={goTo(normalizedPage - 1)}
            aria-disabled={disabled || normalizedPage === 1}
            className={
              disabled || normalizedPage === 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {pages.map((item, index) => (
          <PaginationItem key={item}>
            {index > 0 && item - pages[index - 1] > 1 ? <PaginationEllipsis /> : null}
            <PaginationLink
              href="#"
              isActive={item === normalizedPage}
              aria-disabled={disabled}
              className={disabled ? "pointer-events-none opacity-50" : undefined}
              onClick={goTo(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={goTo(normalizedPage + 1)}
            aria-disabled={disabled || normalizedPage === normalizedTotalPages}
            className={
              disabled || normalizedPage === normalizedTotalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
