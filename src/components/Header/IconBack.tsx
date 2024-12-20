import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export default function IconBack() {
    return (
        <Button variant="outline">
            <Link href="/">
                <ChevronLeft/>
            </Link>
        </Button>
    )
}