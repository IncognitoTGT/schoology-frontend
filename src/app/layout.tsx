import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

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
			<body className={`${fontSans.variable} ${fontMono.variable} font-sans h-screen`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					themes={["light", "dark", "slate", "zinc"]}
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
