import { useStageStore } from "~/hooks/create/use-stages-store";
import { useEffect, useState } from "react";

export default function useStages() {
  const stage = useStageStore((state) => state.stage);
  const nextStage = useStageStore((stage) => stage.nextStage);
  const prevStage = useStageStore((stage) => stage.prevStage);
  const jumpToStage = useStageStore((stage) => stage.jumpToStage);
  const getStageContent = useStageStore((stage) => stage.getStageContent);

  const [content, setContent] = useState(getStageContent());

  useEffect(() => {
    setContent(getStageContent());
  }, [stage]);

  const value = content;

  const actions = {
    nextStage,
    prevStage,
    jumpToStage,
  };

  return [value, actions] as [typeof value, typeof actions];
}
