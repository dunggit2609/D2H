import React, { useEffect, useState } from 'react';
import './styles.scss'
import DialogSlide from "components/DialogSlide";
import { useTranslation } from "react-i18next";
import ResultInputForm from 'features/Course/components/ResultInputForm'
import { RESULT_TYPE_IMAGE, RESULT_TYPE_INPUT } from 'features/Course/constant/resultType';
import { uploadToServer } from 'core/helper/uploadToServer'
import DropzoneUpload from 'components/DropzoneUpload'
function InputResultPopup(props) {
    const { isOpen, handleClose, type, index, onChange } = props
    const [data, setData] = useState([])
    const [popupTitle, setPopupTitle] = useState('')

    const { t } = useTranslation()

    const dropzoneConfig = {
        filesLimit: 5,
        showPreviews: true,
        showPreviewsInDropzone: false,
        showFileNamesInPreview: true,
        previewText: ""
    }

    const handleChangeFile = (values) => {

        const dummy = values.map(v => v.url)
        setData(dummy)
    }


    useEffect(() => {
        switch (type) {
            case RESULT_TYPE_IMAGE:
                setPopupTitle(t("create_test.upload_result"))
                break
            case RESULT_TYPE_INPUT:
                setPopupTitle(t("create_test.input_result"))
                break
            default:
                setPopupTitle('')

        }
    }, [type]);

    return (
        <div>
            <DialogSlide
                component={

                    type === RESULT_TYPE_IMAGE ? <>
                        <DropzoneUpload config={dropzoneConfig} onChange={handleChangeFile} />
                    </> : type === RESULT_TYPE_INPUT ? <> <ResultInputForm /> </> : <> </>
                }
                openStatus={isOpen}
                handleCloseDialog={handleClose}
                dialogTitle={popupTitle}
            />
        </div>
    );
}

export default InputResultPopup;