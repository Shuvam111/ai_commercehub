import appSettings from "../../../../data/administration/app-settings.json";
import dashboardData from "../../../../data/administration/dashboard.json";
import navigationData from "../../../../data/administration/navigation.json";
import notificationData from "../../../../data/administration/notifications.json";
import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import type { AppNotification, AppSettings, DashboardData, NavigationGroup } from "@/lib/admin-types";

export default function Home() {
  return (
    <AdminShell
      groups={navigationData.groups as NavigationGroup[]}
      notifications={notificationData.notifications as AppNotification[]}
      settings={appSettings as AppSettings}
    >
      <DashboardContent data={dashboardData as DashboardData} settings={appSettings as AppSettings} />
    </AdminShell>
  );
}
