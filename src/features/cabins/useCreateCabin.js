import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateEditCabin } from "../../services/apiCabin";

export function useCreateCabin(){

    // so all form inputs have to register in this register functions se how to use register
      // check componnets tree what is in regiester , by register these inputs will got new props
    
      //lets mutate for add
      const queryClient = useQueryClient();
      const { mutate:createCabin, isLoading: isCreating } = useMutation({
        // mutationFn: CreateEditCabin,
        mutationFn: (newCabinData) => CreateEditCabin(newCabinData),
        onSuccess: () => {
          toast.success("Cabin added successfully");
          queryClient.invalidateQueries({
            queryKey: ['cabins']
          });
        },
        onError: (err) => toast.error(err.message),
    
      });

      return {isCreating,createCabin}
}