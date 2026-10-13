import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * Renders a project's preview media. Animated projects (those with a `video`)
 * play a muted, looping, inline video so they animate on every page while
 * staying light on mobile; otherwise falls back to the static thumbnail image.
 *
 * `fill` mirrors next/image's fill mode: the media absolutely fills a
 * `relative` parent. Without it, the media flows at its natural aspect ratio.
 */
export default function ProjectThumbnail({
	project,
	fill = false,
	className = ""
}: {
	project: Project;
	fill?: boolean;
	className?: string;
}) {
	if (project.video) {
		const base = fill ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full";
		return (
			<video
				src={project.video}
				poster={project.poster}
				autoPlay
				loop
				muted
				playsInline
				aria-label={project.title}
				className={`${base} ${className}`.trim()}
			/>
		);
	}

	if (!project.thumbnail) {
		return (
			<div className="flex h-full w-full items-center justify-center font-mono text-sm text-muted-dim">
				no preview
			</div>
		);
	}

	if (fill) {
		return <Image src={project.thumbnail} alt={project.title} fill className={className} />;
	}

	return (
		<Image
			src={project.thumbnail}
			alt={project.title}
			width={1600}
			height={900}
			className={`h-auto w-full ${className}`.trim()}
		/>
	);
}
