import React,{ useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { FaCheckCircle } from 'react-icons/fa';
import { TfiImage, TfiLayoutSlider, TfiVideoClapper, TfiServer, TfiWrite, TfiGallery, TfiLayout } from 'react-icons/tfi';
import { FaRegEdit } from 'react-icons/fa'
import { SiMicrosoftexcel } from 'react-icons/si';
import * as XLSX from 'xlsx';
import Select from 'react-select';
// Mui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DrawerHeader , Drawer } from '../funciones/funcionesDrawer';
import { AppBarHeader } from '../componentesAdmin/AppBarHeader';
import { Menu } from '../componentesAdmin/Menu';
import useGetLogotipos from "../hooks/useGetLogotipos";
import agregarTienda from "../firebase/agregarTienda";
import { uploadBanner } from "../firebase/uploadBanner";
import { uploadLogotipo } from "../firebase/uploadLogotipo";
import useGetTienda from "../hooks/useGetTienda";
import agregarListaDeLogotipos from "../firebase/agregarListaDeLogotipos";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import editarTienda from "../firebase/editarTienda";


import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Radiobutton seleccionar Logotipo
const items = [
  { id: "1", label: "Seleccionar" },
  { id: "2", label: "Subir Logotipo" },
]

const Radio = React.memo(function Radio({
  item,
  checked,
  onChange
}) {
  return (
    <label>
      <input type="radio" value={item.id} checked={checked} onChange={onChange}/>
      {item.label}
    </label>
  );
});

const RadioList = ({ items, value, onChange }) => (
  <div>
    {items.map(item => (
      <Radio
        item={item}
        key={item.id}
        checked={item.id === value}
        onChange={onChange}
      />
    ))}
  </div>
);

// Radiobutton Fin...



export function CrearTienda() {
  const theme = useTheme();

  // Estados de la aplicacion
    // ++++++ Formulario ++++++
  const [nombreTienda, setNombreTienda] = useState(null);
  const [checkLogotipo, setCheckLogotipo] = useState(items[0].id);
  const [fileLogotipo, setFileLogotipo] = useState(null);
  const [urlImgLogotipo, setUrlImgLogotipo] = useState(null);
  const [tipoDeBanner, setTipoDeBanner] = useState('imagen');
  const [urlFileBanner, setUrlFileBanner] = useState(null);
  const [fileBanner, setFileBanner] = useState(null);
  const [preview, setPreview] = useState('carrusel');
  const [productos, setProductos] = useState([]);


  const [openTienda, setOpenTienda] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openLoading, setOpenLoading] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [uidTiendaEdit, setUidTiendaEdit] = useState(null)
  

  // Datos de firebase
  const logos = useGetLogotipos()
  const dataTienda = useGetTienda();

  console.log(urlFileBanner)

  const handleChange = (event) => {
    if(event.target.name === 'nombreTienda'){
      setNombreTienda(event.target.value);
    }
      
  }
  const onChange = React.useCallback(
    e => setCheckLogotipo(e.target.value),
    []
  );
  const handleChangeFile = (e) => {
    if(e.target.name === 'logotipo'){
      setFileLogotipo(e.target.files[0])
      setUrlImgLogotipo(URL.createObjectURL(e.target.files[0]))

    }else if(e.target.name === 'file-banner'){
      setFileBanner(e.target.files[0])
      setUrlFileBanner(URL.createObjectURL(e.target.files[0]))
      setPreview('perfil')
    }
  }

  const handleClick = (event) => {
    if(event.target.name === 'imgLogotipo'){
      setUrlImgLogotipo(event.target.dataset.url);
    }else if(event.target.name === 'btn-crear-tienda'){
      cleanData()
    }
  }

  // Toggle para tipo de banner
  const handleBanner = (event, newValorTipoDeBanner) => {
    setTipoDeBanner(newValorTipoDeBanner);
    setUrlFileBanner(null)
        
  };

  // Toggle para el preview
  const handleChangeToggle = (event, newToogle) => {
    setPreview(newToogle);
  };

  // Leer archivo para cargar productos
  const readExcel = (file) =>{
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
            const buffeArray = e.target.result;
            const wb = XLSX.read(buffeArray, {type: 'buffer'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data=XLSX.utils.sheet_to_json(ws);
            resolve(data);
        };
        fileReader.onerror = (error) => {
            reject(error)
        };
    });

    promise.then((d) => {
        setProductos(d);
    });
  };

  // Layout array enviar
  const dataSend = {
    nombreTienda: nombreTienda,
    logotipo: urlImgLogotipo,
    banner: urlFileBanner,
    productos: productos,
    // posicion: selectedOption.value,
    formatoBanner: tipoDeBanner
  }
