"use client";
import { signOut } from "@/actions/accounts";
import { cn } from "@/lib/utils";
import {
	CaretSortIcon,
	CheckIcon,
	EnvelopeClosedIcon,
	EnvelopeOpenIcon,
	ExitIcon,
	GitHubLogoIcon,
	HomeIcon,
	MoonIcon,
	Pencil2Icon,
	PersonIcon,
	PlusCircledIcon,
	RocketIcon,
	SunIcon,
} from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { useTheme } from "next-themes";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { NavLink } from "./ui/nav-link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Textarea } from "./ui/textarea";
export default function Navigation({
	school,
	user,
	messages,
	messageSenders,
}: { school: any; user: any; messages: any; messageSenders: any[] }) {
	const { theme, themes, setTheme } = useTheme();
	useEffect(() => {
		if (messages.unread_count !== "0") toast(`You have ${messages.unread_count} unread messages`);
	});
	const [sheetOpen, setSheetOpen] = useState(false);
	const [toBoxOpen, setToBoxOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [autoComplete, setAutoComplete] = useState([]);
	const [value, setValue] = useState<any | null>(null);
	useEffect(() => {
		(async () => {
			if (toBoxOpen && search.length > 0) {
				const {
					users: { search_result },
				} = await (await fetch(`/api/search?keywords=${search}&type=user`)).json();
				setAutoComplete(search_result);
			}
		})();
	}, [toBoxOpen, search]);
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
						<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
									<Dialog>
										<DialogTrigger asChild>
											<Button>
												<PlusCircledIcon className="size-4 mr-2" />
												New Message
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Send Message</DialogTitle>
												<DialogDescription>Send a message to someone in your school</DialogDescription>
											</DialogHeader>
											<form className="flex flex-col gap-2 w-full">
												<Label htmlFor="to">Recipients</Label>
												<Popover open={toBoxOpen} onOpenChange={setToBoxOpen}>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															role="combobox"
															aria-expanded={toBoxOpen}
															className="w-[200px] justify-between"
														>
															{value?.name || "Search for a teacher"}
															<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-[200px] p-0">
														<Command>
															<CommandInput placeholder="Search" onValueChange={setSearch} />
															<CommandEmpty>No user found.</CommandEmpty>
															<CommandGroup>
																{autoComplete?.map((user: any) => (
																	<CommandItem
																		key={user.uid}
																		onSelect={() => {
																			setValue(user.id);
																			setSearch(user.name_display);
																		}}
																	>
																		{user.name}
																	</CommandItem>
																))}
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
												<Label htmlFor="subject">Subject</Label>
												<Input id="subject" placeholder="Subject" name="subject" required />
												<Label htmlFor="message">Message</Label>
												<Textarea id="message" placeholder="Message" name="message" required />
												<Button type="submit" className="w-full">
													Send
												</Button>
											</form>
										</DialogContent>
									</Dialog>
								</SheetHeader>
								{messages.message.map((message: any) => (
									<Link key={message.id} href={`/messages/inbox/${message.id}`} onClick={() => setSheetOpen(false)}>
										<Card className="w-full h-32 hover:bg-secondary/70">
											<CardHeader>
												<CardTitle className="truncate flex gap-2 items-center">
													<Image
														src={messageSenders.find((m) => message.author_id === m.id).picture_url}
														alt="profile"
														width={170}
														height={170}
														className="rounded-full aspect-square bg-cover bg-center object-cover size-4 inline"
													/>
													{messageSenders.find((m) => message.author_id === m.id).name_display}
												</CardTitle>
												<CardDescription className="truncate overflow-x-scroll">{message.subject}</CardDescription>
												<CardDescription>{new Date(message.last_updated * 1000).toLocaleString()}</CardDescription>
											</CardHeader>
										</Card>
									</Link>
								))}
							</SheetContent>
						</Sheet>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							{navItems.map(({ href, Icon, label }) => (
								<NavLink key={href} href={href}>
									<Icon className="h-5 w-5" />
									{label}
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
											<AvatarImage
												{...getImageProps({
													src: user.picture_url,
													width: 60,
													height: 60,
													alt: "Profile picture",
												}).props}
											/>
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
								<Button
									variant="ghost"
									className="w-full flex justify-start"
									onClick={() =>
										setTheme(
											themes[
												themes.indexOf(theme as string) < themes.length - 1 ? themes.indexOf(theme as string) + 1 : 0
											],
										)
									}
								>
									<SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2 size-4" />
									<MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2 size-4" />
									{theme
										?.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</Button>

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
