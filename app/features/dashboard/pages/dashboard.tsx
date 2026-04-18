import { supabase } from "~/postgress/supaclient";

// before rendering Home react component
export async function loader() {
  const { data } = await supabase().from("destat-test").select("*");
}

export default function Home() {
  return <div>hello detast world</div>;
}
