import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { uploadToServer } from 'core/helper/uploadToServer';
import { LinearProgress } from '@mui/material';

import './styles.scss'
import { useState } from 'react';
DropzoneUpload.propTypes = {

};

function DropzoneUpload(props) {
    const { config, onChange } = props
    const { filesLimit, showPreviews, showPreviewsInDropzone, showFileNamesInPreview, previewText, acceptedFiles } = config
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = async (files) => {

        if (!files || files.length === 0) {
            return
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].url) {
                continue
            }
            setIsLoading(true)
            const formData = new FormData();
            formData.append("file", files[i]);
            const url = await uploadToServer(formData)
            setIsLoading(false)
            if (!url) {
                continue
            }
            files[i].url = url

        }

        if (!onChange) {
            return
        }

        onChange(files)

    }

    return (
        <div>
            {isLoading && <LinearProgress />}

            <DropzoneArea
                filesLimit={filesLimit}
                onChange={(files) => handleChange(files)}
                showFileNamesInPreview={showFileNamesInPreview}
                showPreviews={showPreviews}
                showPreviewsInDropzone={showPreviewsInDropzone}
                previewText={previewText}
                acceptedFiles={acceptedFiles}
                maxFileSize={10000000}
            />


        </div>
    );
}

export default DropzoneUpload;