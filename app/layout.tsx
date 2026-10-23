import { DM_Sans } from "next/font/google";
import "./_styles/global.css";
import { ContributionDemoProvider } from "./_state/ContributionDemoProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <ContributionDemoProvider>{children}</ContributionDemoProvider>
      </body>
    </html>
  );
}
