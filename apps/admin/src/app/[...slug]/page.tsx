import Link from "next/link";
import { Sparkles } from "lucide-react";
import appSettings from "../../../../../data/administration/app-settings.json";
import navigationData from "../../../../../data/administration/navigation.json";
import notificationData from "../../../../../data/administration/notifications.json";
import { AdminShell } from "@/components/admin/admin-shell";
import type { AppNotification, AppSettings, NavigationGroup } from "@/lib/admin-types";

const moduleRoutes = navigationData.groups
  .flatMap((group) => group.items)
  .filter((item) => item.route !== "/")
  .map((item) => ({ slug: item.route.split("/").filter(Boolean) }));

export function generateStaticParams() {
  return moduleRoutes;
}

export default async function ModulePlaceholder({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const route = `/${slug.join("/")}`;
  const item = navigationData.groups.flatMap((group) => group.items).find((entry) => entry.route === route);
  const title = item?.label ?? "Page not found";

  return (
    <AdminShell
      groups={navigationData.groups as NavigationGroup[]}
      notifications={notificationData.notifications as AppNotification[]}
      settings={appSettings as AppSettings}
    >
      <section className="module-placeholder">
        <div className="placeholder-icon"><Sparkles aria-hidden="true" /></div>
        <p className="eyebrow">AI COMMERCEHUB <span className="eyebrow-separator">/</span> COMING SOON</p>
        <h1>{title}</h1>
        <p className="placeholder-description">This workspace is ready for the {title.toLowerCase()} module. Its business workflows will be introduced in a future phase.</p>
        <Link href="/" className="placeholder-link">Return to dashboard <span aria-hidden="true">→</span></Link>
      </section>
    </AdminShell>
  );
}
