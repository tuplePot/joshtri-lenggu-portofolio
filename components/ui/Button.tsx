import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const baseStyles =
	"inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variants: Record<Variant, string> = {
	primary:
		"bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30",
	secondary:
		"bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm",
	outline:
		"border border-white/20 hover:border-white/40 text-white/80 hover:text-white hover:bg-white/5",
	ghost: "hover:bg-white/10 text-white/80 hover:text-white",
};

const sizes: Record<Size, string> = {
	sm: "px-4 py-2 text-xs",
	md: "px-6 py-2.5 text-sm",
	lg: "px-8 py-3 text-base",
};

interface CommonProps {
	variant?: Variant;
	size?: Size;
	className?: string;
	children: ReactNode;
}

type ButtonProps = CommonProps & {
	href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = CommonProps & {
	href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button(props: ButtonProps | AnchorProps) {
	const {
		variant = "primary",
		size = "md",
		className = "",
		children,
		...rest
	} = props;
	const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

	if ("href" in props && props.href !== undefined) {
		const { href, ...anchorRest } =
			rest as AnchorHTMLAttributes<HTMLAnchorElement>;
		return (
			<a href={href} className={classes} {...anchorRest}>
				{children}
			</a>
		);
	}

	return (
		<button
			className={classes}
			{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	);
}
