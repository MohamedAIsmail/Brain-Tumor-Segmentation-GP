import {format, parse} from 'date-fns';
import store from '@/redux/store';
import { uiSliceActions } from "@ui/ui-slice";

class DicomUtil {
    public static formatDate(date: string, strFormat: string = 'MMM dd, yyyy') {
        if (!date) {
            return;
        }

        // Goal: 'Apr 5, 2023'
        try {
            const parsedDateTime = parse(date, 'yyyyMMdd', new Date());
            return format(parsedDateTime, strFormat);
        } catch (err: any) {
            store.dispatch(uiSliceActions.setNotification({
                type: "error",
                content: err.message
            }))
        }
    }

    public static formatTime(time: string, strFormat: string = 'HH:mm:ss') {
        if (!time) {
            return;
        }

        // DICOM Time is stored as HHmmss.SSS, where:
        //      HH 24 hour time:
        //      m mm    0..59   Minutes
        //      s ss    0..59   Seconds
        //      S SS SSS    0..999  Fractional seconds
        //
        // Goal: '24:12:12'

        try {
            const inputFormat = 'HHmmss.SSS';
            const strTime = time.toString().substring(0, inputFormat.length);
            const parsedDateTime = parse(strTime, inputFormat.substring(0,strTime.length), new Date(0));

            return format(parsedDateTime, strFormat);
        } catch (err: any) {
            store.dispatch(uiSliceActions.setNotification({
                type: "error",
                content: err.message
            }))
        }
    }

    public static detectImageOrientation(orientation: number[]) : "Axial" | "Sagittal" | "Coronal" | "Unknown" {

        // Convert orientation values to numbers and take absolute values
        const orientation_array = orientation.map(Number).map(Math.abs);

        // Define unit vectors for axial, sagittal, and coronal orientations
        const axial = [1, 0, 0, 0, 1, 0];
        const sagittal = [0, 1, 0, 0, 0, 1];
        const coronal = [1, 0, 0, 0, 0, 1];

        // Compute the dot products of orientation array with unit vectors
        const dot_axial = DicomUtil.dotProduct(orientation_array, axial);
        const dot_sagittal = DicomUtil.dotProduct(orientation_array, sagittal);
        const dot_coronal = DicomUtil.dotProduct(orientation_array, coronal);

        // Determine the orientation based on the maximum dot product
        const max_dot = Math.max(dot_axial, dot_sagittal, dot_coronal);
        if (max_dot === dot_axial) {
            return "Axial";
        } else if (max_dot === dot_sagittal) {
            return "Sagittal";
        } else if (max_dot === dot_coronal) {
            return "Coronal";
        } else {
            return "Unknown";
        }
    }

    private static dotProduct(a: number[], b: number[]) {
        return a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);
    }
}

export default DicomUtil
