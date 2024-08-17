import FavoriteIcon from "@/components/icons/Favorite";
import Link from "next/link";

type FavLinkProps = {
  isActive: boolean;
  snippetsAmount: number;
};

const FavLink = ({ isActive, snippetsAmount }: FavLinkProps) => {
  return (
    <Link href="/favorites" passHref>
      <a className="flex items-center justify-between cursor-pointer flex-nowrap group">
        <div className="flex items-center flex-nowrap">
          <FavoriteIcon className="w-4 h-4 stroke-marine fill-transparent" />
          <span
            className={`ml-4 text-xs font-bold uppercase ${
              isActive ? "text-white" : "text-carbon-300 group-hover:text-white"
            }`}
          >
            Favorites
          </span>
        </div>
        <div className="flex justify-center w-6">
          <span
            className={`text-sm ${
              isActive ? "text-white" : "text-carbon-300 group-hover:text-white"
            }`}
          >
            {snippetsAmount}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default FavLink;
