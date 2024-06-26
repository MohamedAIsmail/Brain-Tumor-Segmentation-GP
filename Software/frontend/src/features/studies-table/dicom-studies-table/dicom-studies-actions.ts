import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';

const GATEWAY_URL = import.meta.env.VITE_SERVER_URL;

export const fetchDicomStudiesThunk = () => {
    console.log(`fetching dicom studies from ${GATEWAY_URL}/dicom/studies`);

    return async (dispatch: Dispatch) => {
        const studies = await AxiosUtil.sendRequest({
            method: 'GET',
            url: `${GATEWAY_URL}/dicom/studies`
        });

        if (!studies) {
            return;
        }

        dispatch(studiesSliceActions.addStudies(studies));
    };
};

export const fetchDicomStudyByIdThunk = (studyInstanceUID: string) => {
    return async (dispatch: Dispatch) => {
        const study = await AxiosUtil.sendRequest({
            method: 'GET',
            url: `${GATEWAY_URL}/dicom/studies/${studyInstanceUID}`
        });

        if (!study) {
            return;
        }

        dispatch(studiesSliceActions.setSelectedDicomStudy(study));
    };
};

export const uploadDicomFilesThunk = (file: File) => {
    return async () => {
        const formData = new FormData();

        formData.append('file', file);

        const response = await AxiosUtil.sendRequest({
            method: 'POST',
            url: `${GATEWAY_URL}/dicom/upload`,
            data: formData
        });

        if (!response) {
            return;
        }
    };
};
