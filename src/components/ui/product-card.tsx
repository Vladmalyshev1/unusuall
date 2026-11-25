import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";

import { Icon } from "./icon";

export type ProductImage = Pick<ImageProps, "src" | "alt" | "sizes"> & {
  width: number;
  height: number;
  crop?: { x: number; y: number; width: number; height: number };
};

type ProductCardProps = {
  category: string;
  name: string;
  image: ProductImage;
  href?: LinkProps["href"];
  loading?: ImageProps["loading"];
};

export function ProductCard({ category, name, image: { alt, crop, ...image }, href, loading }: ProductCardProps) {
  const content = (
    <>
      <div className="ui-product-visual relative grid aspect-square place-items-center">
        {crop ? (
          <div
            className="ui-product-crop relative overflow-hidden"
            style={{
              aspectRatio: `${crop.width} / ${crop.height}`,
              width: `${Math.min(1, crop.width / crop.height) * 100}%`,
            }}
          >
            <Image
              {...image}
              alt={alt}
              loading={loading}
              className="absolute h-auto max-w-none"
              style={{
                width: `${image.width / crop.width * 100}%`,
                insetInlineStart: `${-crop.x / crop.width * 100}%`,
                insetBlockStart: `${-crop.y / crop.height * 100}%`,
              }}
            />
          </div>
        ) : (
          <Image {...image} alt={alt} loading={loading} className="size-full object-contain" />
        )}
      </div>
      <div className="ui-product-caption flex min-h-12 items-center justify-between gap-3 py-2 text-sm uppercase">
        <div className="min-w-0 wrap-anywhere">
          <p>{category}</p>
          <h3>{name}</h3>
        </div>
        {href !== undefined && <Icon name="arrow-right" />}
      </div>
    </>
  );

  return (
    <article className="min-w-0">
      {href === undefined ? content : (
        <Link href={href} className="block hover:text-focus">{content}</Link>
      )}
    </article>
  );
}
