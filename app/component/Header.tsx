import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  isTopPage?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isTopPage }) => {
  return (
    <header className="mt-4 md:mb-14">
      <div className="w-[350px] mx-auto ">
        <Link href="/">
          {isTopPage ? (
            <h1>
              <Image
                src="/logo.png"
                alt="サイトタイトル"
                width={350}
                height={90}
                priority
                className="mx-auto"
              />
            </h1>
          ) : (
            <Image
              src="/logo.png"
              alt="サイトタイトル"
              width={350}
              height={90}
              priority
              className="mx-auto"
            />
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
