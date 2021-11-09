import { ButtonBase, Grid, Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, LanguageOutlined } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import SelectBox from "components/selectBox";
import { listLocalStorage, _LIST_LINK } from "constant/config";
import languageModel from "core/model/languageModel";
import userLoginedModel from "core/model/userLoginedModel";
import ToggleMode from "features/darkMode/components/toggleMode";
import { useFeatureOfMenu } from "hooks/useFeatureOfMenu";
import { useHeaderDisplay } from "hooks/useHeaderDisplay";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import "./styles.scss";

export default function Header() {
  const { t } = useTranslation();
  const {
    handleChooseUserAction,
    handleChooseLng,
    handleUserBoxClose,
    handleUserBoxClick,
    handleLanguageBoxClose,
    handleLanguageBoxClick,
    isLanguageOpen,
    isDisplayAuth,
    isLogin,
    isDisplayHeader,
    isUserAvartaOpen,
  } = useFeatureOfMenu();
  //useDisplay
  const {
    scrollClass,
    isNotDisplayAppTitle,
    handleHamburgerClick,
  } = useHeaderDisplay();
  const curLng = localStorage.getItem(listLocalStorage.language);
  const itemSelected = curLng;
  return (
    <div>
      {isDisplayHeader && (
        <>
          <AppBar position="fixed" color="transparent" className="appBar">
            <Toolbar className={scrollClass}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <div className="toolbar__extraFeature" id="extraFeature">
                    <Tooltip
                      title={t("toolTip.chooseLanguage")}
                      placement="bottom"
                    >
                      <ButtonBase
                        className="btn btn--hoverBottomSpot "
                        onClick={handleLanguageBoxClick}
                      >
                        <LanguageOutlined />
                      </ButtonBase>
                    </Tooltip>
                    <SelectBox
                      handleItemSelected={handleChooseLng}
                      listValue={languageModel}
                      isOpen={isLanguageOpen}
                      handleSelectBoxClose={handleLanguageBoxClose}
                      menuPos={{ vertical: "top", horizontal: "left" }}
                      displayPos={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      selected={true}
                      typeOfSelected={itemSelected}
                    />
                    <ToggleMode></ToggleMode>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  {!isNotDisplayAppTitle && (
                    <>
                      <div className="toolbar__center">
                        <ButtonBase
                          className="btn btn--hoverBottomSpot "
                          color="inherit"
                          component={RouterLink}
                          to={_LIST_LINK.index}
                        >
                          <Typography variant="h4" className="toolbar__title">
                            {t("header.appName")}
                          </Typography>
                        </ButtonBase>
                      </div>
                    </>
                  )}
                </Grid>
                <div className="hamburgerIcon">
                  <ButtonBase
                    className="handleHamburgerClick"
                    onClick={handleHamburgerClick}
                  >
                    <MenuIcon></MenuIcon>
                  </ButtonBase>
                </div>
                <Grid item xs={3}>
                  {isDisplayAuth && !isLogin && (
                    <>
                      <div className="float-right-block">
                        <ButtonBase
                          color="inherit"
                          className="btn btn--hoverBottomSpot "
                          component={RouterLink}
                          to={_LIST_LINK.login}
                          size="medium"
                        >
                          <Typography>
                            {t("auth.authButton.loginButton")}
                          </Typography>
                        </ButtonBase>

                        <Typography className="toolbar__separateIcon">
                          |
                        </Typography>

                        <ButtonBase
                          color="inherit"
                          className="btn btn--hoverBottomSpot "
                          component={RouterLink}
                          to={_LIST_LINK.register}
                          size="medium"
                        >
                          <Typography>
                            {t("auth.authButton.registerButton")}
                          </Typography>
                        </ButtonBase>
                      </div>
                    </>
                  )}
                  {isLogin && (
                    <>
                      <div className="float-right-block">
                        <Tooltip
                          title={t("toolTip.userAction")}
                          placement="bottom"
                        >
                          <ButtonBase
                            className="btn btn--hoverBottomSpot "
                            onClick={handleUserBoxClick}
                          >
                            <AccountCircle />
                          </ButtonBase>
                        </Tooltip>
                        <SelectBox
                          handleItemSelected={handleChooseUserAction}
                          listValue={userLoginedModel}
                          isOpen={isUserAvartaOpen}
                          handleSelectBoxClose={handleUserBoxClose}
                          menuPos={{ vertical: "top", horizontal: "right" }}
                          displayPos={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          selected={true}
                        />
                      </div>
                    </>
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </>
      )}
    </div>
  );
}
