import { ButtonBase, Tooltip } from "@material-ui/core";
import { Brightness4Outlined } from "@material-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import  './styles.scss'
ToggleMode.propTypes = {};

function ToggleMode(props) {
  const { t } = useTranslation();
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }
  if (!currentTheme) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
  }
    const handleClickToggle = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <div>
      <Tooltip title={t("toolTip.toogleMode")} placement="bottom">
      <ButtonBase className="btn btn--hoverBottomSpot " onClick={handleClickToggle}>
        <Brightness4Outlined />
      </ButtonBase>
      </Tooltip>
      
    </div>
  );
}

export default ToggleMode;
