import styles from "./collection.module.css";

const desktop = {
  viewBox: "0 0 1536 254",
  edge: "M1252 -16 C1218 92 984 192 706 252 C662 261 608 267 562 278",
  side: "M-30 165 C-10 219 43 260 124 288",
  base: "M-25 503 C173 625 545 608 789 609 C1118 595 1407 584 1562 482",
  catalogViewBox: "0 0 1536 610",
};

const mobile = {
  viewBox: "0 0 390 276",
  edge: "M396 -16 C400 39 400 103 375 137 C348 169 275 178 194 183 C111 188 30 199 -20 227",
  side: "M-27 150 C-8 185 21 203 70 220",
  base: "M-22 595 C54 529 334 561 406 488",
  catalogViewBox: "0 0 390 580",
};

const artDirection = [
  { name: "wide", layout: desktop, className: styles.desktopArt },
  { name: "narrow", layout: mobile, className: styles.mobileArt },
];

export function CollectionHeroLight() {
  return artDirection.map(({ name, layout, className }) => {
    const edge = `collection-hero-edge-${name}`;
    const plate = `collection-hero-plate-${name}`;
    const clip = `collection-hero-clip-${name}`;
    const rim = `collection-hero-rim-${name}`;

    return (
      <svg key={name} className={`${styles.heroCurve} ${className}`} viewBox={layout.viewBox}
        preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs>
          <path id={edge} d={layout.edge} />
          <path id={plate} d={`${layout.edge} H-30V-16Z`} />
          <clipPath id={clip}><use href={`#${plate}`} /></clipPath>
          <linearGradient id={rim} x1="10%" x2="94%">
            <stop stopColor="#a4bce1" stopOpacity="0" />
            <stop offset="0.57" stopColor="#a4bce1" stopOpacity="0.44" />
            <stop offset="1" stopColor="#bfd5f7" />
          </linearGradient>
        </defs>
        <use href={`#${plate}`} className={styles.heroPlate} />
        <g clipPath={`url(#${clip})`}>
          <use href={`#${edge}`} className={styles.heroGlow} stroke={`url(#${rim})`} />
        </g>
        <use href={`#${edge}`} className={styles.heroRim} stroke={`url(#${rim})`} />
      </svg>
    );
  });
}

export function CollectionCatalogLight() {
  return artDirection.map(({ name, layout, className }) => {
    const side = `collection-side-${name}`;
    const base = `collection-base-${name}`;
    const clip = `collection-base-clip-${name}`;
    const plate = `collection-base-plate-${name}`;

    return (
      <svg key={name} className={`${styles.catalogLight} ${className}`} viewBox={layout.catalogViewBox}
        preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs>
          <path id={side} d={layout.side} />
          <path id={base} d={layout.base} />
          <path id={plate} d={`${layout.base} V-25H-40Z`} />
          <clipPath id={clip}><use href={`#${plate}`} /></clipPath>
        </defs>
        <use href={`#${side}`} className={styles.catalogSideGlow} />
        <use href={`#${side}`} className={styles.catalogSideRim} />
        <g clipPath={`url(#${clip})`}>
          <use href={`#${base}`} className={styles.catalogBaseGlow} />
        </g>
        <use href={`#${base}`} className={styles.catalogBaseRim} />
      </svg>
    );
  });
}
