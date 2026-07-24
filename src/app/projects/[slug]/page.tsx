import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ProjectThumbnail from "@/components/projects/ProjectThumbnail";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { tagClass } from "@/lib/tagColors";

export function generateStaticParams() {
	return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const result = getProjectBySlug(slug);
	if (!result) return { title: "project not found" };
	return {
		title: `${result.project.title} · wesleytran.me`,
		description: result.project.shortDescription
	};
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const result = getProjectBySlug(slug);
	if (!result) notFound();
	const { project, html } = result;

	return (
		<PageShell>
			<main className="mx-auto max-w-3xl px-7 pt-10 pb-16">
				<div className="mb-6">
					<Link
						href="/projects"
						className="font-mono text-sm text-muted transition-colors hover:text-accent"
					>
						← all projects
					</Link>
				</div>

				<header className="mb-8">
					<div className="mb-3 flex items-baseline justify-between">
						<h1 className="m-0 text-[32px] font-medium tracking-[-0.01em] text-text">
							{project.title}
						</h1>
						<span className="font-mono text-sm text-muted-dim">{project.date}</span>
					</div>
					<p className="m-0 text-lg leading-[1.55] text-text-soft">{project.shortDescription}</p>
					<div className="mt-4 flex items-center gap-4">
						<div className="flex flex-wrap gap-3 font-mono text-[13px] tracking-[0.04em]">
							{project.tags.map((tag) => (
								<span key={tag} className={tagClass(tag)}>
									{tag}
								</span>
							))}
						</div>
						<div className="ml-auto flex items-center gap-4">
							{project.repo && (
								<a
									href={project.repo}
									target="_blank"
									rel="noopener noreferrer"
									className="font-mono text-sm text-accent hover:underline"
								>
									see it on github ↗
								</a>
							)}
							{project.href && (
								<a
									href={project.href}
									target="_blank"
									rel="noopener noreferrer"
									className="font-mono text-sm text-accent hover:underline"
								>
									view live ↗
								</a>
							)}
						</div>
					</div>
				</header>

				{(project.video || project.thumbnail) && (
					<div className="mb-10 overflow-hidden border border-border-soft">
						<ProjectThumbnail project={project} />
					</div>
				)}

				<article
					className="prose-project text-lg leading-[1.7] text-text-soft"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</main>
		</PageShell>
	);
}
