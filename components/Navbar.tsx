import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

const Navbar = () => {
    return ( 
        <div className=" bg-primary dark:bg-slate-700 py-2 px-5 flex justify-between">
<Link  href="/logo.png"> <Image src='/logo.png' alt={"logo"} 
width={40}
height={40}></Image></Link>


<DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none"><Avatar>
    <AvatarImage src="/logo.png"  alt="@shadcn avatar"/>
    <AvatarFallback className=" text-black">BT</AvatarFallback>
</Avatar></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
     );
}
 
export default Navbar;