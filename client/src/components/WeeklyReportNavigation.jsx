import { NavLink, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsProvider";

function WeeklyReportNavigation() {
  const { semanaId } = useParams();

  const { sortedProducts } = useProducts();

  if (!semanaId) return <p> oi</p>;

  return (
    <div className="col-span-1">
      <ul className="text-montserrat flex flex-col items-start justify-center text-xs">
        {sortedProducts?.map((product) => (
          <NavLink
            to={`/relatorios/${semanaId}?product=${product.idExterno}`}
            key={product.idExterno}
          >
            {product.nome}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default WeeklyReportNavigation;
