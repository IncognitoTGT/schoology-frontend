import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchoology } from "@/lib/schoology";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
	const schoology = getSchoology();
	const { update: updates }: { update: any[] } = await schoology(`/groups/${params.id}/updates`);
	const updateSenders: any[] = (
		await schoology("/multiget", {
			method: "POST",
			contentType: "text/xml",
			body: `<?xml version="1.0" encoding="utf-8" ?><requests>${updates.map(
				(update: any) => `<request>/v1/users/${update.uid}</request>`,
			)}</requests>`,
		})
	).response.map((response: any) => response.body);

	return (
		<main className="flex h-full flex-col text-wrap p-10 gap-2 mb-2">
			{updates.map((update) => (
				<Card key={update.id} className="h-auto w-full flex flex-col justify-start">
					<CardHeader>
						<CardTitle className="truncate flex gap-2 items-center font-semibold">
							<Image
								src={
									updateSenders.find((val) => val?.id === update?.uid)?.picture_url ||
									"https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/images/user-default.svg"
								}
								alt="profile"
								width={170}
								height={170}
								className="rounded-full aspect-square bg-cover bg-center object-cover size-4 inline"
							/>
							{updateSenders.find((val) => val?.id === update.uid)?.name_display || update.uid}
						</CardTitle>
						<CardDescription>{new Date(update.created * 1000).toLocaleString()}</CardDescription>
					</CardHeader>
					<CardContent>{update.body}</CardContent>
				</Card>
			))}
		</main>
	);
}
