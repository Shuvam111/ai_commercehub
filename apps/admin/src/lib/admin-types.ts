export type NavigationItem = {
  id: string;
  label: string;
  route: string;
  icon: string;
  order: number;
};

export type NavigationGroup = {
  id: string;
  label: string;
  order: number;
  items: NavigationItem[];
};

export type Metric = {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  comparison: string;
  icon: string;
};

export type RevenuePoint = { period: string; revenue: number; orders: number };
export type RecentOrder = {
  id: string;
  customer: string;
  initials: string;
  date: string;
  items: number;
  amount: string;
  paymentStatus: string;
  orderStatus: string;
};
export type TopProduct = {
  id: string;
  unitsSold: number;
  revenue: string;
  tone: string;
  monogram: string;
};
export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: string;
  tone: string;
};
export type LowStockItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  status: string;
};

export type DashboardData = {
  metrics: Metric[];
  revenue: RevenuePoint[];
  salesOverview: {
    totalSales: string;
    completed: number;
    pending: number;
    cancelled: number;
  };
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  activity: ActivityItem[];
  lowStock: LowStockItem[];
};

export type AppNotification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: string;
  read: boolean;
};

export type AppSettings = {
  application: {
    name: string;
    fullName: string;
    currency: string;
    locale: string;
    timezone: string;
  };
  theme: {
    default: "light" | "dark";
    available: Array<"light" | "dark">;
    allowToggle: boolean;
  };
  dashboard: {
    defaultDateRange: string;
    defaultStore: string;
    metricColumns: number;
    showRevenueChart: boolean;
    showRecentOrders: boolean;
    showInventoryAlerts: boolean;
  };
};
