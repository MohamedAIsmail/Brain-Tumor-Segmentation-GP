import {ActiveLearning, AdvancedToolBox, AISegmentation, SegmentationGroupTable} from '@ui/library';
import advancedToolConfig, {
    handleSegmentationDelete,
    handleSegmentationVisibilityToggle,
    handleSegmentClick,
    handleSegmentLockToggle,
    handleSegmentVisibilityToggle,
    onSegmentationClick
} from '@features/viewer/ViewerToolPanel/segmentation-config.ts';
import {CornerstoneToolManager} from '../CornerstoneToolManager';
import {useSelector} from 'react-redux';
import {IStore} from '@/models';

const SegmentationTab = () => {
    const segmentations = useSelector((store: IStore) => store.viewer.segmentations);
    return (
        <div>
            <AdvancedToolBox title={'Segmentation Tools'} items={advancedToolConfig}/>
            <SegmentationGroupTable
                segmentations={segmentations}
                showAddSegmentation={true}
                showAddSegment={true}
                segmentationConfig={{
                    fillAlpha: 0.5,
                    fillAlphaInactive: 0.5,
                    outlineWidthActive: 2,
                    outlineOpacityActive: 1,
                    renderFill: true,
                    renderInactiveSegmentations: true,
                    renderOutline: false
                }}
                setFillAlpha={() => {
                }}
                setFillAlphaInactive={() => {
                }}
                setOutlineWidthActive={() => {
                }}
                setOutlineOpacityActive={() => {
                }}
                setRenderFill={() => {
                }}
                onSegmentAdd={() => CornerstoneToolManager.addSegmentToSegmentation(1)}
                onSegmentClick={handleSegmentClick}
                onSegmentationAdd={async () => await CornerstoneToolManager.addSegmentation()}
                onSegmentationClick={onSegmentationClick}
                onSegmentationDelete={handleSegmentationDelete}
                onSegmentationDownload={() => {
                    CornerstoneToolManager.downloadSegmentation();
                }}
                onSegmentationEdit={() => {
                }}
                onSegmentDelete={() => {
                }}
                onSegmentEdit={() => {
                }}
                onToggleSegmentationVisibility={handleSegmentationVisibilityToggle}
                onSegmentColorClick={() => {
                }}
                onToggleSegmentLock={handleSegmentLockToggle}
                onToggleSegmentVisibility={handleSegmentVisibilityToggle}
                setRenderInactiveSegmentations={() => {
                }}
                setRenderOutline={() => {
                }}
            />

            <ActiveLearning/>
            <AISegmentation />

        </div>
    );
};

export default SegmentationTab;
