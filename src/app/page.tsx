import Hero from "@/components/about/Hero";
import SelectedWork from "@/components/about/SelectedWork";
import ProjectPage from "@/components/ProjectPage";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
	const featured = getFeaturedProjects();
	return (
		<ProjectPage>
			<main className="mx-auto max-w-3xl px-7">
				<Hero />
				<SelectedWork projects={featured} />
			</main>
		</ProjectPage>
	);
}
