"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	return (
		<main className="flex h-full flex-col text-wrap items-center justify-center gap-4">
			<h1 className="text-4xl font-bold text-destructive">404</h1>
			<p className="text-lg">The page you are looking for does not exist.</p>
			<div className="flex flex-row gap-2">
				<Button onClick={router.back}>
					<ChevronLeftIcon className="mr-2" />
					Go back
				</Button>
				<Button asChild>
					<Link href="/home">
						<HomeIcon className="mr-2" />
						Home
					</Link>
				</Button>
			</div>
		</main>
	);
}
