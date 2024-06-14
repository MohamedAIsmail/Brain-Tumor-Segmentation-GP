import { DatePicker } from 'antd';
import { Box, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';
import { TAppDispatch } from '@/redux/store.ts';
import PeriodButtons from '@features/top-bars/HomeTopBar/PeriodButtons.tsx';
import ModalityButtons from '@features/top-bars/HomeTopBar/ModalityButtons.tsx';
import CustomButton from '@features/top-bars/components/CustomButton.tsx';
import { OPTIONS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import '@styles/DateRange.scss';

const { RangePicker } = DatePicker;

const HomeTopBar = () => {
    const theme = useTheme();

    const dispatch = useDispatch<TAppDispatch>();
    const isDisplayingDicomStudies = window.location.pathname === '/';

    const rangePickerChangeHandler = (data: any) => {
        if (!data) {
            dispatch(
                studiesSliceActions.setDateFilter({
                    startDate: null,
                    endDate: null
                })
            );

            return;
        }

        dispatch(
            studiesSliceActions.setDateFilter({
                startDate: new Date(data[0]).toISOString(),
                endDate: new Date(data[1]).toISOString()
            })
        );
    };

    return (
        <Box className={'flex justify-between w-full h-full'}>
            {/* Left Side */}
            {isDisplayingDicomStudies ? (
                <Box className={'flex'}>
                    <Box className={'flex'}>
                        <RangePicker
                            className={`createDateRangePicker ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                            popupClassName={`createDateRangePickerPopup ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                            allowClear={true}
                            onChange={rangePickerChangeHandler}
                        />
                    </Box>

                    <Box className={'flex ml-2 h-full'}>
                        <PeriodButtons />
                    </Box>

                    <Box className={'flex ml-2 '}>
                        <ModalityButtons />
                    </Box>
                </Box>
            ) : (
                <Box></Box>
            )}

            {/* Right Side */}
            <Box className={'flex space-x-1'}>
                {OPTIONS.map((option, index) => (
                    <CustomButton
                        key={index}
                        onClick={option.onClick}
                        icon={option.icon}
                        menuItems={option?.menuItems}
                        menuComponent={option?.menuComponent}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default HomeTopBar;
