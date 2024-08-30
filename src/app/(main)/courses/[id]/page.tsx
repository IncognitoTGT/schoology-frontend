import { ClientDate } from "@/components/date";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSchoology } from "@/lib/schoology";
import { DashboardIcon, FileIcon, LockClosedIcon } from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";

export default async function Page({ params }: { params: { id: string } }) {
	const schoology = getSchoology();
	const section = await schoology(`/sections/${params.id}`);
	const { assignment: assignments }: { assignment: any[] } = await schoology(`/sections/${params.id}/assignments`);
	const assignmentTypesMap: Record<
		string,
		React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
	> = {
		basic: FileIcon,
		lti_submission: DashboardIcon,
	};
	return (
		<main className="flex h-full flex-col text-wrap p-10 gap-2 mb-2">
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{section.course_title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{assignments.length > 0 ? (
				assignments.map((assignment) => {
					const Icon = assignmentTypesMap[assignment.assignment_type] || FileIcon;
					return (
						<Card key={assignment.id} className="h-auto w-full">
							<CardHeader>
								<CardTitle className="flex justify-between">
									<span className="flex flex-row gap-2">
										<Icon />
										{assignment.title}
									</span>
									{assignment.dropbox_locked ? (
										<Badge variant="destructive">
											<LockClosedIcon className="mr-2" />
											Locked
										</Badge>
									) : null}
								</CardTitle>
								<CardDescription>
									<ClientDate>
										{assignment.due ? new Date(assignment.due).toLocaleString() : "no specified due date"}
									</ClientDate>
								</CardDescription>
							</CardHeader>
							{assignment.description ? <CardContent className="truncate">{assignment.description}</CardContent> : null}
						</Card>
					);
				})
			) : (
				<div>No assignments found</div>
			)}
		</main>
	);
}
