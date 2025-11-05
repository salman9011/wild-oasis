import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabin } from "../services/apiCabin";

function Cabins() {

  useEffect(function(){
getCabin().then((data)=>console.log(data));
//  ohhh we get our data , so we craeted backend service to fetch cabins and we are able to use it here in our component to get the data from supabase
  },[])
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
