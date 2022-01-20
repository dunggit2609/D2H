import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { uploadToServer } from 'core/helper/uploadToServer';
import './styles.scss'
DropzoneUpload.propTypes = {

};

function DropzoneUpload(props) {
    const { config, onChange } = props
    const {filesLimit, showPreviews, showPreviewsInDropzone, showFileNamesInPreview, previewText} = config

    const handleChange = async (files) => {

        if (!files || files.length === 0) {
            return
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].url) {
                continue
            }

            const formData = new FormData();
            formData.append("file", files[i]);
            const url = await uploadToServer(formData)
            console.log(url)
            if (!url) {
                continue
            }
            files[i].url = url

        }
        console.log(files)
        if (!onChange) {
            return
        }

        onChange(files)
       
    }

    return (
        <div>
            <DropzoneArea
                filesLimit={filesLimit}
                onChange={(files) => handleChange(files)}
                showFileNamesInPreview={showFileNamesInPreview}
                showPreviews={showPreviews}
                showPreviewsInDropzone={showPreviewsInDropzone}
                previewText={previewText}
            />
        </div>
    );
}

export default DropzoneUpload;