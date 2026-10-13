import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getAllBlogSlugs, getBlogBySlug } from "@/lib/blogs";

export function generateStaticParams() {
	return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const result = getBlogBySlug(slug);
	if (!result) return { title: "post not found" };
	return {
		title: `${result.post.title} · wesleytran.me`,
		description: result.post.description
	};
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const result = getBlogBySlug(slug);
	if (!result) notFound();
	const { post, html } = result;

	return (
		<PageShell>
			<main className="mx-auto max-w-3xl px-7 pt-10 pb-16">
				<div className="mb-6 flex items-baseline justify-between">
					<Link
						href="/blogs"
						className="font-mono text-sm text-muted transition-colors hover:text-accent"
					>
						← all blogs
					</Link>
					{post.date && (
						<span className="font-mono text-sm text-muted-dim">{post.date}</span>
					)}
				</div>

				<article
					className="prose-blog text-lg leading-[1.7] text-text-soft"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</main>
		</PageShell>
	);
}
