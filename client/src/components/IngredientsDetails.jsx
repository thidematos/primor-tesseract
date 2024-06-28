import { useParams } from "react-router-dom";
import { useIngredients } from "../context/IngredientsProvider";
import { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PointLabel from "../utils/PointLabel";
import Labels from "../utils/Labels";
import Title from "../utils/Title";
import Loader from "../utils/Loader";
import { useWeeks } from "../context/WeeksProvider";
import { format } from "date-fns";

function IngredientsDetails() {
  const { currentIngredient, getSingleIngredient } = useIngredients();

  const { ingredientIdExterno } = useParams();

  useEffect(() => {
    getSingleIngredient(ingredientIdExterno);
  }, [getSingleIngredient, ingredientIdExterno]);

  if (!currentIngredient) return <Loader position={"col-span-6 self-center"} />;

  console.log(currentIngredient);

  return (
    <div className="markup col-span-6 flex flex-col items-center justify-start py-16">
      <Title fontSize="text-2xl text-orange-500" margin="mb-10">
        {currentIngredient.nome}
      </Title>
      <IngredientGraph />
    </div>
  );
}

function IngredientGraph() {
  const { currentIngredient } = useIngredients();
  const { getAllWeeks, weeks } = useWeeks();

  useEffect(() => {
    getAllWeeks();
  }, [getAllWeeks]);

  if (!currentIngredient || !weeks) return null;

  const ingredientGraphData = currentIngredient.precoSemana.map((el) => {
    return {
      preco: el.preco,
      semana: format(
        weeks.find((week) => week._id === el.semana)?.intervalo.fim,
        "dd/MM/yyyy",
      ),
    };
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-6 font-noto text-lg text-gray-700 drop-shadow-sm">
        Histórico de preços distribuídos por datas de relatórios
      </h2>
      <LineChart
        width={800}
        height={400}
        data={ingredientGraphData}
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
  );
}

export default IngredientsDetails;
