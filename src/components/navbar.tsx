import { signOut } from "@/actions/accounts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "@/components/ui/nav-link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	EnvelopeClosedIcon,
	EnvelopeOpenIcon,
	ExitIcon,
	GitHubLogoIcon,
	HomeIcon,
	Pencil2Icon,
	PersonIcon,
	RocketIcon,
} from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
export default function Navigation({
	school,
	user,
	messages,
	messageSenders,
	// biome-ignore lint: typescritp
}: { school: any; user: any; messages: any; messageSenders: any[] }) {
	const navItems: {
		Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
		label: string;
		href: string;
	}[] = [
		{
			Icon: HomeIcon,
			label: "Home",
			href: "/home",
		},
		{
			Icon: Pencil2Icon,
			label: "Courses",
			href: "/courses",
		},
		{
			Icon: PersonIcon,
			label: "Groups",
			href: "/groups",
		},
	];
	return (
		<div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed">
			<div className="border-r bg-muted/40 block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-4 gap-2">
						<Link href="/home" className="flex items-center gap-2 font-semibold">
							<RocketIcon className="size-7" />
							<span className="text-balance">{school.title}</span>
						</Link>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
									{messages.unread_count === "0" ? (
										<EnvelopeClosedIcon className="size-4" />
									) : (
										<EnvelopeOpenIcon className="size-4" />
									)}
									<span className="sr-only">Messages</span>
								</Button>
							</SheetTrigger>
							<SheetContent className="w-[300px] overflow-scroll flex gap-2 flex-col" side="left">
								<SheetHeader>
									<SheetTitle>Messages</SheetTitle>
								</SheetHeader>
								{/* biome-ignore lint:  */}
								{messages.message.map((message: any, index: number) => (
									<Card key={message.id} className="w-full h-24">
										<CardHeader>
											<CardTitle>{messageSenders[index].name_display}</CardTitle>
											<CardDescription className="truncate overflow-x-scroll">{message.subject}</CardDescription>
										</CardHeader>
										<CardFooter></CardFooter>
									</Card>
								))}
							</SheetContent>
						</Sheet>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							{navItems.map((item) => (
								<NavLink key={item.href} href={item.href}>
									<item.Icon className="h-5 w-5" />
									{item.label}
								</NavLink>
							))}
						</nav>
					</div>
					<div className="mt-auto p-4">
						<Popover>
							<PopoverTrigger asChild>
								<Card className="flex items-center justify-center flex-row hover:bg-background/10 duration-150 cursor-pointer">
									<CardContent className="p-2 pt-0 md:p-4">
										<Avatar>
											<AvatarImage src={`/_next/image?url=${encodeURIComponent(user.picture_url)}&w=64&q=64`} />
											<AvatarFallback>
												{user.name_display.split(" ")[0].charAt(0) + user.name_display.split(" ")[1].charAt(0)}
											</AvatarFallback>
										</Avatar>
									</CardContent>
									<CardHeader className="p-2 pt-0 md:p-4">
										<CardTitle>{user.name_display}</CardTitle>
										<CardDescription>{user.primary_email}</CardDescription>
									</CardHeader>
								</Card>
							</PopoverTrigger>
							<PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] rounded-lg">
								<Button variant="ghost" className="w-full flex justify-start" asChild>
									<a
										href="https://github.com/incognitotgt/schoology-frontend"
										rel="noopener noreferrer"
										target="_blank"
									>
										<GitHubLogoIcon className="mr-2 size-4" />
										GitHub
									</a>
								</Button>
								<form action={signOut}>
									<Button
										type="submit"
										variant="ghost"
										className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 flex justify-start"
									>
										<ExitIcon className="mr-2 size-4" />
										Sign Out
									</Button>
								</form>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
		</div>
	);
}
