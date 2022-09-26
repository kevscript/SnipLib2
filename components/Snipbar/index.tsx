import { BarsFilter } from "../layouts/BarsWrapper";
import ListBar from "./list/ListBar";
import TagBar from "./tag/TagBar";

export type SnipbarProps = {
  filter: BarsFilter;
};

const Snipbar = ({ filter }: SnipbarProps) => {
  if (filter === "list") {
    return <ListBar />;
  }

  if (filter === "tag") {
    return <TagBar />;
  }

  return <h1>Loading bar...</h1>;
};

export default Snipbar;
