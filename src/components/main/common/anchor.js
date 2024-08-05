export default function Anchor({ className, href, children }) {
	return (
		<a
			href={href}
			className={`w-max py-1 space-x-2 text-secondary-foreground ${className}`}
			target="_blank"
			rel="noreferrer noopener"
		>
			{children}
		</a>
	)
}