import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const products = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		price: z.string(),
		features: z.array(z.string()),
		image: z.string(),
		order: z.number(),
	}),
});

export const collections = { blog, products };