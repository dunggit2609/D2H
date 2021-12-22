import React, { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import './styles.scss'

function CreateSubmission(props) {
    const [test, setTest] = useState(1)
    return (
        <div>
            <section className="select-test">
                <div className="select-test-item">
                    <InputLabel id="result-type-label">Select test</InputLabel>
                    <Select
                        id="result-type-label"
                        value={test}
                        onChange={(event) => setTest(event.target.value)}
                        className="select"
                    >
                        <MenuItem value={1}>Test 1</MenuItem>
                        <MenuItem value={2}>Test 2</MenuItem>
                        <MenuItem value={3}>Test 3</MenuItem>
                    </Select>

                </div>
                <div className="select-test-code">
                    <InputLabel id="result-type-label">Select test code</InputLabel>
                    <Select
                        id="result-type-label"
                        value={test}
                        onChange={(event) => setTest(event.target.value)}
                        className="select"
                    >
                        <MenuItem value={1}>Test Code 1</MenuItem>
                        <MenuItem value={2}>Test Code 2</MenuItem>
                        <MenuItem value={3}>Test Code 3</MenuItem>
                    </Select>

                </div>
            </section>

            <div className="upload-submission-mage">
                <div className="upload-submission-label">
                    Upload submission
                </div>
                <DropzoneArea
                    multiple
                />
            </div>
        </div>
    );
}

export default CreateSubmission;