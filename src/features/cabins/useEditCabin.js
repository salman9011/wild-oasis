import { QueryClient, useMutation } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useEditCabin(){
     const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData,id})=>CreateEditCabin(newCabinData,id),
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      QueryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (err) => toast.error(err.message),

  });
  return {isEditing,editCabin};
}