import { gql } from "./__generated__";
import { useQuery } from "@apollo/client";
import { Spinner, Table } from "flowbite-react";
import formatDate from "./utils/formatDate";
import { useNavigate } from "react-router-dom";

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

function App() {
  const { loading, error, data } = useQuery(QUERY);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  if (error) return <p>`Error! ${error.message}`</p>;

  const dataContent = data?.episodes?.results || null;

  const handleRowClick = (ids: number) => {
    navigate(`/episode/${ids}`);
  };

  return (
    <div className="w-full bg-gray-200 text-black">
      <h1 className="py-10 text-center text-2xl">Rick and Morty</h1>

      <div className="overflow-x-auto p-5">
        <Table>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Name episode</Table.HeadCell>
            <Table.HeadCell>Created Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataContent?.map((item) => (
              <Table.Row
                key={item?.id}
                className="cursor-pointer bg-white"
                onClick={() => handleRowClick(Number(item?.id))}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item?.id || ""}
                </Table.Cell>
                <Table.Cell>{item?.name || ""}</Table.Cell>
                <Table.Cell>{formatDate(item?.created || "")}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default App;
