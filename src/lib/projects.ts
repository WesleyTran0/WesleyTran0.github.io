import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { StaticImageData } from "next/image";

export interface Project {
	slug: string;
	title: string;
	shortDescription: string;
	frontPageDescription?: string;
	tags: string[];
	thumbnail?: StaticImageData;
	href?: string;
	date: string;
	order?: number;
}

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

function loadThumbnail(slug: string): StaticImageData | undefined {
	const dir = path.join(PROJECTS_DIR, slug);
	let mod: { default?: StaticImageData } | StaticImageData | undefined;
	if (fs.existsSync(path.join(dir, `${slug}.png`))) {
		mod = require(`@/content/projects/${slug}/${slug}.png`);
	} else if (fs.existsSync(path.join(dir, `${slug}.gif`))) {
		mod = require(`@/content/projects/${slug}/${slug}.gif`);
	} else if (fs.existsSync(path.join(dir, `${slug}.jpg`))) {
		mod = require(`@/content/projects/${slug}/${slug}.jpg`);
	} else if (fs.existsSync(path.join(dir, `${slug}.jpeg`))) {
		mod = require(`@/content/projects/${slug}/${slug}.jpeg`);
	} else if (fs.existsSync(path.join(dir, `${slug}.webp`))) {
		mod = require(`@/content/projects/${slug}/${slug}.webp`);
	} else {
		return undefined;
	}
	return ((mod as { default?: StaticImageData }).default ?? mod) as StaticImageData;
}

function readProject(slug: string): { project: Project; body: string } {
	const raw = fs.readFileSync(path.join(PROJECTS_DIR, slug, `${slug}.md`), "utf8");
	const { data, content } = matter(raw);
	const project: Project = {
		slug,
		title: String(data.title ?? slug),
		shortDescription: String(data.shortDescription ?? ""),
		frontPageDescription: data.frontPageDescription ? String(data.frontPageDescription) : undefined,
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		thumbnail: loadThumbnail(slug),
		href: data.href ? String(data.href) : undefined,
		date: String(data.date ?? ""),
		order: typeof data.order === "number" ? data.order : undefined
	};
	return { project, body: content };
}

function listSlugs(): string[] {
	if (!fs.existsSync(PROJECTS_DIR)) return [];
	return fs
		.readdirSync(PROJECTS_DIR, { withFileTypes: true })
		.filter(
			(d) => d.isDirectory() && fs.existsSync(path.join(PROJECTS_DIR, d.name, `${d.name}.md`))
		)
		.map((d) => d.name);
}

export function getAllProjects(): Project[] {
	return listSlugs()
		.map((s) => readProject(s).project)
		.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getFeaturedProjects(): Project[] {
	return listSlugs()
		.map((s) => readProject(s).project)
		.filter((p) => p.frontPageDescription && p.frontPageDescription.length > 0)
		.sort((a, b) => {
			const ao = a.order ?? Number.MAX_SAFE_INTEGER;
			const bo = b.order ?? Number.MAX_SAFE_INTEGER;
			if (ao !== bo) return ao - bo;
			return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
		})
		.slice(0, 4);
}

export function getProjectBySlug(slug: string): { project: Project; html: string } | null {
	if (!fs.existsSync(path.join(PROJECTS_DIR, slug, `${slug}.md`))) return null;
	const { project, body } = readProject(slug);
	const html = marked.parse(body, { async: false }) as string;
	return { project, html };
}

export function getAllProjectSlugs(): string[] {
	return listSlugs();
}
