import Image from "next/image";
import Link from "next/link";

import { HeaderNavigation } from "./header-navigation";

export function Header() {
  return (
    <HeaderNavigation>
      <Link href="/" className="header-brand" aria-label="UNUSUALL — студия кастомной вышивки, главная">
        <span className="header-brand-mark">
          <Image src="/logo/logo-white.svg" alt="" width={786} height={179} loading="eager" />
          <span className="header-wordmark">unusuall</span>
        </span>
        <span className="header-brand-description">
          <span>Студия<br />кастомной<br />вышивки</span>
        </span>
      </Link>
    </HeaderNavigation>
  );
}
