import { supabase } from "./supabaseClient";

async function getmyuser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  if (user.aud === "authenticated") {
    console.log("authenticated");
    return user;
  }
}

export default getmyuser;
