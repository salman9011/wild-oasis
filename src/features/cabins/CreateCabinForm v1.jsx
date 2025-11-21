

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



// we don't have any state variable about the form , no controlled elemmnts , because we are using react form hook library
function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  // to get erros shown below with feilds  we use formState and extract erros from it
  const { errors } = formState;
  console.log("form errors object", errors);
  // register function will return an object containing onChange , onBlur , name , ref etc

  // so all form inputs have to register in this register functions se how to use register
  // check componnets tree what is in regiester , by register these inputs will got new props

  //lets mutate for add
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("Cabin added successfully");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (err) => toast.error(err.message),

  });

  function onSubmitForm(data) {
    console.log("form data", data);
    mutate({...data,image:data.image?.[0]}); // because file input returns array of files

  }

  function onError(errors) {
    console.log("form errors", errors);
  }
  return (
    // eeverything will be handled by react form , this submit thing also
    // if one of validation fails the handle submit will call onError
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>

        <Input type="text" id="name" {...register("name", {
          required: "This feild is required",
          disabled: { isCreating }
        })} />

      </FormRow>


      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>

        <Input type="number" id="maxCapacity" disabled={isCreating}

          {...register("maxCapacity", {
            required: "This feild is required"

          })} />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>

        <Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice", {
          required: "This feild is required",

        })} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0}


          {...register("discount", {
            required: "This feild is required",
            validate: (value) => value <= getValues().regularPrice || 'Discount cannot be more than regular price',

          })} />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>

        <Textarea type="number" id="description" disabled={isCreating} defaultValue=""  {...register("description",
          {
            required: "This feild is required",

          }
        )} />
      </FormRow>

      <FormRow label='Image' error={errors?.image?.message}>

        <FileInput id="image" accept="image/*"  {...register("image",
          {
            required: "This feild is required",

          }
        )}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
