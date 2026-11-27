"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity, ArrowLeftRight, BadgePercent, Banknote, Bell, Boxes,
  ChartNoAxesCombined, ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
  ClipboardList, ContactRound, LayoutDashboard, Lightbulb, LogOut, Megaphone,
  Menu, MessageSquareText, MonitorSmartphone, Moon, Package, PackageCheck,
  Puzzle, Search, Settings2, ShieldCheck, Shapes, ShoppingBag, Sparkles, Store,
  Sun, Truck, UserRoundCog, UserRoundPlus, UsersRound, Warehouse,
  X, MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AppNotification, AppSettings, NavigationGroup, NavigationItem } from "@/lib/admin-types";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, Package, Shapes, ShoppingBag, UsersRound, MessageSquareText,
  Boxes, Warehouse, Truck, ClipboardList, ArrowLeftRight, Store, MonitorSmartphone,
  MapPin, ContactRound, Megaphone, BadgePercent, Sparkles, Lightbulb,
  ChartNoAxesCombined, UserRoundCog, ShieldCheck, Puzzle, Settings2, Banknote,
  PackageCheck, UserRoundPlus, Activity,
};

function Brand({ compact = false, applicationName }: { compact?: boolean; applicationName: string }) {
  return (
    <Link href="/" className="brand-lockup" aria-label={`${applicationName} dashboard`}>
      <span className="brand-mark"><Sparkles aria-hidden="true" /></span>
      {!compact && <span className="brand-copy"><strong>AI Commerce<span>Hub</span></strong><small>AI commerce, in sync</small></span>}
    </Link>
  );
}

function UserAvatar({ initials = "AS" }: { initials?: string }) {
  return <span className="user-avatar" aria-hidden="true">{initials}</span>;
}

function SidebarNavigation({
  groups, collapsed, openGroups, onToggleGroup, onNavigate,
}: {
  groups: NavigationGroup[];
  collapsed: boolean;
  openGroups: string[];
  onToggleGroup: (id: string) => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className="sidebar-nav" aria-label="Main navigation">
      {groups.map((group) => {
        const expanded = openGroups.includes(group.id);
        return (
          <section className="nav-group" key={group.id}>
            <button
              className="nav-group-label"
              type="button"
              onClick={() => onToggleGroup(group.id)}
              aria-expanded={expanded}
              title={collapsed ? group.label : undefined}
            >
              {!collapsed && <span>{group.label}</span>}
              {!collapsed && <ChevronDown className={expanded ? "group-chevron is-open" : "group-chevron"} aria-hidden="true" />}
            </button>
            {expanded && <div className="nav-items">
              {group.items.map((item: NavigationItem) => {
                const Icon = iconMap[item.icon] ?? LayoutDashboard;
                const active = pathname === item.route || (item.route !== "/" && pathname.startsWith(`${item.route}/`));
                return (
                  <Link
                    key={item.id}
                    href={item.route}
                    className={active ? "nav-item is-active" : "nav-item"}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? item.label : undefined}
                    onClick={onNavigate}
                  >
                    <Icon aria-hidden="true" />
                    {!collapsed && <span>{item.label}</span>}
                    {item.id === "orders" && !collapsed && <span className="nav-count">12</span>}
                  </Link>
                );
              })}
            </div>}
          </section>
        );
      })}
    </nav>
  );
}

function AdminSidebar({
  groups, collapsed, openGroups, onToggleGroup, onNavigate, onCollapse, applicationName,
}: {
  groups: NavigationGroup[];
  collapsed: boolean;
  applicationName: string;
  openGroups: string[];
  onToggleGroup: (id: string) => void;
  onNavigate: () => void;
  onCollapse: () => void;
}) {
  return (
    <aside className={collapsed ? "admin-sidebar is-collapsed" : "admin-sidebar"}>
      <div className="sidebar-brand-row"><Brand compact={collapsed} applicationName={applicationName} />
        {!collapsed && <span className="workspace-pill"><span /> Workspace</span>}
      </div>
      <SidebarNavigation groups={groups} collapsed={collapsed} openGroups={openGroups} onToggleGroup={onToggleGroup} onNavigate={onNavigate} />
      <div className="sidebar-footer">
        <div className="sidebar-user"><UserAvatar />
          {!collapsed && <span className="sidebar-user-copy"><strong>Aarav Sharma</strong><small>Store owner</small></span>}
          {!collapsed && <ChevronDown aria-hidden="true" />}
        </div>
        <Button className="collapse-button" variant="ghost" size="icon-sm" onClick={onCollapse} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <ChevronRight aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
        </Button>
      </div>
    </aside>
  );
}

