import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "./../utils/Title";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Text,
  Legend,
} from "recharts";
import { useProducts } from "../context/ProductsProvider";
import { useWeeks } from "../context/WeeksProvider";
import { format } from "date-fns";
import { useIngredients } from "../context/IngredientsProvider";
import PointLabel from "../utils/PointLabel";
import Labels from "../utils/Labels";

function ProductDetails() {
  return (
    <div className="col-span-6 flex h-full flex-col items-center justify-start gap-10 py-10">
      <PriceChart />
    </div>
  );
}

function PriceChart() {
  const { productIdExterno } = useParams();

  const { getAllWeeks, weeks } = useWeeks();

  const { getAllProducts, products } = useProducts();

  useEffect(() => {
    getAllProducts();
    getAllWeeks();
  }, [getAllProducts, getAllWeeks]);

  if (!products || !weeks) return null;

  const currentProduct = products.find(
    (product) => product.idExterno === Number(productIdExterno),
  );

  const chartPricesData = currentProduct.precosTotalSemanal.map((semana) => {
    return {
      preco: semana.precoTotal,
      semana: format(
        weeks.find((week) => week._id === semana.semana).intervalo.fim,
        "dd/MM/yyyy",
      ),
    };
  });

  return (
    <>
      <Title>{currentProduct.nome}</Title>
      <div className="flex h-[550px] w-[90%] flex-col items-center justify-center rounded-lg border border-gray-300 py-6 shadow-xl">
        <h2 className="mb-10 font-noto text-lg text-gray-800 drop-shadow-sm">
          Histórico de preços distribuídos por datas de relatórios
        </h2>
        <LineChart
          width={800}
          height={400}
          data={chartPricesData}
          margin={{ right: 80, left: 80, top: 30 }}
        >
          <CartesianGrid stroke="rgb(209,213,219)" strokeDasharray="5 5" />
          <XAxis
            dataKey={"semana"}
            strokeOpacity={50}
            className="font-montserrat text-sm"
          />
          <YAxis strokeOpacity={50} className="font-montserrat text-sm" />
          <Line
            type={"monotone"}
            dataKey={"preco"}
            stroke="rgb(59,130,246,0.7)"
            strokeWidth={3}
            dot={{
              stroke: "rgb(249,115,22)",
              strokeWidth: 1,
              height: 5,
            }}
            activeDot={{
              stroke: "rgb(249,115,22)",
              strokeWidth: 1,
            }}
            label={<PointLabel />}
          />

          <Tooltip content={<Labels />} />
        </LineChart>
      </div>
    </>
  );
}

export default ProductDetails;
