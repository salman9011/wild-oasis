import toast from "react-hot-toast/headless";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Loaded");
  }
  return data;
}

// this is how we are querying from client using from method and it returns all cabin rows from cabins table
// it is async functiona nd returns a promise so we have to await it when we call it
// lets now use this service in our app

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  //means the id from cabin table should be equal to id passed to this function
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

//https://werzimvqxvevbueriehf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function addCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //2. we are creating unique image name by appending random number before original name

  const { data, error } = await supabase
    // we are inserting newCabin and removed queries because iur data is same as in supabase , like maxCapacity etc

    //1.now image uploading part, we first create cabin , if it is success then we will upload image, for that above first wwe will create path
    .from("cabins")
    .insert([{...newCabin, image:imagePath}])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }
  //3. after adding random image names and path , lets upload it
  const { error:storageError, success } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image);
  if(success){
    toast.success("Image uploaded successfully");
  }
  //4. don't create the cabin if there were error in uploading the file
  if(storageError){
     await supabase.from("cabins").delete().eq("id", data.id)
     console.error(storageError);
    throw new Error("Image could not be uploaded, so cabin not created");
  }
  return data;
}
