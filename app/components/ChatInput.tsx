import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatInput() {
    return (
        <form className="flex w-full items-center gap-2">
            <Input type="text" placeholder="Ask anything" />
            <Button type="submit" variant="outline">
                Send
            </Button>
        </form>
    );
}
