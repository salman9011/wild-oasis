import supabase from "./supabase";

export async function getCabin()
{
const { data, error } = await supabase
  .from('cabins')
  .select('*')

  if(error){
    console.error(error);
    throw new Error("Cabins could not be Loaded");
  }
  return data;
}

// this is how we are querying from client using from method and it returns all cabin rows from cabins table
// it is async functiona nd returns a promise so we have to await it when we call it
// lets now use this service in our app
