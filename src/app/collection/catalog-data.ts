import type { IconName } from "@/components/ui/icon";
import type { ProductImage } from "@/components/ui/product-card";

export const filters = [
  { value: "all", label: "Все изделия", icon: "grid" },
  { value: "hoodie", label: "Худи", icon: "hoodie" },
  { value: "tshirt", label: "Футболки", icon: "t-shirt" },
  { value: "jacket", label: "Куртки", icon: "jacket" },
  { value: "accessory", label: "Аксессуары", icon: "cap" },
  { value: "limited", label: "Лимитированные", icon: "sparkle" },
] as const satisfies readonly { value: string; label: string; icon: IconName }[];

export type CollectionFilter = typeof filters[number]["value"];
type Category = Exclude<CollectionFilter, "all" | "limited">;

type Product = {
  name: string;
  category: Category;
  limited: boolean | null;
  image: ProductImage;
};

const dualViewSizes = "(min-width: 1024px) 40vw, 88vw";
const capSizes = "(min-width: 1024px) 33vw, 73vw";

// The crop boxes select the supplied front views and retain a little transparent edge.
export const products: readonly Product[] = [
  {
    name: "TERRAIN",
    category: "hoodie",
    limited: null,
    image: {
      src: "/images/products/hoodie.png", alt: "Тёмное худи с вышитым знаком спереди",
      width: 1536, height: 1024, sizes: dualViewSizes,
      crop: { x: 30, y: 82, width: 730, height: 832 },
    },
  },
  {
    name: "FLOW",
    category: "tshirt",
    limited: null,
    image: {
      src: "/images/products/tshirt.png", alt: "Тёмная футболка с вышитым знаком спереди",
      width: 1774, height: 887, sizes: dualViewSizes,
      crop: { x: 38, y: 80, width: 840, height: 764 },
    },
  },
  {
    name: "BOTANICA",
    category: "jacket",
    limited: null,
    image: {
      src: "/images/products/jacket.png", alt: "Тёмная куртка с вышитым знаком на груди",
      width: 1774, height: 887, sizes: dualViewSizes,
      crop: { x: 28, y: 52, width: 835, height: 797 },
    },
  },
  {
    name: "MINIMAL",
    category: "accessory",
    limited: null,
    image: {
      src: "/images/products/cap.png", alt: "Тёмная кепка с вышитым знаком спереди",
      width: 1536, height: 1024, sizes: capSizes,
      crop: { x: 315, y: 67, width: 945, height: 934 },
    },
  },
];
