import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Project {
	slug: string;
	title: string;
	shortDescription: string;
	frontPageDescription?: string;
	tags: string[];
	thumbnail?: string;
	href?: string;
	date: string;
	order?: number;
}

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

function readProject(filename: string): { project: Project; body: string } {
	const slug = filename.replace(/\.md$/, "");
	const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
	const { data, content } = matter(raw);
	const project: Project = {
		slug,
		title: String(data.title ?? slug),
		shortDescription: String(data.shortDescription ?? ""),
		frontPageDescription: data.frontPageDescription ? String(data.frontPageDescription) : undefined,
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
		href: data.href ? String(data.href) : undefined,
		date: String(data.date ?? ""),
		order: typeof data.order === "number" ? data.order : undefined
	};
	return { project, body: content };
}

function listFiles(): string[] {
	if (!fs.existsSync(PROJECTS_DIR)) return [];
	return fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllProjects(): Project[] {
	return listFiles()
		.map((f) => readProject(f).project)
		.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getFeaturedProjects(): Project[] {
	return listFiles()
		.map((f) => readProject(f).project)
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
	const filename = `${slug}.md`;
	if (!fs.existsSync(path.join(PROJECTS_DIR, filename))) return null;
	const { project, body } = readProject(filename);
	const html = marked.parse(body, { async: false }) as string;
	return { project, html };
}

export function getAllProjectSlugs(): string[] {
	return listFiles().map((f) => f.replace(/\.md$/, ""));
}
