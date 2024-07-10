import { Card } from "flowbite-react";
import formatDate from "../utils/formatDate";
import { Link } from "react-router-dom";

type CardContentProps = {
  id: number;
  name: string;
  created: string;
};

const CardContent: React.FC<CardContentProps> = ({ id, name, created }) => {
  return (
    <Card href="#" className="max-w-sm">
      <Link to={`/episode/${id}`}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Episode created: <br />{" "}
          <span className="font-bold">{formatDate(created)}</span>
        </p>
      </Link>
    </Card>
  );
};

export default CardContent;
