import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { selectGenres } from "../../store/homeSlice";

const Genres = ({ data }) => {
  const genres = useSelector(selectGenres);

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
