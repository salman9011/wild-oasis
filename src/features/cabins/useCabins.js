import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";

export function useCabins(){
     // now lets use react query to fetch cabins data
      // query key should be unique for each data set and it should be array , can be complex array,in dev tools we can see this name
      // later if we read data in another page with this exact key then same data will be used from cache instead of fetching again
      // second argument is function which returns a promise, but we have already function for getCabins which returns a promise
     const {data:cabins, isLoading, error} = useQuery ({
        queryKey:['cabins'],
        queryFn: getCabins,
      });
      return {isLoading,cabins, error}
}