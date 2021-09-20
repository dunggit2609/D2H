import { ButtonBase, CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//input 1 component được render ở trong dialog,
//openstatus: dialog được mở hay đóng
//handleCloseDialog: trong dialog có nút close, nhấn vào thì đóng dialog lại

export default function DialogSlide({ component: Component, ...rest }) {
  const {
    openStatus,
    handleCloseDialog,
    dialogTitle,
    displayLoadingForm,
    notDisplayCloseButton,
  } = rest;
  const [isRenderComponent, setIsRenderComponent] = useState(false);
  const { t } = useTranslation();
  const handleClose = () => {
    if (!handleCloseDialog) return;
    handleCloseDialog();
  };

  useEffect(() => {
    if (!displayLoadingForm) {
      setIsRenderComponent(true);
      return;
    }
    if (
      displayLoadingForm &&
      isRenderComponent === false &&
      openStatus === true
    )
      setTimeout(() => {
        setIsRenderComponent(true);
      }, 3000);
  });

  return (
    <Dialog
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      fullWidth={true}
      maxWidth="sm"
      open={openStatus}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        {!isRenderComponent && (
          <div className="displayCenterByFlex">
            <CircularProgress />
          </div>
        )}
        {isRenderComponent && !!Component && Component}
      </DialogContent>
      {!notDisplayCloseButton && (
        <DialogActions>
          <ButtonBase
            onClick={handleClose}
            className="btn btn--hoverBottomSpot"
          >
            {t("work-space.dialog.closeButton")}
          </ButtonBase>
        </DialogActions>
      )}
    </Dialog>
  );
}
