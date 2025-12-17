import React from "react";
import SingleItem from "./SingleItem";
import { Link, useLocation } from "react-router-dom";

const ItemList = ({ title, items, itemsArray, path, idPath, idKey }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const finalItems = isHome ? items : Infinity;

  return (
    <div className="item-list">
      <div className="item-list__header">
        <h2>{title} populares</h2>

        {isHome && (
          <Link to={path} className="item-list__link">
            Mostrar tudo
          </Link>
        )}
      </div>

      <div className="item-list__container">
        {itemsArray
          .slice(0, finalItems)
          .map((currObj, index) => {
            const id = currObj[idKey];

            if (!id) {
              console.error(
                `[ItemList] Item sem ${idKey}:`,
                currObj
              );
              return null;
            }

            return (
              <SingleItem
                key={`${title}-${id}`}
                id={id}
                name={currObj.name}
                image={currObj.image}
                artist={currObj.artist}
                 idPath={idPath}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ItemList;
