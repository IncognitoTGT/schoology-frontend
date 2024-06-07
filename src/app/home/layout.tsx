import Navigation from "@/components/navbar";
import { getSchoology } from "@/lib/schoology";

export default async function Layout({ children }: { children: React.ReactNode }) {
	const schoology = getSchoology();
	const user = await schoology("/users/me");
	const school = await schoology(`/schools/${user.building_id || user.school_id}`);
  const messages = await schoology("/messages/inbox");
	return (
		<>
			<Navigation school={school} user={user} messages={messages} />
			<div className="h-full lg:ml-72 ml-56">{children}</div>
		</>
	);
}
