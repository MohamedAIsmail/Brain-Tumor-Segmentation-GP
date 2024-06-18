import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Button } from '@mui/material';
import { Logo } from '@ui/library';
import HomeTopBar from '@features/top-bars/HomeTopBar/HomeTopBar.tsx';
import FiltersBar from '@/features/top-bars/HomeTopBar/FiltersBar';
import UploadDicomModal from '@/features/studies-table/dicom-studies-table/UploadDicomModal';
import { useState } from 'react';

const HomeLayout = () => {
    // get the current location
    const { pathname: location } = useLocation();

    // check if the current location is the dicom studies
    const isDisplayingDicomStudies = location === '/';

    const [isAddingDicom, setIsAddingDicom] = useState(false);

    return (
        <div>
            <Helmet>
                <title>MMM.AI Home</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segmentation and MRI Motion Artifacts Correction."
                />
            </Helmet>

            <Box className={'flex flex-col p-5'}>
                <Box className={'h-1/2'}>
                    <HomeTopBar />
                </Box>

                {isDisplayingDicomStudies && (
                    <Box className={'flex flex-col gap-2 md:flex-row md:items-center justify-between mt-8'}>
                        <Box className={'flex'}>
                            <Button
                                className={'md:h-12'}
                                variant={'contained'}
                                color={'secondary'}
                                onClick={() => setIsAddingDicom(true)}
                            >
                                New Dicom
                            </Button>
                        </Box>

                        <Box className={'h-36 md:h-12'}>
                            <FiltersBar />
                        </Box>
                    </Box>
                )}

                <Box className={''}>
                    <Outlet />
                </Box>

                <Box className={'h-3/12 mt-5'}>
                    <Box className={'flex h-12 justify-center'}>
                        <Logo />
                    </Box>
                </Box>
            </Box>

            {isAddingDicom && (
                <UploadDicomModal isOpen={isAddingDicom} onClose={() => setIsAddingDicom(false)} />
            )}
        </div>
    );
};

export default HomeLayout;
