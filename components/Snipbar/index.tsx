import { SnipbarFilter } from "../layouts/SnipbarWrapper";
import CollectionBar from "./collection/CollectionBar";
import TagBar from "./tag/TagBar";

export type SnipbarProps = {
  filter: SnipbarFilter;
};

const Snipbar = ({ filter }: SnipbarProps) => {
  if (filter === "collection") {
    return <CollectionBar />;
  }

  if (filter === "tag") {
    return <TagBar />;
  }

  return <h1>Loading bar...</h1>;
};

export default Snipbar;
