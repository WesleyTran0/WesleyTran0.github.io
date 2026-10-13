import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description?: string;
}

const BLOG_DIRS = [path.join("src", "content", "projects", "homelab")];

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/<[^>]+>/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

const renderer = new Renderer();
renderer.heading = function ({ tokens, depth }) {
	const text = this.parser.parseInline(tokens);
	const raw = tokens.map((t) => ("raw" in t ? t.raw : "")).join("");
	const id = slugify(raw);
	return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};

function titleFromSlug(slug: string): string {
	return slug
		.split("-")
		.map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
		.join(" ");
}

function extractH1(body: string): string | null {
	const match = body.match(/^#\s+(.+?)\s*$/m);
	return match ? match[1].trim() : null;
}

function findBlogFile(slug: string): string | null {
	for (const dir of BLOG_DIRS) {
		const abs = path.join(process.cwd(), dir, `${slug}.md`);
		if (fs.existsSync(abs)) return abs;
	}
	return null;
}

function readBlog(slug: string): { post: BlogPost; body: string } | null {
	const abs = findBlogFile(slug);
	if (!abs) return null;
	const raw = fs.readFileSync(abs, "utf8");
	const { data, content } = matter(raw);
	const title = extractH1(content) ?? (data.title ? String(data.title) : titleFromSlug(slug));
	const post: BlogPost = {
		slug,
		title,
		date: String(data.date ?? ""),
		description: data.description ? String(data.description) : undefined
	};
	return { post, body: content };
}

export function getAllBlogSlugs(): string[] {
	const slugs: string[] = [];
	for (const dir of BLOG_DIRS) {
		const abs = path.join(process.cwd(), dir);
		if (!fs.existsSync(abs)) continue;
		for (const file of fs.readdirSync(abs)) {
			if (file.endsWith(".md") && file !== "homelab.md") {
				slugs.push(file.replace(/\.md$/, ""));
			}
		}
	}
	return slugs;
}

export function getBlogBySlug(slug: string): { post: BlogPost; html: string } | null {
	const r = readBlog(slug);
	if (!r) return null;
	const html = marked.parse(r.body, { async: false, renderer }) as string;
	return { post: r.post, html };
}
