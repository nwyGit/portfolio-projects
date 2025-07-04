import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import BlogDetail from "@/components/v2/sections/blog/BlogDetail";
import { SEO } from "@/components/v2/shared/component/SEO";
import {
	getBlogPostingSchema,
	getBreadcrumbListSchema,
} from "@/utils/schemaBlogPosting";
import { validateMetaTags } from "@/utils/metaTagValidation";
import Layout from "@/components/v2/Layout";
import { BlogPost } from "@/components/v2/shared/type/types";

interface BlogPostProps {
	post: BlogPost;
}

const mockPosts: BlogPost[] = [
	{
		title: "Blog Post 1",
		metaTitle: "Blog Post 1 | Raymond Ng",
		metaDescription: "This is a meta description for Blog Post 1.",
		slug: "blog-post-1",
		summary: "This is a summary for Blog Post 1.",
		content:
			"This is a sample blog post content. It will be replaced with actual content from Sanity later.",
		author: { name: "Raymond Ng" },
		tags: ["Web Development", "React"],
		featuredImage: {
			url: "https://raymond-ng.com/images/blog-post-1.jpg",
			alt: "Blog Post 1 image",
		},
		publishedAt: "2024-03-01T10:00:00Z",
		updatedAt: "2024-03-02T12:00:00Z",
		status: "published",
		canonicalUrl: "https://raymond-ng.com/blogs/blog-post-1",
		keywords: ["web", "react"],
	},
	{
		title: "Blog Post 2",
		metaTitle: "Blog Post 2 | Raymond Ng",
		metaDescription: "This is a meta description for Blog Post 2.",
		slug: "blog-post-2",
		summary: "This is a summary for Blog Post 2.",
		content:
			"Another sample blog post content. This will also be replaced with actual content from Sanity later.",
		author: { name: "Raymond Ng" },
		tags: ["TypeScript", "Next.js"],
		featuredImage: {
			url: "https://raymond-ng.com/images/blog-post-2.jpg",
			alt: "Blog Post 2 image",
		},
		publishedAt: "2024-03-02T10:00:00Z",
		updatedAt: "2024-03-03T12:00:00Z",
		status: "published",
		canonicalUrl: "https://raymond-ng.com/blogs/blog-post-2",
		keywords: ["typescript", "nextjs"],
	},
];

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: mockPosts.map((post) => ({ params: { post: post.slug } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { post } = context.params as { post: string };
	const found = mockPosts.find((p) => p.slug === post);
	return {
		props: {
			post: found || { title: "", content: "", date: "", tags: [] },
		},
	};
};

const BlogPostPage: NextPage<BlogPostProps> = ({ post }) => {
	const url = post.canonicalUrl || `https://raymond-ng.com/blogs/${post.slug}`;
	const image =
		post.featuredImage?.url || "https://raymond-ng.com/default-blog-image.jpg";
	const schemaMarkup = getBlogPostingSchema({
		title: post.metaTitle || post.title,
		description:
			post.metaDescription || post.summary || post.content.slice(0, 150),
		url,
		image,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		authorName: post.author?.name || "Raymond Ng",
	});

	const breadcrumbItems = [
		{ name: "Home", href: "/" },
		{ name: "Blogs", href: "/blogs" },
		// If category exists, add it
		...(post.category?.name
			? [
					{
						name: post.category.name,
						href: `/blogs/categories/${post.category.name}`,
					},
				]
			: []),
		{ name: post.title },
	];

	const breadcrumbSchema = getBreadcrumbListSchema(
		breadcrumbItems.map(({ name, href }) => ({
			name,
			url: href ? `https://raymond-ng.com${href}` : url,
		}))
	);

	const metaErrors = validateMetaTags({
		title: post.metaTitle || post.title,
		description:
			post.metaDescription || post.summary || post.content.slice(0, 150),
		canonical: url,
		image,
	});
	if (metaErrors.length > 0) {
		console.warn("SEO Meta Tag Issues:", metaErrors);
	}

	return (
		<Layout>
			<SEO
				title={post.metaTitle || post.title}
				description={
					post.metaDescription || post.summary || post.content.slice(0, 150)
				}
				canonical={url}
				image={image}
				type="article"
				datePublished={post.publishedAt}
				dateModified={post.updatedAt}
				schemaMarkup={schemaMarkup}
				extraStructuredData={[breadcrumbSchema]}
				// twitterCardType="summary_large_image"
				// twitterSite="@raymondngdev"
				// twitterCreator="@raymondngdev"
			/>
			<main>
				<BlogDetail post={post} items={breadcrumbItems} />
			</main>
		</Layout>
	);
};

export default BlogPostPage;
