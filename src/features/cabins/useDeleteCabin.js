import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabin";

 
 export function useDeleteCabin(){
 const queryClient = useQueryClient();
  //now on delete lets invalidate the cache , which means we have to mutate the data for that we have useMutation hook of react query
  const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({
    //which data we have to mutate
    // mutationFn: (cabinId) => deleteCabin(cabinId)
    // both values are same here so we can just write like this because the id we passed and the function argument is also cabinId
    mutationFn: deleteCabinApi
    ,
    onSuccess: () => {

      toast.success("Cabin deleted successfully");
      // on success we have to invalidate query that function is in query client so jus import first query client hook
      queryClient.invalidateQueries(
        {
          queryKey: ['cabins']
        }
      )
    },
    // its the error thrown from deleteCabin function
    onError:(err) => toast.error(err.message),
  

  });

  return {isDeleting,deleteCabin}
  }
