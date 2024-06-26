import { Button } from "@/components/ui/button";
import { getSchoology } from "@/lib/schoology";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
	getSchoology();
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="flex h-[32rem] w-96 flex-col items-center justify-center gap-4">
				<div className="mb-4 flex items-center justify-center text-left text-2xl font-bold">
					<RocketIcon className="size-5" />
					<span className="ml-2 text-2xl font-bold">Schoology</span>
				</div>
				<p className="text-center text-6xl font-bold text-primary">404</p>
				<div className="flex flex-col items-center justify-center">
					<p className="text-center">The page you are looking for does not exist.</p>
					<Button className="text-center" variant="link" asChild>
						<Link href="/">Go home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
