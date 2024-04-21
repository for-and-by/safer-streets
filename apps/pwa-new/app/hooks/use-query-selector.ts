import { useEffect, useState } from "react";

export default function useQuerySelector(selector: string) {
  const [ref, setRef] = useState<Element | null>(null);

  useEffect(() => {
    if (!ref) {
      setRef(document.querySelector(selector));
    }
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
