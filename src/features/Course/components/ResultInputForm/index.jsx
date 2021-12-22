import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Radio } from '@material-ui/core';
import './styles.scss'
ResultInputForm.propTypes = {

};

function ResultInputForm(props) {
    const [questionAmount, setQuestionAmount] = useState([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50
    ])
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div>
                        No.
                    </div>
                </Grid>
                <Grid item xs={2} className="p-l-24">
                    A
                </Grid>
                <Grid item xs={2} className="p-l-24">
                    B
                </Grid>
                <Grid item xs={2} className="p-l-24">
                    C
                </Grid>
                <Grid item xs={2} className="p-l-24">
                    D
                </Grid>

            </Grid>
            {

                questionAmount.map((item) =>
                    <>
                        <div key={item}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <div>
                                        {item}
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div>
                                        <Radio />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div>
                                        <Radio />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div>
                                        <Radio />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div>
                                        <Radio />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>


                    </>
                )
            }
        </div>
    );
}

export default ResultInputForm;