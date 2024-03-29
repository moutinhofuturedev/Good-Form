import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { GetServerSideProps } from 'next';
import { api } from '../api/api';
import { ListProps } from "../types/type";

interface OneProps {
    data: Pick<ListProps, 'id' | 'name' | 'email'>[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get("/persons")
    const data: ListProps[] = await response.data

    return {
        props: {
            data
        }
    }
}

export default function Test({ data }: OneProps) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => {
            return (
              <Tr key={row.id}>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}