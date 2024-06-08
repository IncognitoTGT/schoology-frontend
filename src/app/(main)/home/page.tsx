import { getSchoology } from "@/lib/schoology";

export default async function Index() {
	const schoology = getSchoology();
	const { school } = await schoology("/schools");
	const { message } = await schoology("/messages/inbox");
	return (
		<main className="flex h-full justify-center items-center flex-col text-wrap">
			<p>Your district/school is {school[0].title}</p>
			<br />
			<p>The subject of the most recent message in your inbox is {message[0].subject}</p>
		</main>
	);
}
