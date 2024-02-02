import {useState} from "react";

// MUI
import {IconButton, Popover, Tooltip, useTheme} from "@mui/material";

// Icons
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

// Custom
import GeneralSettingsPopover from "./Popovers/GeneralSettingsPopover.jsx";


const GeneralCustomIconButton = ({sx, icon, doPopDown = false, children, onClick, tooltipName}) => {

    const theme = useTheme();


    const customStyle = {
        ...sx,
        borderRadius: "0.2rem",
        border: "1px solid" + `${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.lighter,
    }

    // the anchor element is the element that the popover is attached to
    const [anchorElement, setAnchorElement] = useState(null);

    const handlePopoverClose = () => {
        setAnchorElement(null);
    };

    const handleClickOnArrowDownButton = (event) => {
        setAnchorElement(event.currentTarget);
    };

    // open is true if the anchor element is not null, it's used to open the popover
    const open = Boolean(anchorElement);

    return (
        <>
            {
                tooltipName ? (
                    <Tooltip title={tooltipName}>
                        <IconButton
                            sx={{...customStyle}}
                            onClick={onClick}
                        >
                            {/* the component contains the icon and if popDown is true it has a popover element activated */}
                            {icon}

                            {
                                doPopDown &&
                                <ArrowDropDownOutlinedIcon onClick={handleClickOnArrowDownButton}/>
                            }

                        </IconButton>
                    </Tooltip>
                ) : (
                    <IconButton
                        sx={{...customStyle}}
                        onClick={onClick}
                    >
                        {/* the component contains the icon and if popDown is true it has a popover element activated */}
                        {icon}

                        {
                            doPopDown &&
                            <ArrowDropDownOutlinedIcon onClick={handleClickOnArrowDownButton}/>
                        }

                    </IconButton>
                )
            }
        </>
    )
};

const coreComponent = () => {

}

export default GeneralCustomIconButton;
