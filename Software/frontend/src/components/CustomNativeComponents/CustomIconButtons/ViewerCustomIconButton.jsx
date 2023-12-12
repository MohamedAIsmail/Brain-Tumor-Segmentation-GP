import {useState} from "react";

// MUI
import {IconButton, Box,Popover, useTheme} from "@mui/material";

// Icons
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

// Theme
import {tokens} from "../../../assets/theme/theme.js";

// Custom
import GeneralSettingsPopover from "./Popovers/GeneralSettingsPopover.jsx";
import ViewerPopover from "./Popovers/ViewerPopover.jsx";


const ViewerCustomIconButton = ({sx, icon , text, onClickAction, doPopDown = true, isClickable = true, popDownChildren = []}) => {

    const theme = useTheme();
    const colorMode = theme.palette.mode;
    const colors = tokens(colorMode);

    // the anchor element is the element that the popover is attached to
    const [anchorElement, setAnchorElement] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const customStyle = {
        ...sx,
        borderRadius: "0",
        height: "4.1rem",
        width: "4rem",
        display: "flex",
        marginLeft: "0.2rem",
        overflow: "hidden",

        "&:hover": {
            backgroundColor: colorMode === 'dark' ? colors.primary[400] : colors.primary[800],
        },
    }

    const handlePopoverClose = () => {
        setAnchorElement(null);
    };

    const onArrowDownButtonHandler = (event) => {
        setIsClicked(false)
        setAnchorElement(event.target.parentNode.parentNode);
    };

    const onButtonClickHandler = (event) => {
        setIsClicked((prev) => !prev);
        onClickAction();
    };

    // open is true if the anchor element is not null, it's used to open the popover
    const open = Boolean(anchorElement);

    return (
        <div>
            <IconButton
                sx={{...customStyle}}
            >

                {/* Icon & Text */}
               <Box
                   onClick={onButtonClickHandler}
                   className={"flex flex-col w-full justify-center"}
               >
                   <div className={`${isClickable? (isClicked? "text-blue-500" : ""): ""}`}>{icon}</div>
                   <div className={"text-xs truncate"}>{text}</div>

               </Box>

                {/* the component contains the icon and if popDown is true it has a popover element activated */}
                {
                    doPopDown &&

                    <Box className={"flex flex-col justify-center h-full"}>
                        < ArrowDropDownOutlinedIcon onClick={onArrowDownButtonHandler} sx={{color: colors.blue[500]}}/>
                    </Box>
                }

            </IconButton>

            {/* Popover if doPopDown is activated */}
            {
                doPopDown &&
                <ViewerPopover
                    open={open}
                    anchorElement={anchorElement}
                    closePopoverHandler={handlePopoverClose}
                    popDownChildren={popDownChildren}
                />
            }

        </div>
    );
};

export default ViewerCustomIconButton;
