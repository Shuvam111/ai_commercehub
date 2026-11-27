import productsData from "../../../../data/products/catalog.json";
import categoriesData from "../../../../data/storefront/categories.json";
import contentData from "../../../../data/storefront/content.json";
import type { CatalogProduct, ProductCategory } from "@ai-commercehub/shared/types";

export const products = productsData.products as CatalogProduct[];
export const categories = categoriesData.categories as ProductCategory[];
export const storefrontContent = contentData;
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
