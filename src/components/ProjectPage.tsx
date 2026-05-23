"use client";

import { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProjectListCard from "@/components/projects/ProjectListCard";
import ContactModal from "./about/ContactModal";
import Footer from "./Footer";
import HelpModal from "./about/HelpModal";
import Navbar from "./Navbar";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { getAllProjects } from "@/lib/projects";

export default function ProjectPage() {
	const [contactOpen, setContactOpen] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const goHome = useCallback(() => {
		if (pathname === "/") {
			const el = document.getElementById("about");
			if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
		} else {
			router.push("/");
		}
	}, [pathname, router]);

	const goProjects = useCallback(() => {
		if (pathname === "/projects") return;
		router.push("/projects");
	}, [pathname, router]);

	useKeyboardNav({
		onAbout: goHome,
		onWork: goProjects,
		onContact: () => setContactOpen(true),
		onHelp: () => setHelpOpen(true)
	});

	const projects = getAllProjects();

	return (
		<>
			<ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
			<HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
			<Navbar onContact={() => setContactOpen(true)} />
			<main className="mx-auto max-w-4xl px-7 pt-10 pb-16">
				<div className="mb-8 flex items-baseline justify-between">
					<div className="flex items-baseline gap-3">
						<span className="block h-px w-5.75 -translate-y-1.25 bg-accent" aria-hidden="true" />
						<h1 className="m-0 text-[28px] font-medium tracking-[-0.01em] text-text">projects</h1>
					</div>
					<span className="font-mono text-sm text-muted-dim">
						{projects.length} {projects.length === 1 ? "entry" : "entries"}
					</span>
				</div>
				<div className="flex flex-col border-t border-border-soft">
					{projects.map((project) => (
						<ProjectListCard key={project.slug} project={project} />
					))}
				</div>
			</main>
			<Footer onHelp={() => setHelpOpen(true)} />
		</>
	);
}
