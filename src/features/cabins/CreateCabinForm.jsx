

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";



// we don't have any state variable about the form , no controlled elemmnts , because we are using react form hook library
function CreateCabinForm({cabinToedit={}}) {

  const {id:editId,...editCabinData} = cabinToedit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editCabinData : {}
  });
  const { errors } = formState;

  const {isCreating,createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  // to get erros shown below with feilds  we use formState and extract erros from it
  // register function will return an object containing onChange , onBlur , name , ref etc

  
   

  const isWorking = isCreating || isEditing;
  function onSubmitForm(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
  if(isEditSession) editCabin({newCabinData:{...data,image},id:editId});

  // here mutation happen , so we can use onsuceess here also to reset the form , as we can't use reset in create Hook, that is also advantage of react query
  // this mutation has also acces of newly created object
   else  createCabin({...data,image:image}, {onSuccess:()=>reset()}); // because file input returns array of files

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
          disabled: { isWorking }
        })} />

      </FormRow>


      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>

        <Input type="number" id="maxCapacity" disabled={isWorking}

          {...register("maxCapacity", {
            required: "This feild is required"

          })} />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>

        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
          required: "This feild is required",

        })} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0}


          {...register("discount", {
            required: "This feild is required",
            validate: (value) => value <= getValues().regularPrice || 'Discount cannot be more than regular price',

          })} />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>

        <Textarea type="number" id="description" disabled={isWorking} defaultValue=""  {...register("description",
          {
            required: "This feild is required",

          }
        )} />
      </FormRow>

      <FormRow label='Image' error={errors?.image?.message}>

        <FileInput id="image" accept="image/*"  {...register("image",
          {
            required: isEditSession ? false :  "This feild is required",

          }
        )}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Update Cabin' : 'Add Cabin' }</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
