import { forwardRef, PropsWithChildren } from "react";

const Card = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => {
  return (
    <div ref={ref} className="text-lg my-3 px-7 py-3 rounded shadow w-fit">
      {children}
    </div>
  );
});

export default Card;
