/** @type {import('./$types').PageLoad} */
export function load({ params }: { params: any }) {
	return {
		post: {
			title: `Title for ${params.name} goes here`,
			content: `Content for ${params.name} goes here`
		}
	};
}
