import Hero from "@/components/about/Hero";
import Timeline from "@/components/about/Timeline";
import SelectedWork from "@/components/about/SelectedWork";
import PageShell from "@/components/PageShell";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
	const featured = getFeaturedProjects();
	return (
		<PageShell>
			<main className="mx-auto max-w-3xl px-7">
				<Hero />
				<Timeline />
				<SelectedWork projects={featured} />
			</main>
		</PageShell>
	);
}
