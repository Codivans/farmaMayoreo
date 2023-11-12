import React,{ useState, useEffect } from 'react'
import { uploadFileLogotipo } from "./../firebase/uploadImgLogotipos";
import { uploadBannerImg } from "./../firebase/uploadBannerImg";
import agregarLaboratorio from '../firebase/agregarLaboratorio';
import { TfiImage, TfiLayoutSlider, TfiVideoClapper, TfiGallery, TfiLayout } from 'react-icons/tfi';
import { FaCheckCircle } from 'react-icons/fa'
import * as XLSX from 'xlsx';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import { SiMicrosoftexcel } from 'react-icons/si';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useGetLaboratoriosFront from '../hooks/useGetLaboraoriosFront';
import useGetLaboratorio from '../hooks/useGetLaboratorio';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export function AdminLaboratorios() {
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [fileLogotipo, setFileLogotipo] = useState(null);
  const [fileBannerImg, setFileBannerImg] = useState(null);
  const [fileBannerVideo, setFileBannerVideo] = useState(null);
  const [urlImgLogotipo, setUrlImgLogotipo] = useState(null);
  const [urlBannerImg, setUrlBannerImg] = useState(null);
  const [urlBannerVideo, setUrlBannerVideo] = useState(null);
  const [productos, setProductos] = useState([]);
  const [idLaboratorio, setIdLaboratorio] = useState(null)
  const [data, setData] = useState({
    laboratorio: '',
    displayName: '',
    lugar: '',
    showBanner: 'imagen',
    productos: ''
  });
  const dataItems = useGetLaboratoriosFront()
  const [preview, setPreview] = useState('carrusel');
  

  const handleChangeToggle = (event, newToogle) => {
    setPreview(newToogle);
  };

  const limpiarFormulario = () =>{
    setData({
      laboratorio: '',
      displayName: '',
      lugar: '',
      showBanner: '',
      productos: ''
    })
    setProductos([])
    setUrlBannerImg(null)
    setUrlBannerVideo(null)
    setUrlImgLogotipo(null)
    fileLogotipo(null)
    fileBannerImg(null)
    fileBannerVideo(null)
    setPreview('carrusel')
  }

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    const valores = {
      ...data,
      [name]: value,
    };
    setData(valores);
  }

  const handleSubmit = async (e) => {
    // let loading = document.getElementById('wrap-loading');
    // loading.style.display = 'flex'
    setOpenLogin(true)
    e.preventDefault();
    try {
      const url = await uploadFileLogotipo(fileLogotipo)
      const urlBannerImagen = await uploadBannerImg(fileBannerImg)
      await agregarLaboratorio({data, url, idLaboratorio, urlBannerImagen, productos, urlImgLogotipo, urlBannerImg })
      // loading.style.display = 'none'
      setOpenLogin(false)
      limpiarFormulario()
      

    } catch (error) {
      console.log('Esta es el error:',error)
    } 

       
  }

  const handleChangeFile = (e) => {
    if(e.target.name === 'logotipo'){
      setFileLogotipo(e.target.files[0])
      setUrlImgLogotipo(URL.createObjectURL(e.target.files[0]))
    }else if(e.target.name === 'bannerImg'){
      setFileBannerImg(e.target.files[0])
      setUrlBannerImg(URL.createObjectURL(e.target.files[0]))
      setPreview('perfil')
    }else if(e.target.name === 'bannerVideo'){
      setPreview('carrusel')
      setFileBannerVideo(e.target.files[0])
      setUrlBannerVideo(URL.createObjectURL(e.target.files[0]))
      setPreview('perfil')
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeProducts = (event) => {
    const { target } = event;
    const { name, value } = target;
    const valores = {
      ...data,
      [name]: value,
    };
    setData(valores);
    
    if(event.target.value === 'escoger'){
      setOpen(true)
    }else{
      setOpen(false)
    }
  }


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




  const handleClick = (id) => {
    setIdLaboratorio(id)
  }

  const itemLaboratorio = useGetLaboratorio(idLaboratorio);

  console.log(itemLaboratorio, urlBannerImg)

  useEffect(() => {
    const writeData = () => {
      if(itemLaboratorio.length > 0){
        setUrlImgLogotipo(itemLaboratorio[0].logotipo);
        setUrlBannerImg(itemLaboratorio[0].bannerImg);
        setProductos(itemLaboratorio[0].productos);
        setData({
          laboratorio: itemLaboratorio[0].Laboratorio,
          displayName: itemLaboratorio[0].DisplayName,
          lugar: itemLaboratorio[0].lugar,
          showBanner: itemLaboratorio[0].showBanner,
          productos: itemLaboratorio[0].productos.length > 0 ? 'escoger' : 'default'
        })
      }else{
        setUrlImgLogotipo(null);
        setUrlBannerImg(null)
      }
    }

    writeData()
  }, [itemLaboratorio])




  const handleOption = (event) => {

    if(event.target.name === 'btnLimpiarFormulario'){
      limpiarFormulario()
    }
  }
  
 


  return (
    <div>
      <nav className='nav-admin'>
        <ul>
          <li>
              <Link to="#">Pedidos Online</Link>
              <ul>
                <li><Link to='/'>Bandeja de pedidos</Link></li>
              </ul>
          </li>
          <li>
              <Link to="#">Marketing</Link>
              <ul>
                <li><Link to='/'>Perfil Laboratorios</Link></li>
                <li><Link to='/'>Banner princial</Link></li>
                <li><Link to='/'>Banners chicos</Link></li>
              </ul>
          </li>
        </ul>
      </nav>
      <main className='wrap'>

        <article className='container-laboratorios' id='container-laboratorios'>
          {
            dataItems.map(({logotipo, displayName, id}) => {
              return(
                <div className='container-labs-img' key={id}>
                  <img src={logotipo} alt={displayName} onClick={() => handleClick(id)} className={`${idLaboratorio != null ? idLaboratorio != id ? 'imgBlur' : '' : ''}`}/>
                </div>
              )
            })
          }
        </article>

        <section className='columnas-de-edicion'>
          <article className='columna-formulario'>
            <div className='botonera-pvw'>
              <button className='btnPrincipal btnDisabled' name='btnLimpiarFormulario' onClick={handleOption}>Limpiar Formulario</button>
            </div>
            
            <form onSubmit={handleSubmit} onChange={handleChange} className='formularios-editores'>

              <details>
                <summary>Configurar nombre de laboratorio</summary>

                <select name='laboratorio' value={data.laboratorio}>
                  <option value='null'>Selecciona un laboratorio</option>
                  <option value='BDF MEXICO'>BDF MEXICO</option>
                  <option value='AMSTRONG'>AMSTRONG</option>
                  <option value='WESER PHARMA'>WESER PHARMA</option>
                  <option value='PISA FARMA'>PISA</option>
                  <option value='COLGATE'>COLGATE</option>
                  <option value='AMSA'>AMSA</option>
                  <option value='RB - HEALTH RECKIT'>RECKITT</option>
                  <option value='BAYER'>BAYER</option>
                  <option value='PFIZER'>PFIZER</option>
                </select>

                <input type='text' name='displayName' placeholder='Nombre de tienda' value={data.displayName} onChange={handleChange} />

                <select name='lugar' value={data.lugar}>
                  <option value='null'>Selecciona una posición</option>
                  <option value='1'>1Er lugar ⭐⭐⭐⭐⭐</option>
                  <option value='2'>2Do lugar ⭐⭐⭐⭐</option>
                  <option value='3'>3Er lugar ⭐⭐⭐</option>
                  <option value='4'>4To lugar ⭐⭐</option>
                  <option value='5'>5To lugar ⭐</option>
                </select>
              </details>

              <details>
                <summary>Archivos Multimedia</summary>

                <div className='pvw-multimedia'>
                  <label className='input-file-multimedia' onChange={handleChangeFile} >
                    <div>
                      <p>{urlImgLogotipo != null ? <FaCheckCircle className='icon-check-pvw'/> : <TfiImage /> } Cargar logotipo de laboratorio </p>
                      <input hidden multiple type="file" name='logotipo' accept="image/*" />
                    </div>
                  </label>
                  <label>Tipo de banner en perfil</label>
                  <select name='showBanner' value={data.showBanner}>
                    <option value='imagen'>📷 Imagen 1600 x 400</option>
                    <option value='video'>🎬 Video</option>
                  </select>
                  {
                    data.showBanner === 'imagen' || data.showBanner === ''
                    ?
                    <label className='input-file-multimedia' onChange={handleChangeFile} >
                      <div>
                        <p>{urlBannerImg != null ? <FaCheckCircle className='icon-check-pvw'/> : <TfiLayoutSlider />} Cargar banner (Imagen 1600 x 400) </p>
                        <input hidden multiple type="file" name='bannerImg' accept="image/*"/>
                      </div>
                    </label>                                  
                    :
                    <label  className='input-file-multimedia' onChange={handleChangeFile}>
                      <div>
                        <p>{urlBannerVideo != null ? <FaCheckCircle className='icon-check-pvw'/> : <TfiVideoClapper />} Cargar banner (Video)</p>
                        <input hidden multiple type="file" name='bannerVideo' accept="video/*" />
                      </div>
                    </label>
                  }
                </div>
              </details>
              <details>
                <summary>Seleccionar productos</summary>
                <select name='productos' onChange={handleChangeProducts} >
                  <option value='null'>Selecciona una opción</option>
                  <option value='default'>Mostrar productos de BD</option>
                  <option value='escoger'>Mostrar productos Importados</option>
                </select>

                {
                  productos.length > 0 ? <p className='pvw-text'>Total de productos: ({productos.length})</p> : ''
                }
              </details>
            
              <button>Guardar</button>
            </form>
          </article>

          <article className='columna-vista-previa'>
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
            <div className='container-preview'>
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
                      data.showBanner != 'imagen'
                      ?
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={'100%'} height={240} />
                      </Stack>
                      :
                      <>
                        {
                          data.showBanner === 'imagen'
                          ?
                          <div className='banner-img'>
                            <img src={urlBannerImg}/>
                          </div>
                          :
                          <div className='banner-video'>
                              <video loop autoPlay muted>
                                  <source src={urlBannerVideo} type="video/mp4" />
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
                        data.displayName === ''
                        ?
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width={100} height={20} />
                        </Stack>
                        : <h3>{data.displayName}</h3>
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
            </div>
          </article>
        </section>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth='md'
          maxWidth='md'
      >
          <DialogTitle>{"Importar productos"}</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

              <label className='btn-importar-pvw' onChange={(e) => {const file = e.target.files[0]; readExcel(file);}}>
                  <SiMicrosoftexcel />
                  <span>Importar archivo</span>
                  <input hidden accept=".xlsx" multiple type="file" />
              </label>

              {
                productos.length > 0
                ?
                <table className='tabla-dialogo'>
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productos.map(({codigo, nombre}) => {
                        return(
                          <tr>
                            <td>{codigo}</td>
                            <td>{nombre}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                :''
              }
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
      </Dialog>



      </main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLogin}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <div id="wrap-loading">
        <CircularProgress />
      </div> */}
    </div>
  )
}
