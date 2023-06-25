import { useEffect, useState } from "react";

const useSearch = () => {
  const searchInput = document.querySelector(".navbar_search_input");

  const [searchQuery, setSearchQuery] = useState(searchInput.value());

  useEffect(() => {
    setSearchQuery(searchInput.value());
  }, [searchInput]);

  return searchQuery;
};

export default useSearch;
