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
  if (totalPages <= 1) return null

  const pages = getVisiblePages(page, totalPages)
  const goTo = (nextPage: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (!disabled && nextPage !== page && nextPage >= 1 && nextPage <= totalPages) {
      onPageChange(nextPage)
    }
  }

  return (
    <Pagination className="justify-end" aria-label="Phân trang danh mục">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={goTo(page - 1)}
            aria-disabled={disabled || page === 1}
            className={disabled || page === 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        {pages.map((item, index) => (
          <PaginationItem key={item}>
            {index > 0 && item - pages[index - 1] > 1 ? <PaginationEllipsis /> : null}
            <PaginationLink href="#" isActive={item === page} onClick={goTo(item)}>
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={goTo(page + 1)}
            aria-disabled={disabled || page === totalPages}
            className={
              disabled || page === totalPages ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
