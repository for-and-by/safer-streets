import { useStyleVars } from "~/hooks/use-style-vars";

type Props = {
  value: number;
};

export function ProgressBar(props: Props) {
  const { value = 10 } = props;

  const style = useStyleVars({
    progress: `${value.toString()}%`,
  });

  return (
    <div style={style} className="block h-0.5 w-full bg-base-100">
      <div className="block h-full w-[--progress] bg-brand-700 transition-all" />
    </div>
  );
}
