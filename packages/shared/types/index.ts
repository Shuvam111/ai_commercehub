export type PrimaryUserType = "super_admin" | "branch_manager" | "commerce_operations" | "marketing_customer_relations" | "customer";
export type RecordStatus = "active" | "inactive" | "invited";
export type PermissionAction = "view" | "create" | "update" | "delete" | "approve" | "export";

export interface BusinessOrganization {
  id: string;
  businessName: string;
  legalName: string;
  businessType: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  currency: "NPR";
  timezone: string;
  defaultBranchId: string;
  branchIds: string[];
  createdAt: string;
  status: RecordStatus;
}

export interface Branch {
  id: string;
  branchCode: string;
  branchName: string;
  description: string;
  branchType: "flagship" | "retail" | "warehouse";
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  managerId: string;
  employeeIds: string[];
  status: RecordStatus;
  openingHours: Record<string, string>;
  createdAt: string;
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  roleId: string;
  branchIds: string[];
  primaryBranchId: string;
  employmentType: "full_time" | "part_time" | "contract";
  joiningDate: string;
  status: RecordStatus;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userType: PrimaryUserType;
  defaultPermissions: string[];
  branchScope: "organization" | "assigned_branches" | "customer";
  status: RecordStatus;
}

export interface Permission {
  id: string;
  module: string;
  resource: string;
  actions: PermissionAction[];
  description: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  badge?: string;
  variants?: { name: string; options: string[] }[];
  specifications: { label: string; value: string }[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
}

export interface BranchInventory {
  branchId: string;
  productId: string;
  quantity: number;
  lowStockThreshold: number;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}
