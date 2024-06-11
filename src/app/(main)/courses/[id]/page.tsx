import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchoology } from "@/lib/schoology";
import { LockClosedIcon } from "@radix-ui/react-icons";

export default async function Page({ params }: { params: { id: string } }) {
	const schoology = getSchoology();
	const { assignment: assignments }: { assignment: any[] } = await schoology(`/sections/${params.id}/assignments`);
	return (
		<main className="flex h-full flex-col text-wrap p-10 gap-2 mb-2">
			{/* <pre>{JSON.stringify(assignments, null, 2)}</pre> */}
			{assignments.map((assignment) => (
				<Card key={assignment.id} className="h-32 w-full">
					<CardHeader>
						<CardTitle className="flex justify-between">
							{assignment.title}{" "}
							{assignment.dropbox_locked ? (
								<Badge variant="destructive">
									<LockClosedIcon className="mr-2" />
									Locked
								</Badge>
							) : null}
						</CardTitle>
						<CardDescription>
							{assignment.due ? new Date(assignment.due).toLocaleString() : "no specified due date"}
						</CardDescription>
					</CardHeader>
					{assignment.description ? <CardContent className="truncate">{assignment.description}</CardContent> : null}
				</Card>
			))}
		</main>
	);
}
