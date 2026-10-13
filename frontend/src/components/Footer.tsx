"use client";

import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import MailIcon from "./icons/MailIcon";

interface FooterProps {
	onHelp: () => void;
}

function Kbd({ children }: { children: React.ReactNode }) {
	return (
		<kbd
			style={{ fontFamily: "inherit" }}
			className="mx-0.5 inline-block rounded-[3px] border border-border bg-surface-raised px-1.5 py-px text-sm font-medium text-accent"
		>
			{children}
		</kbd>
	);
}

export default function Footer({ onHelp }: FooterProps) {
	function handleHelpClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		onHelp();
	}

	return (
		<footer className="border-t border-border-soft bg-surface px-7 py-6 text-[15px] text-muted">
			<div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2.5">
				<div>
					press <Kbd>1</Kbd>
					<Kbd>2</Kbd>
					<Kbd>3</Kbd> to navigate ·{" "}
					<button onClick={handleHelpClick} aria-label="open keyboard help">
						<Kbd>?</Kbd>
					</button>{" "}
					for help
				</div>
				<div className="flex gap-5 pr-1.5">
					<a
						href="https://github.com/WesleyTran0"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="github"
						className="text-muted transition-colors hover:text-accent"
					>
						<GithubIcon size={20} />
					</a>
					<a
						href="https://www.linkedin.com/in/wesley-tran/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="linkedin"
						className="text-muted transition-colors hover:text-accent"
					>
						<LinkedinIcon size={20} />
					</a>
					<a
						href="mailto:tran.we@northeastern.edu"
						aria-label="email"
						className="text-muted transition-colors hover:text-accent"
					>
						<MailIcon size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
}
