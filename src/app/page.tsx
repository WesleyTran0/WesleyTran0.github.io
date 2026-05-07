'use client';

import { useCallback, useState } from 'react';
import ContactModal from '@/components/about/ContactModal';
import Footer from '@/components/Footer';
import HelpModal from '@/components/about/HelpModal';
import Hero from '@/components/about/Hero';
import Navbar from '@/components/Navbar';
import SelectedWork from '@/components/about/SelectedWork';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';

export default function Home() {
	const [contactOpen, setContactOpen] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);

	const scrollTo = useCallback((id: string) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, []);

	useKeyboardNav({
		onAbout: () => scrollTo('about'),
		onWork: () => scrollTo('work'),
		onContact: () => setContactOpen(true),
		onHelp: () => setHelpOpen(true)
	});

	return (
		<>
			<Navbar onContact={() => setContactOpen(true)} />
			<main className="mx-auto max-w-3xl px-7">
				<Hero />
				<SelectedWork />
			</main>
			<Footer onHelp={() => setHelpOpen(true)} />
			<ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
			<HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
		</>
	);
}
