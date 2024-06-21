import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreStudiesSlice, IDicomStudyData, IDicomTableStudy, IStudyReport } from '@/models';

const dicomStudiesReducers = {
    addStudies: (state: IStoreStudiesSlice, action: PayloadAction<IDicomTableStudy[]>) => {
        state.dicomStudies = action.payload;
    },
    addStudy: (state: IStoreStudiesSlice, action: PayloadAction<IDicomTableStudy>) => {
        state.dicomStudies.push(action.payload);
    },
    removeStudy: (state: IStoreStudiesSlice, action: PayloadAction<string>) => {
        state.dicomStudies = state.dicomStudies.filter((study) => study.studyId !== action.payload);
    },
    setSelectedDicomStudy: (state: IStoreStudiesSlice, action: PayloadAction<IDicomStudyData>) => {
        state.selectedDicomStudy = action.payload;
    },
    setSelectStudyReport: (state: IStoreStudiesSlice, action: PayloadAction<IStudyReport>) => {
        state.selectedStudyReport = action.payload;
    }
};

export default dicomStudiesReducers;
