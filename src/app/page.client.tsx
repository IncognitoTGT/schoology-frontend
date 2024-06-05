"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import useLocalStorage from "use-local-storage";

export default function DistrictDialog({ children }: { children: React.ReactNode }) {
	const [subdomain, setSubdomain] = useLocalStorage("subdomain", "app");
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Get Credentials</AlertDialogTitle>
					<AlertDialogDescription>
						Get Schoology API credentials from your Schoology account.
						<div className="flex m-auto sm:m-0">
							<Input
								placeholder={subdomain}
								onChange={({ target }) => setSubdomain(target.value)}
								className="text-center w-20 font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
							<p className="text-sm opacity-80 my-auto pl-2">.schoology.com</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
					<AlertDialogAction onClick={() => open(`https://${subdomain}.schoology.com/api`)}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
