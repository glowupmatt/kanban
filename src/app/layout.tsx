import "./globals.css";
import type { Metadata } from "next";
import TemplateLayout from "@/components/TemplateLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppContext from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Kanban",
  description: "Track your tasks with Our Kanban App",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppContext>
            <TemplateLayout>{children}</TemplateLayout>
          </AppContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
