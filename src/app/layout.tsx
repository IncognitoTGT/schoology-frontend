import "./supress-logs";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import SupressLogs from "./supress-logs.client";

const fontSans = Inter({ subsets: ["latin"], variable: "--sans" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--mono" });

export const metadata: Metadata = {
	title: "Schoology",
	description: "idk some frontend",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontSans.variable} ${fontMono.variable} h-screen`}>
				<SupressLogs />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					themes={["light", "dark"]}
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider>{children}</TooltipProvider>
					<Toaster richColors theme="system" position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
