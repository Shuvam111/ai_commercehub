"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ArrowDownRight, ArrowUpRight, Banknote, Boxes, CalendarDays, Check,
  ChevronDown, CircleAlert, Download, Ellipsis, Package, ShoppingBag,
  TrendingUp, UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AppSettings, DashboardData, Metric } from "@/lib/admin-types";
import catalogData from "../../../../../data/products/catalog.json";

const centralProducts = new Map(catalogData.products.map((product) => [product.id, product]));

const metricIcons = { Banknote, ShoppingBag, UsersRound, Boxes };
const currency = (amount: number, locale: string, currencyCode: string) => new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode, currencyDisplay: "code", maximumFractionDigits: 0 }).format(amount);

function PageHeader({ onExport, exportMessage, settings }: { onExport: () => void; exportMessage: string; settings: AppSettings }) {
  const [store, setStore] = useState(settings.dashboard.defaultStore);
  const [range, setRange] = useState(settings.dashboard.defaultDateRange);
  return (
    <div className="page-heading-row">
      <div className="page-heading-copy"><div className="eyebrow">FRIDAY, NOVEMBER 27, 2026 <span className="eyebrow-separator">/</span> KATHMANDU, NEPAL</div><h1>Dashboard</h1><p>Monitor your business performance and manage your commerce operations.</p></div>
      <div className="page-controls">
        <label className="select-control"><CalendarDays aria-hidden="true" /><select aria-label="Date range" value={range} onChange={(event) => setRange(event.target.value)}><option>Last 30 days</option><option>Last 7 days</option><option>This month</option><option>This year</option></select><ChevronDown aria-hidden="true" /></label>
        <label className="select-control store-select"><span className="store-avatar">B</span><select aria-label="Branch" value={store} onChange={(event) => setStore(event.target.value)}><option>All branches</option><option>Kathmandu Flagship</option><option>Pokhara Lakeside</option><option>Bhaktapur Studio</option></select><ChevronDown aria-hidden="true" /></label>
        <Button variant="outline" className="export-button" onClick={onExport}><Download data-icon="inline-start" /> <span>Export</span></Button>
      </div>
      {exportMessage && <span className="sr-only" role="status">{exportMessage}</span>}
    </div>
  );
}

function StatCard({ metric }: { metric: Metric }) {
  const Icon = metricIcons[metric.icon as keyof typeof metricIcons] ?? TrendingUp;
  const positive = metric.trend === "up";
  return (
    <article className="stat-card">
      <div className="stat-topline"><span className="stat-label">{metric.label}</span><span className="stat-icon"><Icon aria-hidden="true" /></span></div>
      <strong className="stat-value">{metric.value}</strong>
      <div className="stat-foot"><span className={positive ? "metric-change positive" : "metric-change negative"}>{positive ? <ArrowUpRight aria-hidden="true" /> : <ArrowDownRight aria-hidden="true" />}{Math.abs(metric.change)}%</span><span className="metric-comparison">{metric.comparison}</span></div>
      <div className={positive ? "stat-sparkline positive-line" : "stat-sparkline negative-line"} aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
    </article>
  );
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

function RevenueChart({ data, locale, currencyCode }: { data: DashboardData["revenue"]; locale: string; currencyCode: string }) {
  const [period, setPeriod] = useState("30 days");
  return (
    <section className="panel chart-panel">
      <SectionHeading title="Revenue over time" subtitle="Track your sales performance across all channels" action={<div className="chart-periods" aria-label="Chart time range">{["7 days", "30 days", "12 months"].map((option) => <button type="button" key={option} className={period === option ? "period-button is-selected" : "period-button"} aria-pressed={period === option} onClick={() => setPeriod(option)}>{option}</button>)}</div>} />
      <div className="chart-legend"><span><i className="legend-dot revenue-dot" /> Revenue</span><span><i className="legend-dot orders-dot" /> Orders</span><span className="chart-compare">Compared to previous period</span></div>
      <div className="revenue-chart" role="img" aria-label="Area chart showing daily revenue and order counts from June 1 to June 30">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 14, right: 12, left: 0, bottom: 0 }}>
            <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-accent)" stopOpacity={0.2} /><stop offset="100%" stopColor="var(--chart-accent)" stopOpacity={0.01} /></linearGradient></defs>
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="3 5" />
            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickMargin={12} />
            <YAxis yAxisId="revenue" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickFormatter={(value: number) => `${Math.round(value / 1000)}k`} tickMargin={9} width={36} label={{ value: `Revenue (${currencyCode})`, angle: -90, position: "insideLeft", offset: 0, fill: "var(--muted-foreground)", fontSize: 10 }} />
            <YAxis yAxisId="orders" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} tickMargin={8} width={28} />
            <Tooltip content={<ChartTooltip locale={locale} currencyCode={currencyCode} />} cursor={{ stroke: "var(--chart-accent)", strokeDasharray: "4 4" }} />
            <Area yAxisId="revenue" type="monotone" dataKey="revenue" stroke="var(--chart-accent)" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 4, strokeWidth: 2, fill: "var(--card)" }} />
            <Line yAxisId="orders" type="monotone" dataKey="orders" stroke="var(--text-secondary)" strokeWidth={2} dot={false} activeDot={{ r: 3, fill: "var(--text-secondary)" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-caption"><span><TrendingUp aria-hidden="true" /> Revenue is up <strong>12.8%</strong> this month</span><span>Updated just now</span></div>
    </section>
  );
}

