export const blogTag = {
	name: "tag",
	title: "Tag",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
			},
			validation: (Rule: any) => Rule.required(),
		},
	],
};

export default blogTag;