function NotificationMenu({ notifications }: { notifications: AppNotification[] }) {
  const unread = notifications.filter((item) => !item.read).length;
  return (
    <details className="menu-root">
      <summary className="icon-action notification-trigger" aria-label={`Notifications, ${unread} unread`}>
        <Bell aria-hidden="true" />{unread > 0 && <span className="notification-dot" />}
      </summary>
      <div className="menu-panel notification-panel">
        <div className="menu-heading"><strong>Notifications</strong><span>{unread} new</span></div>
        {notifications.map((item) => <div className="notification-item" key={item.id}>
          <span className={item.read ? "notification-bullet is-read" : "notification-bullet"} />
          <span><strong>{item.title}</strong><small>{item.description}</small><time>{item.timestamp}</time></span>
        </div>)}
        <button className="menu-footer-action" type="button">View all notifications</button>
      </div>
    </details>
  );
}

function ProfileMenu() {
  return (
    <details className="menu-root profile-menu">
      <summary className="profile-trigger" aria-label="Open user profile menu"><UserAvatar /><span className="profile-trigger-copy"><strong>Aarav Sharma</strong><small>Owner</small></span><ChevronDown aria-hidden="true" /></summary>
      <div className="menu-panel profile-panel">
        <div className="menu-heading"><strong>Aarav Sharma</strong><span>Store owner</span></div>
        <button type="button">My Profile</button><button type="button">Account Settings</button><button type="button">Preferences</button>
        <div className="menu-divider" /><button type="button" className="sign-out-option"><LogOut aria-hidden="true" /> Sign Out</button>
      </div>
    </details>
  );
}

function AdminHeader({
  notifications, onToggleMobile, isDark, onToggleTheme, onHelp, canToggleTheme,
}: {
  notifications: AppNotification[];
  onToggleMobile: () => void;
  canToggleTheme: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  onHelp: () => void;
}) {
  const pathname = usePathname();
  const label = pathname === "/" ? "Dashboard" : pathname.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") ?? "Dashboard";
  return (
    <header className="admin-header">
      <div className="header-left">
        <Button className="mobile-menu-button" variant="ghost" size="icon" onClick={onToggleMobile} aria-label="Open navigation"><Menu aria-hidden="true" /></Button>
        <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight aria-hidden="true" /><span>{label}</span></div>
      </div>
      <label className="global-search"><Search aria-hidden="true" /><input type="search" placeholder="Search anything..." aria-label="Search anything" /><kbd>⌘ K</kbd></label>
      <div className="header-actions">
        <NotificationMenu notifications={notifications} />
        {canToggleTheme && <Button className="icon-action" variant="ghost" size="icon" onClick={onToggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} title={isDark ? "Switch to light theme" : "Switch to dark theme"}>{isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}</Button>}
        <Button className="icon-action help-action" variant="ghost" size="icon" onClick={onHelp} aria-label="Help and support"><CircleHelp aria-hidden="true" /></Button>
        <ProfileMenu />
      </div>
    </header>
  );
}

export function AdminShell({
  children, groups, notifications, settings,
}: {
  children: ReactNode;
  groups: NavigationGroup[];
  notifications: AppNotification[];
  settings: AppSettings;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(settings.theme.default === "dark");
  const canToggleTheme = settings.theme.allowToggle && settings.theme.available.includes("dark") && settings.theme.available.includes("light");
  const [notice, setNotice] = useState("");
  const [openGroups, setOpenGroups] = useState(groups.map((group) => group.id));
  const toggleGroup = (id: string) => setOpenGroups((current) => current.includes(id) ? current.filter((groupId) => groupId !== id) : [...current, id]);
  const showHelp = () => {
    setNotice("Support center is coming soon.");
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <div className={isDark ? "commerce-app dark" : "commerce-app"}>
      <AdminSidebar groups={groups} collapsed={collapsed} openGroups={openGroups} onToggleGroup={toggleGroup} onNavigate={() => setMobileOpen(false)} onCollapse={() => setCollapsed((value) => !value)} applicationName={settings.application.name} />
      {mobileOpen && <div className="mobile-sidebar-layer">
        <button className="mobile-sidebar-backdrop" type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
        <aside className="mobile-sidebar" role="dialog" aria-modal="true" aria-label="Main navigation">
          <div className="mobile-drawer-head"><Brand applicationName={settings.application.name} /><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X aria-hidden="true" /></Button></div>
          <SidebarNavigation groups={groups} collapsed={false} openGroups={openGroups} onToggleGroup={toggleGroup} onNavigate={() => setMobileOpen(false)} />
          <div className="sidebar-user mobile-drawer-user"><UserAvatar /><span className="sidebar-user-copy"><strong>Aarav Sharma</strong><small>Store owner</small></span></div>
        </aside>
      </div>}
      <div className={collapsed ? "admin-main is-wide" : "admin-main"}>
        <AdminHeader notifications={notifications} onToggleMobile={() => setMobileOpen(true)} isDark={isDark} canToggleTheme={canToggleTheme} onToggleTheme={() => setIsDark((value) => !value)} onHelp={showHelp} />
        <main className="admin-content">{children}</main>
      </div>
      {notice && <div className="ui-notice" role="status">{notice}</div>}
    </div>
  );
}
