"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface NavbarProps {
	onContact: () => void;
}

export default function Navbar({ onContact }: NavbarProps) {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const activeSection = useScrollSpy(["about", "work"], "about");

	const aboutActive = isHome && activeSection === "about";
	const projectsActive = pathname.startsWith("/projects") || (isHome && activeSection === "work");

	function handleAboutClick(event: React.MouseEvent<HTMLAnchorElement>) {
		if (!isHome) return;
		const el = document.getElementById("about");
		if (el) {
			event.preventDefault();
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}

	const activeLabelClass = "text-text";
	const inactiveLabelClass = "text-muted hover:text-text transition-colors";
	const activeMarker =
		"relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-accent";

	return (
		<nav className="sticky top-0 z-30 flex items-center justify-between border-b border-border-soft bg-surface px-7 py-5 text-[16px]">
			<Link
				href="/#about"
				onClick={handleAboutClick}
				className="font-medium text-text"
			>
				wesleytran<span className="text-accent">.me</span>
			</Link>
			<ul className="m-0 flex list-none gap-7 p-0">
				<li>
					<Link
						href="/#about"
						onClick={handleAboutClick}
						aria-current={aboutActive ? "page" : undefined}
						className={`flex items-center gap-2 ${aboutActive ? activeMarker : ""}`}
					>
						<span className="font-medium text-accent">[1]</span>
						<span className={aboutActive ? activeLabelClass : inactiveLabelClass}>about</span>
					</Link>
				</li>
				<li>
					<Link
						href="/projects"
						aria-current={projectsActive ? "page" : undefined}
						className={`flex items-center gap-2 ${projectsActive ? activeMarker : ""}`}
					>
						<span className="font-medium text-accent">[2]</span>
						<span className={projectsActive ? activeLabelClass : inactiveLabelClass}>projects</span>
					</Link>
				</li>
				<li>
					<button
						onClick={onContact}
						className="flex items-center gap-2"
						aria-label="open contact"
					>
						<span className="font-medium text-accent">[3]</span>
						<span className={inactiveLabelClass}>contact</span>
					</button>
				</li>
			</ul>
		</nav>
	);
}
