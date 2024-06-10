import { forwardRef } from "react";

const Button = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
      {...props}
    />
  );
})