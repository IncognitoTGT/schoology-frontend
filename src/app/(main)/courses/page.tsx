import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchoology } from "@/lib/schoology";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Page() {
	const schoology = getSchoology();
	const { section } = await schoology(`/users/${cookies().get("userId")?.value}/sections`);
	return (
		<main className="flex h-full flex-col text-wrap">
			<section className="flex items-center justify-start mt-4 ml-12 pt-4 pb-1">
				<h1 className="text-4xl font-bold">Courses</h1>
			</section>
			<section className=" grid-rows-subgrid gap-4 3xl:grid-cols-6 4xl:grid-cols-7 grid place-content-center place-items-center p-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{section.map((section: any) => (
					<Card key={section.id} className="h-64 w-72 flex flex-col justify-center">
						<CardHeader>
							<CardTitle className="truncate">{section.course_title}</CardTitle>
							<CardDescription>{section.section_title}</CardDescription>
							<CardDescription>{section.description}</CardDescription>
						</CardHeader>
						<CardContent className=" flex flex-col items-center justify-start">
							<Image
								src={section.profile_url}
								alt="profile"
								width={750}
								height={375}
								className="rounded-sm w-56 h-28 bg-cover bg-center aspect-video object-cover"
							/>
						</CardContent>
					</Card>
				))}
			</section>
		</main>
	);
}
