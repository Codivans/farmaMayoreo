// import { Link } from 'react-router';
import imgMedicamento from './../assets/img/medicamento2.png';
import imgPerfumeria from './../assets/img/perfumeria.png';
import imgBebes from './../assets/img/bebes.png';
import imgEquipos from './../assets/img/equipos.png';
import imgSexual from './../assets/img/sexual.png';


export function MenuIconos(){
    return(
        <>
            <ul className='menu-icons'>
                <li><a href='/familia/medicamento'><img src={imgMedicamento}/><br /> Medicamento</a></li>
                <li><a href='/familia/perfumeria'><img src={imgPerfumeria}/><br /> Perfumeria</a></li>
                <li><a href='/familia/bebes'><img src={imgBebes}/><br /> Bebés</a></li>
                <li><a href='/familia/equipos-y-botiquin'><img src={imgEquipos}/><br /> Equipos y botiquin</a></li>
                <li><a href='/familia/salud-sexual'><img src={imgSexual}/><br /> Salud Sexual</a></li>
            </ul>
        </>
    )
}