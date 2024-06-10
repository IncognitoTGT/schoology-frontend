import Navigation from "@/components/navbar";
import { getSchoology } from "@/lib/schoology";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
	const schoology = getSchoology();
	const user = await schoology(`/users/${cookies().get("userId")?.value}`);
	const school = await schoology(`/schools/${user.building_id || user.school_id}`);
	const messages = await schoology("/messages/inbox");
	const messageSenders = (
		await schoology("/multiget", {
			method: "POST",
			contentType: "text/xml",
			body: `<?xml version="1.0" encoding="utf-8" ?><requests>${messages.message.map(
				(message: any) => `<request>/v1/users/${message.author_id}</request>`,
			)}</requests>`,
		})
	).response.map((response: any) => response.body);
	return (
		<>
			<Navigation school={school} user={user} messages={messages} messageSenders={messageSenders} />
			<div className="h-full lg:ml-72 ml-56 overflow-y-clip">{children}</div>
		</>
	);
}
