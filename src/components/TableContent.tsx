import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import { Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

const GET_CHARACTERS_BY_EPISODE =
  gql(`query GetCharactersByEpisode($ids: [ID!]!) {
  episodesByIds(ids: $ids) {
    characters {
      id
      image
      name
    }
  }
}`);

const TableContent = () => {
  const { ids = [] } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTERS_BY_EPISODE, {
    variables: { ids },
  });

  const [searchCharacters, setSearchCharacters] = useState("");

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner aria-label="Default status example" size="xl" />
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );

  const characters = data?.episodesByIds?.[0]?.characters;

  const filteredCharacters = characters?.filter((character) =>
    character?.name?.toLowerCase().includes(searchCharacters.toLowerCase()),
  );

  return (
    <div className="overflow-x-auto bg-gray-200 p-5">
      <div className="flex gap-5 py-5">
        <Link to="/">
          <Button color="blue">Back</Button>
        </Link>
        <TextInput
          id="search"
          type="text"
          value={searchCharacters}
          placeholder="Search name.."
          onChange={(e) => setSearchCharacters(e.target.value)}
          required
        />
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>id</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {filteredCharacters?.map((character) => (
            <Table.Row
              key={character?.id || ""}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {character?.id}
              </Table.Cell>
              <Table.Cell>{character?.name}</Table.Cell>
              <Table.Cell>
                <img
                  src={character?.image || ""}
                  alt={character?.name || ""}
                  className="h-20 w-20"
                  loading="lazy"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableContent;
