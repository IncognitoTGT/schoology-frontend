import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({subsets: ["latin"]});
// const fontMono = JetBrains_Mono();

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
		<html lang="en">
			<body className={`${fontSans.className} h-screen`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					themes={["light", "dark"]}
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster richColors theme="system" position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
