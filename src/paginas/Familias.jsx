import { HeaderMenu } from './../componentes/HeaderMenu';
import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import { getProductosPorFamiliaRequest } from '../api/apiFarmaMayoreo';
import { Card } from './../componentes/Card';
import ReactPaginateProps from 'react-paginate';
import { Footer } from '../componentes/Footer';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SkeletonMenu, SkeletonCards } from './../componentes/Skeleton';

export function Familias(){
    const [productos, setProductos] = useState([]);
    const [arrayProductos, setarrayProductos] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [depa, setDepa] = useState('')
    let { familia } = useParams();
    const [loading, setLoading] = useState(false)

    const getProductosPorFamilia = async () =>{
        const res = await getProductosPorFamiliaRequest(familia)
        setLoading(true)
        setProductos(res.data)
        setarrayProductos(res.data)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        getProductosPorFamilia()

    }, [familia]);


    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    const getFamilias = productos.map(data => data.familia);
    const familias = [... new Set(getFamilias)];

    let arraySubMenu = [];

    familias.forEach((familia) => {
        const buscarFamilias = productos.filter((item) => item.familia === familia)
        const addArraySubMenu = { familia: familia}
        if(buscarFamilias){
            addArraySubMenu.departamentos = buscarFamilias.map(item => item.departamento).filter(onlyUnique).map(departamento => departamento)
        }
        arraySubMenu.push(addArraySubMenu)
    })



    const handleClick = ({departamento}) => {
        setarrayProductos(productos.filter((item) => item.departamento === departamento))
        setDepa(departamento)
        setPageNumber(0)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    const usersPerPage = 60
    const pagesVisited = pageNumber * usersPerPage

    let arrayProductoFinal = arrayProductos.length > 0 ? arrayProductos : productos
    
    const displayUsers = arrayProductoFinal
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map(({codigo, nombre, precio, departamento, existencia, descripcion, piezasdeoferta, preciofijo, tipooferta}) => {
        return(
          <Card 
            key={codigo}
            codigo={codigo}
            nombre={nombre}
            precio={precio}
            departamento={departamento}
            existencia={existencia}
            descripcion={descripcion}
            piezasdeoferta={piezasdeoferta}
            preciofijo={preciofijo}
            tipooferta={tipooferta}
          />
        );
      });
  
    const pageCount = Math.ceil(arrayProductoFinal.length / usersPerPage);
    
    const changePage = ({selected}) => {
        setPageNumber(selected);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
    }

    return(
        <>
            <HeaderMenu />
            <main className='wrap-productos'>
                <div className='container-columns'>
                    <div className='submenu'>
                        <Paper sx={{ width: '100%', maxWidth: '100%', margin: '8px 0px', height: '100%'}}>
                            <MenuList>
                                {
                                    arraySubMenu.length > 0
                                    ? arraySubMenu.map(({familia, departamentos}) => {
                                        return(
                                            <>
                                                <h4 className='title-menu'>{familia}</h4>
                                                {
                                                    departamentos.map((departamento) => {
                                                        return(
                                                            <MenuItem  className='list-item-menu' onClick={() => handleClick({departamento})}>
                                                                <ListItemText>{departamento}</ListItemText>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <ArrowForwardIosIcon />
                                                                </Typography>
                                                            </MenuItem>
                                                        )
                                                    })
                                                }
                                            </>   
                                        )

                                    })
                                    : <SkeletonMenu />
                                }                                
                            </MenuList>
                        </Paper>
                    </div>
                    <div className='contenedor-productos'>
                        <div className='grid-cards'>
                            {arrayProductoFinal.length === 0 ? <SkeletonCards /> : displayUsers}
                        </div>
                        <ReactPaginateProps 
                            previousLabel={"Anterior"}
                            nextLabel={"Siguiente"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previusBtn"}
                            nextLinkClassName={"nextBtn"}
                            disabledClassName={"paginatioDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}