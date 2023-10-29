import React from 'react';

import { Grid, Paper, Typography } from '@mui/material';

const DashboardView: React.FC = () => {
    const styles = {
        contentPadding: {
            padding: '20px',
        },
        paperStyle: {
            padding: '20px',
            marginBottom: '20px',
        },
    };

    return (
        <Grid container>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={10}>
                <div style={styles.contentPadding}>
                    <Paper elevation={3} style={styles.paperStyle}>
                        <Typography variant="h6">Section 1</Typography>
                        {/* Komponenty i treść dla sekcji 1 */}
                    </Paper>
                    <Paper elevation={3} style={styles.paperStyle}>
                        <Typography variant="h6">Section 2</Typography>
                        {/* Komponenty i treść dla sekcji 2 */}
                    </Paper>
                </div>
            </Grid>
        </Grid>
    );
};

export default DashboardView;
