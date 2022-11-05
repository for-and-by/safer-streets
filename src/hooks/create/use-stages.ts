import { useStagesStore } from "~/hooks/create/use-stages-store";
import { useEffect, useState } from "react";

export default function useStages() {
  const stage = useStagesStore((state) => state.stage);
  const nextStage = useStagesStore((stage) => stage.nextStage);
  const prevStage = useStagesStore((stage) => stage.prevStage);
  const jumpToStage = useStagesStore((stage) => stage.jumpToStage);
  const getStageContent = useStagesStore((stage) => stage.getStageContent);

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
