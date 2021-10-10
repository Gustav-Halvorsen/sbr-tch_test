import { useLayoutEffect, useState } from "react";

type TUseWindowDimensionsProps = {
  width: number;
  height: number;
};

export const useWindowDimensions = (): TUseWindowDimensionsProps => {
  const [size, setSize] = useState<TUseWindowDimensionsProps>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
