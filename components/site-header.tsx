import { createClient } from "@/lib/supabase/server"
import { SiteHeaderClient } from "@/components/site-header-client"
export async function SiteHeader(){let user:any=null;try{const s=await createClient();const{data}=await s.auth.getUser();if(data.user)user={name:data.user.user_metadata?.full_name||data.user.email||"Usuario",avatar:data.user.user_metadata?.avatar_url}}catch{}return <SiteHeaderClient user={user}/>} 
