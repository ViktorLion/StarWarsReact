import React from 'react';
import { Grid, Skeleton } from '@mui/material';

export const ContentLoading = () => {
    return <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={4}><Skeleton variant="rectangular" height={50} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={2}><Skeleton variant="rectangular" height={15} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={2}><Skeleton variant="rectangular" height={15} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={2}><Skeleton variant="rectangular" height={15} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={2}><Skeleton variant="rectangular" height={15} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={2}><Skeleton variant="rectangular" height={30} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={2}><Skeleton variant="rectangular" height={30} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={100} />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={2}><Skeleton variant="rectangular" height={30} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={100} />
        </Grid>
      </Grid>
}