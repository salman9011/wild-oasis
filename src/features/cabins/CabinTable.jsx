
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {

  // now lets use react query to fetch cabins data
  // query key should be unique for each data set and it should be array , can be complex array,in dev tools we can see this name
  // later if we read data in another page with this exact key then same data will be used from cache instead of fetching again
  // second argument is function which returns a promise, but we have already function for getCabins which returns a promise

  // role gives semantic meaning to element for accessibility and tells that it is html , even if we have not used in those in stylings

  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />
  return (<div>
    <Table role='table'>
      <TableHeader role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>

      </TableHeader>
      {cabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />)}
    </Table>
  </div>)
}

export default CabinTable;