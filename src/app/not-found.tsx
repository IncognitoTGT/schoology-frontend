import { Button } from "@/components/ui/button";
import { getSchoology } from "@/lib/schoology";
import Link from "next/link";

export default function NotFound() {
	getSchoology();
	return (
		<main className="flex h-full justify-center items-center flex-col text-wrap">
			<h1 className="text-destructive text-6xl font-bold">404</h1>
			<p>The page you are looking for does not exist.</p>
			<Button variant="link" asChild>
				<Link href="/">Go back home</Link>
			</Button>
		</main>
	);
}
