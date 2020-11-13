import React from "react";

//Mui
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({ children, onClick, tip, btnClassName }) => {
  return (
    <Tooltip title={tip}>
      <IconButton color="primary" className={btnClassName} onClick={onClick}>
        {children}
      </IconButton>
    </Tooltip>
  );
};
