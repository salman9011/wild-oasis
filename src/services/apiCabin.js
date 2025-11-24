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
export async function CreateEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //2. we are creating unique image name by appending random number before original name

  // lets do things for edit now , for that we pass id to it and now lets query different way
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]).select();

  // for edit based oon id
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }

  if(hasImagePath) return data;
  //3. after adding random image names and path , lets upload it
  const { error: storageError, success } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (success) {
    toast.success("Image uploaded successfully");
  }
  //4. don't create the cabin if there were error in uploading the file
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Image could not be uploaded, so cabin not created");
  }
  return data;
}
