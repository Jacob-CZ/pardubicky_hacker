
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Guestbook() {
  const supabase = createClient();

  const { data: guestbook, error } = await supabase
    .from("examples_public")
    .select("*");

  console.log(guestbook);
  console.log(error);
  return (
    <form method="POST" className="mt-8 relative max-w-[500px] gap-2">
      <span className="sr-only"> Comment </span>

      <div className="flex space-x-4">
        <input
          type="text"
          name="comment"
          placeholder="Say something!"
          aria-label="your comment"
          id="comment"
          required
          aria-required="true"
          className="bg-neutral-800 p-2 focus:ring-1 focus:outline-none focus:ring-lime-400 focus-visible:ring-lime-400 ring-1 ring-zinc-700 rounded-sm w-full"
        />
        <button
          type="submit"
          className="bg-neutral-800 rounded-sm px-4 py-2 hover:bg-accent-primary hover:text-neutral-900 transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </form>
  );
}