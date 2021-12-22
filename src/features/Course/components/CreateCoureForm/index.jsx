import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import InputField from 'components/FormControl/InputField';
import './styles.scss'
import { Button } from '@material-ui/core';
CreateCourseForm.propTypes = {

};

function CreateCourseForm(props) {
    const { handleNextStep } = props

    const { t } = useTranslation()
    const schema = yup.object().shape({
        courseName: yup
            .string()
            .required(t("yupValidate.required_field")),
        //  generate handle
        courseCode: yup
            .string()
            .required(t("yupValidate.required_field"))

    });
    const form = useForm({
        defaultValues: {
            courseName: "",
            courseCode: "",
        },
        resolver: yupResolver(schema),
    });
    // const { isSubmitting } = form.formState;
    const handleOnSubmit = async (values) => {
        handleNextStep()
        form.reset();
    };
    return (


        <div className="create-course__body">
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                <section className="course-info__form">
                    <div className="course-code">
                        <InputField
                            name="courseCode"
                            label={t("create_course.course_code")}
                            form={form}
                            disabled={false}
                        />
                    </div>
                    <div className="course-name">
                        <InputField
                            name="courseName"
                            label={t("create_course.course_name")}
                            form={form}
                            disabled={false}
                        />
                    </div>

                </section>
                <section className="course-info__submit">
                    <Button
                        color="primary"
                        className="mainBox__submitButton"
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        {t("button.next_step")}
                    </Button>
                </section>
            </form>


        </div>
    );
}

export default CreateCourseForm;