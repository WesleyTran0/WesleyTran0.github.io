"use client";

import { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ContactModal from "./about/ContactModal";
import Footer from "./Footer";
import HelpModal from "./about/HelpModal";
import Navbar from "./Navbar";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";

export default function PageShell({ children }: { children: React.ReactNode }) {
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

	return (
		<div className="flex min-h-screen flex-col">
			<ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
			<HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
			<Navbar onContact={() => setContactOpen(true)} />
			<main className="flex-1">{children}</main>
			<Footer onHelp={() => setHelpOpen(true)} />
		</div>
	);
}
