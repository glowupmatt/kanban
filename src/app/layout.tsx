import "./globals.css";
import type { Metadata } from "next";
import TemplateLayout from "@/components/TemplateLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Kanban",
  description: "Track your tasks with Our Kanban App",
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
          <TemplateLayout>{children}</TemplateLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
