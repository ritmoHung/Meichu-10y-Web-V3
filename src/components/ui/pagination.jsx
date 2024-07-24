import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button";

const Pagination = ({
	className,
	...props
}) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn("mx-auto p-2 flex w-max justify-center", className)}
		{...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn("flex flex-row items-center gap-1", className)}
		{...props} />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({
	className,
	isActive,
	size = "icon",
	...props
}) => (
	<a
		aria-current={isActive ? "page" : undefined}
		className={cn(buttonVariants({
			variant: "ghost",
			size,
		}), isActive ? "neu-pressed-sm" : "", className)}
		{...props} />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
	className,
	...props
}) => (
	<Button
		aria-label="Go to previous page"
		variant="ghost"
		size="icon"
		className={cn("gap-1", className)}
		{...props}>
		<ChevronLeft className="size-4" />
		{/* <span>Previous</span> */}
	</Button>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
	className,
	...props
}) => (
	<Button
		aria-label="Go to next page"
		variant="ghost"
		size="icon"
		className={cn("gap-1", className)}
		{...props}>
		{/* <span>Next</span> */}
		<ChevronRight className="size-4" />
	</Button>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
	className,
	...props
}) => (
	<Button
		aria-label="Go to first page"
		variant="ghost"
		size="icon"
		className={cn("gap-1", className)}
		{...props}>
		<ChevronsLeft className="size-4" />
	</Button>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({
	className,
	...props
}) => (
	<Button
		aria-label="Go to last page"
		variant="ghost"
		size="icon"
		className={cn("gap-1", className)}
		{...props}>
		<ChevronsRight className="size-4" />
	</Button>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
	className,
	...props
}) => (
	<span
		aria-hidden
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationFirst,
	PaginationLast,
}
