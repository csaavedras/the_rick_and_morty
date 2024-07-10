import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

const QUERY = gql(`
    query Query{
    episodes {
    results {
        id
        name
        created
        characters {
        id
        name
        image
        }
    }
    }
    }
`);

const Content = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return <div>{JSON.stringify(data)}</div>;
};

export default Content;
