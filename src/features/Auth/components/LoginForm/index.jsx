import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Container,
  Icon,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { LockOpenRounded } from "@material-ui/icons";
import DialogSlide from "components/DialogSlide";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
import { _LIST_LINK } from "constant/config";
import { loadCSS } from "fg-loadcss";
import { UseSpinnerLoading } from "hooks/useSpinnerLoading";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import "./styles.scss";
LoginForm.propTypes = {
  OnSubmit: PropTypes.func.isRequired,
};

function LoginForm(props) {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const handleLoginFBClick = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t("yupValidate.emailWrongFormat"))
      .email(t("yupValidate.emailWrongFormat")),
    password: yup
      .string()
      .required(t("yupValidate.passwordRequired"))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        t("yupValidate.passWordWrongFormat")
      ),
  });
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleOnSubmit = async (values) => {
    const { OnSubmit } = props;
    if (OnSubmit) {
      await OnSubmit(values);
    }
    form.reset();
  };
  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <div className="container">
      <Container maxWidth="xs" className="mainBox mainBox--loginBox">
        <div className="authSubmitting">
          {isSubmitting && <LinearProgress color="secondary" />}
        </div>

        <Avatar className="mainBox__avatar">
          <LockOpenRounded />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          className="mainBox__title--auth"
        >
          {t("auth.authTitle.login")}
        </Typography>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <InputField
            name="email"
            label={t("auth.authField.email")}
            form={form}
            disabled={false}
          />

          <PasswordField
            name="password"
            label={t("auth.authField.password")}
            form={form}
            disable={false}
          />

          <Button
            color="secondary"
            className="mainBox__submitButton"
            variant="contained"
            fullWidth
            type="submit"
          >
            {t("auth.authButton.loginButton")}
          </Button>
        </form>
        <div className="mainBox__buttonArea">
          <Button
            component={RouterLink}
            to={_LIST_LINK.register}
            className="mainBox__iconSign"
            variant="contained"
            fullWidth
          >
            <span>{t("auth.authButton.noAccount")}</span>
          </Button>
          <Button
            onClick={handleLoginFBClick}
            className="mainBox__iconSign"
            variant="contained"
            fullWidth
          >
            <Icon className="mainBox__icon fab fa-facebook" color="secondary" />
            <span>{t("auth.authButton.loginByFb")}</span>
          </Button>
        </div>
        <DialogSlide
          openStatus={openDialog}
          handleCloseDialog={handleDialogClose}
          dialogTitle={t("auth.dialog.dialogLoginFb")}
        />
      </Container>
    </div>
  );
}

export default LoginForm;
