import {useState} from "react";
import {ButtonGroup, SidePanel} from "@ui/library";
import SegmentationTab from "./Segmentation/SegmentationTab.tsx";
import MeasurementsTab from "@features/viewer/ViewerToolPanel/MeasurementsTab.tsx";
import SequenceSynthesisTab from "./Synthesis/SequenceSynthesisTab.tsx";
import MotionArtifactsCorrectionTab from "./MotionArtifactsCorrection/MotionArtifactsCorrectionTab.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRuler, faBrush, faBriefcaseMedical, faPlus} from "@fortawesome/free-solid-svg-icons";


const ViewerToolPanel = () => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const onActiveIndexChange = (index: number) => {
        setActiveTabIndex(index);
    }

    return (
        <div>
            <SidePanel title={"Tools"} headerComponent={
                <ButtonGroup
                    buttons={[
                        {
                            children: <FontAwesomeIcon icon={faRuler}/>,
                            onClick: () => console.log("Measurement"),
                            key: `button-Measurement`
                        },
                        {
                            children: <FontAwesomeIcon icon={faBrush}/>,
                            onClick: () => console.log("Segmentation"),
                            key: `button-Segmentation`
                        },
                        {
                            children: <FontAwesomeIcon icon={faBriefcaseMedical}/>,
                            onClick: () => console.log("Motion Artifacts Correction"),
                            key: `button-AI-Features`
                        },
                        {
                            children: <FontAwesomeIcon icon={faPlus}/>,
                            onClick: () => console.log("Sequence Synthesis"),
                            key: `button-AI-Features`
                        }

                    ]}
                    onActiveIndexChange={onActiveIndexChange}
                    defaultActiveIndex={activeTabIndex}
                    activeTabColor={"bg-sky-800"}
                />
            }>
                <div className="overflow-y-scroll min-h-[85vh] max-h-[88vh]">
                    <div className={`${activeTabIndex !== 0 ? 'hidden' : ''}`}><SegmentationTab/></div>
                    <div className={`${activeTabIndex !== 1 ? 'hidden' : ''}`}><MeasurementsTab/></div>
                    <div className={`${activeTabIndex !== 2 ? 'hidden' : ''}`}><MotionArtifactsCorrectionTab/></div>
                    <div className={`${activeTabIndex !== 3 ? 'hidden' : ''}`}><SequenceSynthesisTab/></div>
                </div>
            </SidePanel>
        </div>
    )
}

export default ViewerToolPanel;
