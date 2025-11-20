import supabase from "./supabase";

export async function getCabins()
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


export async function deleteCabin(id) {
const { data,error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);
  //means the id from cabin table should be equal to id passed to this function
  if(error){
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;

}
export async function addCabin(newCabin){

  
const { data, error } = await supabase
// we are inserting newCabin and removed queries because iur data is same as in supabase , like maxCapacity etc 
  .from('cabins')
  .insert([
   newCabin
  ])
  .select()
  if(error) {
    console.error(error);
    throw new Error("Cabin could not be added")
  }
  return data;

}