// Layout array editado
  const dataEdit = {
    uidTienda: uidTiendaEdit,
    nombreTienda: nombreTienda,
    logotipo: urlImgLogotipo,
    banner: urlFileBanner,
    productos: productos,
    // posicion: 3,
    formatoBanner: tipoDeBanner
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(nombreTienda === null || nombreTienda === ''){
      Swal.fire('Error!','Tienes que colocar el nombre de la tienda!','error')
    }else if(urlImgLogotipo === null || urlImgLogotipo === ''){
      Swal.fire('Error!','No has seleccionado un logotipo!','error')
    }else if(urlFileBanner === null || urlFileBanner === ''){
      Swal.fire('Error!','No has seleccionado el banner!','error')
    }else if(productos.length < 1){
      Swal.fire('Error!','No has seleccionado los productos a mostrar!','error')
    }else{
      if(uidTiendaEdit != null){
        setOpenLoading(true)
        try {
          editarTienda(dataEdit);
          setOpenLoading(false);
          cleanData();
          setUidTiendaEdit(null)
          Swal.fire(
            'Ok!',
            'Se edito correctamente!',
            'success'
          )
        } catch (error) {
          console.log(error)
        }
              
      }else{
        setOpenLoading(true)
        try {
          const urlLogotipo = checkLogotipo === '2' && fileLogotipo != null ? await uploadLogotipo(fileLogotipo) : null
          const urlBanner = await uploadBanner(fileBanner)
          const nameShop = nombreTienda
          checkLogotipo === '2' && fileLogotipo != null ? await agregarListaDeLogotipos({nameShop, urlLogotipo}) : null
          await agregarTienda({dataSend, urlBanner, urlLogotipo})
          setOpenLoading(false)
          cleanData()
          Swal.fire('Ok!','Se agrego correctamente la tienda!','success')
        } catch (error) {
          console.log(error)
        }
      }
    }    
  }

  const cleanData = () => {
    setNombreTienda('')
    setUrlImgLogotipo(null);
    setTipoDeBanner('imagen');
    setFileBanner(null);
    setProductos([]);
    setPreview('carrusel')
  }

  const handleClickOpen = () => {
    setOpenTienda(true);
  };

  const handleClose = () => {
    setOpenTienda(false);
  };

  const handleEditTienda = (event) => {
    setEdit(true);
    setUidTiendaEdit(event.target.dataset.uid);
    setOpenTienda(false);
  }

  const handleDeleteTienda = async(event) => {
    setOpenTienda(false)
    Swal.fire({
      title: 'Deseas eliminar la tienda?',
      text: "Al eliminar ya no se tendra información de esta tienda!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "tiendasOnline", event.target.dataset.uid))
        Swal.fire('Eliminada!','Se elimino satisfactoriamente.','success')
      }
    })
  }

  const llenarDatosEdit = () => {
    if(uidTiendaEdit != null){
      const dat = dataTienda.filter((item) => item.uidTienda === uidTiendaEdit);
      setNombreTienda(dat[0].nombreTienda);
      setUrlImgLogotipo(dat[0].logotipo);
      setUrlFileBanner(dat[0].banner);
      setProductos(dat[0].productos);
    }
  }

  useEffect(() => {
    llenarDatosEdit();
  }, [uidTiendaEdit])


  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarHeader open={open} setOpen={setOpen}/>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
              <Menu open={open} setOpen={setOpen}/>
        </Drawer>
        <Box component="main">
          <div className="container-admin">
            {
              uidTiendaEdit != null ? <button className="btn-modal" name="btn-crear-tienda" onClick={handleClick}>+ Crear Tienda</button> : ''
            }
            
            <button className="btn-modal" onClick={handleClickOpen}>Tiendas Virtuales</button>

            <section className="wrap-columns">
              <article className="columna-editor">
                <form onSubmit={handleSubmit}  className='formularios-editores'>

                  <div className="contenedor-card-editor">
                    <h3 className="title-modulo">Configuración de nombre de tienda</h3>
                    <input type='text' name='nombreTienda' placeholder='Nombre de la tienda' value={nombreTienda} onChange={handleChange} className="name-shop"/>
                  </div>

                  <div className="contenedor-card-editor">
                    <h3 className="title-modulo">Configuración de Logotipo</h3>
                    <RadioList
                      items={items}
                      value={checkLogotipo}
                      onChange={onChange}
                    />
                    {
                      checkLogotipo === '1'
                      ?
                      <div className="lista-logotipos">
                        {
                          logos.map(({url}) => <img src={url} className="img-logotipo-list" key={url} name='imgLogotipo' data-url={url} onClick={handleClick}/>)
                        }
                      </div>
                      :
                      <label className='input-file-multimedia' onChange={handleChangeFile} >
                        <div>
                          <p>{urlImgLogotipo != null ? <FaCheckCircle className='icon-check-pvw'/> : <TfiImage /> } Cargar logotipo de laboratorio </p>
                          <input hidden multiple type="file" name='logotipo' accept="image/*" />
                        </div>
                      </label>
                      
                    }
                    
                  </div>

                  <div className="contenedor-card-editor">
                    <h3 className="title-modulo">Configuración de banner</h3>
                    <ToggleButtonGroup
                      color="primary"
                      value={tipoDeBanner}
                      exclusive
                      onChange={handleBanner}
                      aria-label="text alignment"
                    >
                      <ToggleButton value="imagen" size="medium" aria-label="imagen">
                        📷
                      </ToggleButton>
                      <ToggleButton value="video" size="medium" aria-label="video">
                        🎬
                      </ToggleButton>
                    </ToggleButtonGroup>
                    {
                      tipoDeBanner === 'imagen'
                      ?
                      <label className='input-file-multimedia' onChange={handleChangeFile} >
                        <div>
                          <p>{urlFileBanner != null ? <FaCheckCircle className='icon-check-pvw'/> : <TfiLayoutSlider />} Cargar Imagen (1600 x 400) </p>
                          <input hidden multiple type="file" name='file-banner' accept="image/*"/>
                        </div>
                      </label>

                      :
                      <label  className='input-file-multimedia' onChange={handleChangeFile}>
                        <div>
                          <p>{urlFileBanner != null ? <FaCheckCircle className='icon-check-pvw'/> : <TfiVideoClapper />} Cargar Video (1600 x 400)</p>
                          <input hidden multiple type="file" name='file-banner' accept="video/*" />
                        </div>
                      </label>
                    }
                  </div>

                  <div className="contenedor-card-editor">
                    <h3 className="title-modulo">Configuración de productos</h3>
                    <label className='btn-importar-pvw' onChange={(e) => {const file = e.target.files[0]; readExcel(file);}}>
                      <SiMicrosoftexcel />
                      <span>Importar archivo</span>
                      <input hidden accept=".xlsx" multiple type="file" />
                    </label>
                    {
                      productos.length > 0 ? <p>Total de productos registrados ({productos.length} pzs)</p> : ''
                    }
                  </div>
                  
                  <button className="btn-send">{uidTiendaEdit === null ? 'Publicar Tienda' : 'Editar información'}</button>
                </form>
              </article>

              <article className="columna-previa">
                <div className='cabecera-preview'>
                  <h4>Vista previa</h4>
                  <ToggleButtonGroup
                    value={preview}
                    exclusive
                    onChange={handleChangeToggle}
                    aria-label="text alignment"
                  >
                    <ToggleButton size="small" value="carrusel" aria-label="left aligned">
                      <TfiGallery  className='toggle-icon'/>
                    </ToggleButton>
                    <ToggleButton size="small" value="perfil" aria-label="centered">
                      <TfiLayout  className='toggle-icon'/>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                
                {
                  preview === 'carrusel'
                  ?
                  <div className='container-preview-carrusel'>
                    <div className='pvw-columna-izquierda'>
                      <h3>Los mejores productos de</h3>
                      <div className='pvw-imagen'>
                        {
                          urlImgLogotipo === null
                          ?<Stack spacing={1}>
                            <Skeleton variant="circular" width={100} height={100} />
                          </Stack>
                          :<img src={urlImgLogotipo}/>
                        }
                        
                      </div>
                      <button>Ver mas productos</button>
                    </div>
                    <div className='pvw-columna-carrusel'>
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={180} height={280} />
                      </Stack>
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={180} height={280} />
                      </Stack>
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={180} height={280} />
                      </Stack>
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={180} height={280} />
                      </Stack>
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={180} height={280} />
                      </Stack>
                    </div>
                  </div>
                  :
                  <div className='pvw-perfil'>
                    <React.Fragment>
                      {
                        urlFileBanner === null
                        ?
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={'100%'} height={240} />
                        </Stack>
                        :
                        <>
                          {
                            tipoDeBanner === 'imagen'
                            ?
                            <div className='banner-img'>
                              <img src={urlFileBanner}/>
                            </div>
                            :
                            <div className='banner-video'>
                                <video loop autoPlay muted>
                                    <source src={urlFileBanner} type="video/mp4" />
                                </video>
                            </div>
                          }
                        </>
                      }
                      
                    </React.Fragment>
                    <div className='pvw-container-cards'>
                      <div className='pvw-container-avatar'>
                        <div className='pvw-avatar'>
                          {
                            urlImgLogotipo === null
                            ?
                            <Stack spacing={1}>
                              <Skeleton variant="circular" width={120} height={120} />
                            </Stack>
                            : <img src={urlImgLogotipo}/>
                          }
                        </div>
                        {
                          nombreTienda === ''
                          ?
                          <Stack spacing={1}>
                            <Skeleton variant="rectangular" width={100} height={20} />
                          </Stack>
                          : <h3>{nombreTienda}</h3>
                        }
                        
                      </div>

                      <div className='pvw-cards'>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={120} height={190} />
                        </Stack>
                        
                      </div>
                    </div>
                  </div>
                }
              </article>
            </section>

            <Dialog
                open={openTienda}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth='md'
                maxWidth='md'
              >
              <DialogTitle>{"Tiendas Virtuales"}</DialogTitle>
              <DialogContent>
                <section className="container-cards-tiendas">
                {
                  dataTienda.map(({uidTienda, nombreTienda, logotipo, posicion, productos}) => {
                    return(
                      <div className="card-tiendas" key={uidTienda}>
                        <img src={logotipo}/>
                        <h3>{nombreTienda}</h3>
                        <p>Posicion: {posicion} | Productos: {productos.length}</p>
                        <div className="container-botones">
                          <button className="btn-editar" data-uid={uidTienda} onClick={handleEditTienda}>Editar</button>
                          <button className="btn-eliminar" data-uid={uidTienda} onClick={handleDeleteTienda}>Eliminar</button>                          
                        </div>
                      </div>
                    )
                  })
                }
                </section>
                
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
              </DialogActions>
            </Dialog>
          </div>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Box>
  )
}
