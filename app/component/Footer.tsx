import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center text-xs py-2 bg-gray-800 text-white">
      <ul className="my-1">
        <li className="mb-2 text-sky-500">
          <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
        </li>
        <li className="mb-2">
          &copy;英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
