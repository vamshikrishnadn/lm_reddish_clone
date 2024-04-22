import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDialogStyles } from '../../styles/muiStyles';
import generateBase64Encode from '../../utils/genBase64Encode';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewProduct,
  deleteProductDetails,
  editProductDetails,
  getAllProducts,
} from '../../reducers/postCommentsReducer';
import LoadingSpinner from '../LoadingSpinner';
import moment from 'moment';

const MarketPlace = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [edit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  console.log('🚀 ~ MarketPlace ~ editProduct:', editProduct);
  console.log('🚀 ~ MarketPlace ~ values:', values);

  const classes = useDialogStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state?.postComments?.products);
  const user = useSelector(state => state?.user);
  console.log('🚀 ~ MarketPlace ~ user:', user);
  console.log('🚀 ~ MarketPlace ~ products:', products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const setImageValues = (name, base64) => {
    setValues({ ...values, image: base64 });
  };

  const fileInputOnChange = (e, setValues) => {
    const file = e.target.files[0];
    generateBase64Encode(file, setImageValues);
  };

  const handleChange = e => {
    setValues({ ...values, [e.target?.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (edit) {
      await dispatch(editProductDetails(editProduct?.id, values));
    } else {
      await dispatch(createNewProduct(values));
    }

    setEdit(false);
  };

  const handleEditProduct = product => {
    setEdit(true);
    setEditProduct(product);
    setValues({
      title: product?.title,
      description: product?.description,
      image: product?.image,
      email: product?.email,
      phone: product?.phone,
      address: product?.address,
    });
    setOpen(true);
  };

  const handleAddProduct = () => {
    setEdit(false);
    setValues({
      title: '',
      description: '',
      image: '',
      email: '',
      phone: '',
      address: '',
    });
    setOpen(true);
  };

  const handleDeleteProduct = product => {
    if (window.confirm('Are you sure you want to delete this product')) {
      dispatch(deleteProductDetails(product.id));
    }
  };

  return products ? (
    <Container disableGutters maxWidth='xl'>
      <Box component='section' mx={2}>
        <Box component='div' sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}>
          <Typography variant='h5' color='primary' className={classes.title}>
            Products Market
          </Typography>
          <Button
            onClick={handleAddProduct}
            color='primary'
            variant='contained'
            size='small'
            style={{ padding: '0.2em', px: 2, width: 150, marginBottom: 10 }}
          >
            Add Product
          </Button>
        </Box>

        {products && products?.length > 0
          ? products?.map(product => (
              <Paper key={product?._id} style={{ padding: '1rem', marginBottom: 10 }}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Box component='div'>
                      <div style={{ height: '300px' }}>
                        <img
                          alt={product?.title}
                          src={product.image}
                          style={{ width: '90%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box component={'div'}>
                      <Typography variant='h5' className={classes.title}>
                        {product?.title}
                      </Typography>
                      <Typography variant='body1'>
                        <b>Description: </b> {product?.description}
                      </Typography>
                      <Typography variant='body1'>
                        <b>Email: </b> {product?.email}
                      </Typography>
                      <Typography variant='body1'>
                        <b>Phone No: </b> {product?.phone}
                      </Typography>
                      <Typography variant='body1'>
                        <b>Address: </b> {product?.address}
                      </Typography>
                      <Typography variant='body1'>
                        <b>Added on: </b> {moment(product?.createdOn).format('lll')}
                      </Typography>
                    </Box>

                    {user.id == product?.addedBy.id && (
                      <Box style={{ marginTop: 10 }}>
                        <Button
                          onClick={() => handleEditProduct(product)}
                          color='primary'
                          variant='outlined'
                          size='small'
                          style={{
                            padding: '0.2em',
                            px: 2,
                            width: 150,
                            marginBottom: 10,
                            marginRight: 10,
                          }}
                        >
                          Edit Product
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product)}
                          color='primary'
                          variant='outlined'
                          size='small'
                          style={{ padding: '0.2em', px: 2, width: 150, marginBottom: 10 }}
                        >
                          Delete Product
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ))
          : 'No products found'}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
        classes={{ paper: classes.dialogWrapper }}
        fullWidth
      >
        <DialogTitle onClose={handleClose}>{edit ? 'Edit' : 'Add'} Product</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box component={'div'}>
              <TextField
                variant='filled'
                size='small'
                label='Title'
                name='title'
                fullWidth
                required
                onChange={handleChange}
                value={values?.title}
              />
            </Box>
            <Box component={'div'} my={2}>
              <TextField
                variant='filled'
                size='small'
                label='Description'
                name='description'
                fullWidth
                onChange={handleChange}
                required
                value={values?.description}
              />
            </Box>

            <Box component={'div'}>
              <label>Upload Image</label>
              <br />
              <input
                type='file'
                id='image-upload'
                accept='image/*'
                onChange={e => fileInputOnChange(e, setValues)}
                required={edit ? false : true}
                multiple={false}
              />
            </Box>

            <Box component={'div'} my={2}>
              <TextField
                variant='filled'
                size='small'
                label='Phone no'
                name='phone'
                type='number'
                fullWidth
                onChange={handleChange}
                required
                value={values?.phone}
              />
            </Box>

            <Box component={'div'} my={2}>
              <TextField
                variant='filled'
                size='small'
                label='Email'
                name='email'
                type='email'
                fullWidth
                onChange={handleChange}
                required
                value={values?.email}
              />
            </Box>

            <Box component={'div'} my={2}>
              <TextField
                variant='filled'
                size='small'
                label='Address'
                name='address'
                fullWidth
                onChange={handleChange}
                required
                value={values?.address}
              />
            </Box>

            <Button variant='contained' color='primary' type='submit' style={{ marginRight: 10 }}>
              Submit
            </Button>
            <Button variant='contained' sx={{ margin: '0 5px' }} onClick={handleClose}>
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  ) : (
    <Container disableGutters>
      <Paper variant='outlined' className={classes.mainPaper}>
        <LoadingSpinner text={'Fetching post comments...'} />
      </Paper>
    </Container>
  );
};

export default MarketPlace;
