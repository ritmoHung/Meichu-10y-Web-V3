// Markdown
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";



export function MarkdownParagraph({ className, content, tag = "" }) {
	const MarkdownContent = (
		<Markdown
			remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
			components={{ p: ({ node, ...props }) =>
				<p className={`whitespace-pre-wrap break-all [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-[0.3em] [&_a]:decoration-[0.1em] ${className}`}>
					{props.children}
				</p>
			}}
		>
			{content}
		</Markdown>
	);

	if (tag) {
		const WrapperElement = tag;
		return <WrapperElement>{MarkdownContent}</WrapperElement>;
	}

	return MarkdownContent;
}