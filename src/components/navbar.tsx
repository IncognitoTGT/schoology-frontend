import { BellIcon, HomeIcon, RocketIcon, Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { NavLink } from "./ui/nav-link";
// biome-ignore lint: typescritp
export default function Navigation({ school, user }: { school: any; user: any }) {
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
		<div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] -mt-4 fixed">
			<div className="border-r bg-muted/40 block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-4 gap-2">
						<Link href="/home" className="flex items-center gap-2 font-semibold">
							<RocketIcon className="size-7" />
							<span className="text-balance">{school.title}</span>
						</Link>
						<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
							<BellIcon className="h-4 w-4" />
							<span className="sr-only">Toggle notifications</span>
						</Button>
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
						<Card className="flex items-center justify-center flex-row">
							<CardContent className="p-2 pt-0 md:p-4">
								<Avatar>
									<AvatarImage src={user.picture_url} />
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
					</div>
				</div>
			</div>
		</div>
	);
}
