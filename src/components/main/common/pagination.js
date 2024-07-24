import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";



export function NeuPagination({ className, totalItems, itemsPerPage, currentPage, setCurrentPage }) {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	function isFirstPage() {
		return currentPage < 2;
	}

	function isLastPage() {
		return currentPage >= totalPages;
	}

	function handleFirstPage() {
		handlePageChange(1);
	}
	function handleLastPage() {
		handlePageChange(totalPages);
	}
	function handlePreviousPage() {
		handlePageChange(currentPage - 1);
	}
	function handleNextPage() {
		handlePageChange(currentPage + 1);
	}
	function handlePageChange(page) {
		setCurrentPage(Math.min(Math.max(page, 1), totalPages));
		document.documentElement.scrollTo({ top: 0 });
	}

	return (
		<Pagination className={`${className}`}>
			<PaginationContent>
				{/* First & Previous */}
				<PaginationItem>
					<PaginationFirst onClick={handleFirstPage} disabled={isFirstPage()} />
				</PaginationItem>
				<PaginationItem>
					<PaginationPrevious onClick={handlePreviousPage} disabled={isFirstPage()} />
				</PaginationItem>

				{/* Page numbers */}
				{currentPage - 1 > 1 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				{!isFirstPage() && (
					<PaginationItem onClick={() => handlePageChange(currentPage - 1)}>
						<PaginationLink href="#">{currentPage - 1}</PaginationLink>
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationLink className="text-accent font-bold hover:bg-transparent pointer-events-none" isActive>
						{currentPage}
					</PaginationLink>
				</PaginationItem>
				{!isLastPage() && (
					<PaginationItem onClick={() => handlePageChange(currentPage + 1)}>
						<PaginationLink href="#">{currentPage + 1}</PaginationLink>
					</PaginationItem>
				)}
				{currentPage + 1 < totalPages && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Next & Last */}
				<PaginationItem>
					<PaginationNext onClick={handleNextPage} disabled={isLastPage()} />
				</PaginationItem>
				<PaginationItem>
					<PaginationLast onClick={handleLastPage} disabled={isLastPage()} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}