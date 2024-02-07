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
}

export default DicomUtil