function ChartTooltip({ active, payload, label, locale, currencyCode }: { active?: boolean; payload?: Array<{ dataKey: string; value: number; color?: string }>; label?: string; locale: string; currencyCode: string }) {
  if (!active || !payload?.length) return null;
  return <div className="chart-tooltip"><span>{label}</span>{payload.map((item) => <div className="chart-tooltip-row" key={item.dataKey}><i style={{ backgroundColor: item.color }} /><span>{item.dataKey === "revenue" ? "Revenue" : "Orders"}</span><strong>{item.dataKey === "revenue" ? currency(item.value, locale, currencyCode) : item.value}</strong></div>)}</div>;
}

function SalesOverview({ data }: { data: DashboardData["salesOverview"] }) {
  const total = data.completed + data.pending + data.cancelled;
  const stats = [
    { label: "Completed", value: data.completed, className: "sales-completed" },
    { label: "Pending", value: data.pending, className: "sales-pending" },
    { label: "Cancelled", value: data.cancelled, className: "sales-cancelled" },
  ];
  return (
    <section className="panel sales-panel">
      <SectionHeading title="Sales overview" subtitle="Order fulfillment at a glance" action={<button className="more-button" type="button" aria-label="More sales overview options"><Ellipsis aria-hidden="true" /></button>} />
      <div className="sales-total"><span>Total sales</span><strong>{data.totalSales}</strong><span className="sales-growth"><ArrowUpRight aria-hidden="true" /> 12.8%</span></div>
      <div className="sales-progress" aria-label={`${data.completed} of ${total} orders completed`}><span style={{ width: `${(data.completed / total) * 100}%` }} /><span style={{ width: `${(data.pending / total) * 100}%` }} /><span style={{ width: `${(data.cancelled / total) * 100}%` }} /></div>
      <div className="sales-stat-list">{stats.map((stat) => <div className="sales-stat" key={stat.label}><span><i className={stat.className} />{stat.label}</span><strong>{stat.value.toLocaleString("en-IN")}</strong><small>{Math.round((stat.value / total) * 100)}%</small></div>)}</div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status-badge status-${className}`}><i />{status}</span>;
}

function RecentOrders({ orders }: { orders: DashboardData["recentOrders"] }) {
  return (
    <section className="panel orders-panel">
      <SectionHeading title="Recent orders" subtitle="Your latest customer orders" action={<Link href="/commerce/orders" className="text-link">View all orders <span aria-hidden="true">↗</span></Link>} />
      <div className="table-scroll"><table className="orders-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Amount</th><th>Payment</th><th>Status</th></tr></thead>
        <tbody>{orders.map((order) => <tr key={order.id}><td className="order-id">{order.id}</td><td><span className="table-customer"><i>{order.initials}</i><span>{order.customer}</span></span></td><td className="table-muted">{order.date}</td><td>{order.items} {order.items === 1 ? "item" : "items"}</td><td className="amount-cell">{order.amount}</td><td><StatusBadge status={order.paymentStatus} /></td><td><StatusBadge status={order.orderStatus} /></td></tr>)}</tbody>
      </table></div>
    </section>
  );
}

function ProductList({ products }: { products: DashboardData["topProducts"] }) {
  return <section className="panel products-panel"><SectionHeading title="Top selling products" subtitle="Best performers this month" action={<button className="more-button" type="button" aria-label="More product options"><Ellipsis aria-hidden="true" /></button>} />
    <div className="product-list">{products.map((product, index) => { const catalogProduct = centralProducts.get(product.id); return <div className="product-row" key={product.id}><span className={`product-thumb tone-${product.tone}`}><Package aria-hidden="true" /><i>{product.monogram}</i></span><span className="product-description"><strong>{catalogProduct?.name ?? product.id}</strong><small>{catalogProduct?.category ?? "Central catalog"}</small></span><span className="product-performance"><strong>{product.revenue}</strong><small>{product.unitsSold} sold</small></span><span className="product-rank">0{index + 1}</span></div>; })}</div>
  </section>;
}

function RecentActivity({ activity }: { activity: DashboardData["activity"] }) {
  const toneClasses: Record<string, string> = { primary: "activity-primary", green: "activity-green", violet: "activity-violet", amber: "activity-amber" };
  return <section className="panel activity-panel"><SectionHeading title="Recent activity" action={<button className="more-button" type="button" aria-label="More activity options"><Ellipsis aria-hidden="true" /></button>} />
    <div className="activity-list">{activity.map((item) => <div className="activity-row" key={item.id}><span className={`activity-icon ${toneClasses[item.tone] ?? "activity-primary"}`}><Check aria-hidden="true" /></span><div><strong>{item.title}</strong><p>{item.detail}</p><time>{item.time}</time></div></div>)}</div>
  </section>;
}

function LowStock({ items }: { items: DashboardData["lowStock"] }) {
  return <section className="panel low-stock-panel"><SectionHeading title="Low stock alerts" subtitle="Products that need attention" action={<span className="alert-count"><CircleAlert aria-hidden="true" /> {items.length}</span>} />
    <div className="low-stock-list">{items.map((item) => <div className="low-stock-row" key={item.id}><span className="stock-product-icon"><Package aria-hidden="true" /></span><span className="low-stock-copy"><strong>{item.name}</strong><small>{item.sku}</small></span><span className="stock-quantity"><strong>{item.quantity}</strong><small>left</small></span><StatusBadge status={item.status} /></div>)}</div>
    <Link href="/inventory" className="stock-link">View inventory <span aria-hidden="true">→</span></Link>
  </section>;
}

export function DashboardContent({ data, settings }: { data: DashboardData; settings: AppSettings }) {
  const [message, setMessage] = useState("");
  const exportData = () => {
    setMessage("Export is a preview-only action.");
    window.setTimeout(() => setMessage(""), 2400);
  };
  return (
    <div className="dashboard-page">
      <PageHeader onExport={exportData} exportMessage={message} settings={settings} />
      {message && <div className="inline-notice" role="status">{message}</div>}
      <section className="metrics-grid" style={{ "--metric-columns": settings.dashboard.metricColumns } as CSSProperties} aria-label="Business performance metrics">{data.metrics.map((metric) => <StatCard key={metric.id} metric={metric} />)}</section>
      <div className="analytics-grid">{settings.dashboard.showRevenueChart && <RevenueChart data={data.revenue} locale={settings.application.locale} currencyCode={settings.application.currency} />}<SalesOverview data={data.salesOverview} /></div>
      {settings.dashboard.showRecentOrders && <RecentOrders orders={data.recentOrders} />}
      <div className="lower-grid"><ProductList products={data.topProducts} /><RecentActivity activity={data.activity} />{settings.dashboard.showInventoryAlerts && <LowStock items={data.lowStock} />}</div>
      <footer className="dashboard-footnote"><span>Showing sample dashboard data</span><span>All times in {settings.application.timezone} · {settings.application.currency}</span></footer>
    </div>
  );
}
