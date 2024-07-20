import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v3'; // Update this with your actual API base URL

export const fetchAppointmentsWithAxios = async (tableName) => {
  const response = await axios.get(`${API_BASE_URL}/${tableName}/todos`);
  return response.data;
};

export const fetchCodesWithAxios = async (endpoint) => {
  const response = await axios.get(`http://localhost:8080/api/v3/${endpoint}/codigos`);
  return response.data;
};

export const fetchNextId = async (table) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v3/${table}/nextId`);
    return response.data;
  } catch (error) {
    console.error('Error fetching next ID:', error);
    return null;
  }
};

export const createAppointmentWithAxios = async (table, appointment) => {
  let request = {};
  console.log('Viendo lo que llega:', appointment);
  console.log('Viendo la tabla:', table);
  switch (table) {
    case 'accion':
      request = {
        logAccionesCod: appointment.logAccionesCod,
        accDes: appointment.accDes,
        accEst: 'A',
      };
      break;
    case 'area':
      request = {
        areDes: appointment.areDes,
        areNom: appointment.areNom,
        areEst: 'A',
      };
      break;
    case 'avance':
      request = {
        avaDes: appointment.avaDes,
        duda: appointment.duda,
        avaFec: appointment.avaFec,
        ticketAyuda: appointment.ticketAyuda,
        avaEst: 'A',
      };
      break;
    case 'cargo':
      request = {
        carNom: appointment.carNom,
        cargoDes: appointment.cargoDes,
        carEst: 'A'
      };
      break;
    case 'cooperativa':
      request = {
        cooIden: appointment.cooIden,
        cooNom: appointment.cooNom,
        cooSig: appointment.cooSig,
        cooDir: appointment.cooDir,
        cooTel: appointment.cooTel,
        cooCor: appointment.cooCor,
        cooSlo: appointment.cooSlo,
        cooLog: appointment.cooLog,
        cooEst: 'A',
      };
      break;
    case 'cuenta':
      request = {
        cueNum: appointment.cueNum,
        cueEst: 'A',
      };
      break;
    case 'direccion':
      request = {
        dirDep: appointment.dirDep,
        dirPro: appointment.dirPro,
        dirDis: appointment.dirDis,
        dirEst: 'A',
      };
      break;
    case 'dispositivo':
      request = {
        disNom: appointment.disNom,
        disDirIp: appointment.disDirIp,
        disEst: 'A',
      };
      break;
    case 'funciones':
      request = {
        funDes: appointment.funDes,
        funReq: appointment.funReq,
        manuales: appointment.manuales,
        funEst: 'A',
      };
      break;
    case 'logAcciones':
      request = {
        horaFin: appointment.horaFin,
        logSesionesCod: appointment.logSesionesCod,
        logAccionEst: 'A',
      };
      break;
    case 'logSesiones':
      request = {
        dia: appointment.dia,
        usuario: appointment.usuario,
        dispositivo: appointment.dispositivo,
        logSesionesEst: 'A',
      };
      break;
    case 'manual':
      request = {
        manNom: appointment.manNom,
        manDes: appointment.manDes,
        manEst: 'A',
      };
      break;
    case 'moneda':
      request = {
        monNom: appointment.monNom,
        monEst: 'A',
      };
      break;
    case 'persona':
      request = {
        perIden: (appointment.perNom).substring(0, 1) + (appointment.perApePat).substring(0, 1) + (appointment.perApeMat).substring(0, 1) + (appointment.perFecNac).substring(0, 4) + (appointment.perCor).substring(0, 1),
        perApePat: appointment.perApePat,
        perApeMat: appointment.perApeMat,
        perNom: appointment.perNom,
        perFecNac: appointment.perFecNac,
        perCor: appointment.perCor,
        perFot: appointment.perFot,
        cooperativa: appointment.cooperativa,
        cargo: appointment.cargo,
        perEst: 'A',
      };
      break;
    case 'producto':
      request = {
        proIdent: appointment.proIden,
        proDes: appointment.proDes,
        tasa: appointment.tasa,
        moneda: appointment.moneda,
        socio: appointment.socio,
        proEst: 'A',
      };
      break;
    case 'rol':
      request = {
        rolRol: appointment.rolRol,
        rolNom: appointment.rolNom,
        funciones: appointment.funciones,
        rolEst: 'A',
      };
      break;
    case 'socio':
      request = {
        socIden: appointment.socIden,
        socApePat: appointment.socApePat,
        socApeMat: appointment.socApeMat,
        socNom: appointment.socNom,
        socioFec: appointment.socioFec,
        socCor: appointment.socCor,
        cooperativa: appointment.cooperativa,
        cuenta: appointment.cuenta,
        direccion: appointment.direccion,
        socEst: 'A',
      };
      break;
    case 'solucion':
      request = {
        solNom: appointment.solNom,
        solDes: appointment.solDes,
        solFec: appointment.solFec,
        solEst: 'A',
      };
      break;
    case 'tasa':
      request = {
        tasIden: "T" + (appointment.tasTasa + 100) * 2,
        tasDesc: appointment.tasDesc,
        tasTasa: appointment.tasTasa,
        tasFecIni: appointment.tasFecIni,
        tasFecFin: appointment.tasFecFin,
        tasEst: 'A',
      };
      break;
    case 'ticketAyuda':
      request = {
        descripcion: appointment.descripcion,
        fechaCreacion: appointment.fechaCreacion,
        usuario: appointment.usuario,
        tipSer: appointment.tipSer,
        areCod: appointment.areCod,
        soluciones: appointment.soluciones,
        estCod: 'A',
      };
      break;
    case 'usuario':
      request = {
        usuIde: appointment.usuIde,
        usuUsu: appointment.usuUsu,
        usuPas: appointment.usuPas,
        cooperativa: appointment.cooperativa,
        rol: appointment.rol,
        usuEst: 'A',
      };
      break;
    default:
      console.error('Unknown table:', table);
      return;
  }
  console.log(request);
  try {
    await axios.post(`http://localhost:8080/api/v3/${table}/crear`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Appointment created successfully');
  } catch (error) {
    console.error('Error creating appointment:', error);
  }
};

const updateCompleteEntity = async (table, id, request) => {
  try {
    await axios.put(`http://localhost:8080/api/v3/${table}/${id}`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Entity updated successfully');
  } catch (error) {
    console.error('Error updating entity:', error);
  }
};

const updateEntityState = async (table, id, request) => {
  try {
    await axios.patch(`http://localhost:8080/api/v3/${table}/${id}`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('State updated successfully');
  } catch (error) {
    console.error('Error updating state:', error);
  }
};

export const updateAppointmentWithAxios = async (table, appointmentObtenerCod, appointment, updateStateOnly = false) => {
  let request = {};
  let id;
  switch (table) {
    case 'accion':
      id = appointmentObtenerCod.accCod;
      request = updateStateOnly ? { accEst: appointment.accEst } : {
        logAccionesCod: appointment.logAccionesCod,
        accDes: appointment.accDes,
        accEst: appointment.accEst,
      };
      break;
    case 'area':
      id = appointmentObtenerCod.areCod;
      request = {
        areDes: appointment.areDes,
        areNom: appointment.areNom,
        areEst: appointment.areEst,
      };
      break;
    case 'avance':
      id = appointmentObtenerCod.avaCod;
      request = {
        avaDes: appointment.avaDes,
        duda: appointment.duda,
        avaFec: appointment.avaFec,
        ticketAyuda: appointment.ticketAyuda,
        avaEst: appointment.avaEst
      };
      break;
    case 'cargo':
      id = appointment.carCod;
      request = {
        rolRol: appointment.carNom,
        rolNom: appointment.cargoDes,
        rolEst: appointment.carEst
      };
      break;
    case 'cooperativa':
      id = appointmentObtenerCod.cooCod;
      request = updateStateOnly ? { cooEst: appointment.cooEst } : {
        cooIden: appointment.cooIden,
        cooNom: appointment.cooNom,
        cooSig: appointment.cooSig,
        cooDir: appointment.cooDir,
        cooTel: appointment.cooTel,
        cooCor: appointment.cooCor,
        cooSlo: appointment.cooSlo,
        cooLog: appointment.cooLog,
        cooEst: appointment.cooEst
      };
      break;
    case 'cuenta':
      id = appointment.cueCod;
      request = {
        cueNum: appointment.cueNum,
        cueEst: appointment.cueEst,
      };
      break;
    case 'direccion':
      id = appointment.dirCod;
      request = {
        dirDep: appointment.dirDep,
        dirPro: appointment.dirPro,
        dirDis: appointment.dirDis,
        dirEst: appointment.dirEst,
      };
      break;
    case 'dispositivo':
      id = appointment.disCod;
      request = {
        disNom: appointment.disNom,
        disDirIp: appointment.disDirIp,
        disEst: appointment.disEst,
      };
      break;
    case 'funciones':
      id = appointment.funCod;
      request = {
        funDes: appointment.funDes,
        funReq: appointment.funReq,
        manuales: appointment.manuales,
        funEst: appointment.funEst,
      };
      break;
    case 'logAcciones':
      id = appointment.logAccionesCod
      request = updateStateOnly ? { logAccionEst: appointment.logAccionEst } : {
        horaFin: appointment.horaFin,
        logSesionesCod: appointment.logSesionesCod,
        logAccionEst: appointment.logAccionEst,
      };
      break;
    case 'logSesiones':
      id = appointment.logSesionCod;
      request = updateStateOnly ? { logSesionesEst: appointment.logSesionEst } : {
        dia: appointment.dia,
        usuario: appointment.usuario,
        dispositivo: appointment.dispositivo,
        logSesionesEst: appointment.logSesionEst,
      };
      break;
    case 'manual':
      id = appointment.manCod;
      request = {
        manNom: appointment.manNom,
        manDes: appointment.manDes,
        manEst: appointment.manEst,
      };
      break;
    case 'moneda':
      id = appointment.monCod;
      request = {
        monNom: appointment.monNom,
        monEst: appointment.monEst,
      };
      break;
    case 'persona':
      id = appointment.perCod;
      request = updateStateOnly ? { perEst: appointment.perEst } : {
        perIden: appointment.perIden,
        perApePat: appointment.perApePat,
        perApeMat: appointment.perApeMat,
        perNom: appointment.perNom,
        perFecNac: appointment.perFecNac,
        perCor: appointment.perCor,
        perFot: appointment.perFot,
        cooperativa: appointment.cooperativa,
        cargo: appointment.cargo,
        perEst: appointment.perEst
      };
      break;
    case 'producto':
      id = appointment.proCod;
      request = {
        proIdent: appointment.proIdent,
        proDes: appointment.proDes,
        tasa: appointment.tasa,
        moneda: appointment.moneda,
        socio: appointment.socio,
        proEst: appointment.proEst,
      };
      break;
    case 'rol':
      id = appointment.rolCod;
      request = {
        rolRol: appointment.rolRol,
        rolNom: appointment.rolNom,
        usuario: appointment.usuario,
        rolEst: appointment.rolEst,
      };
      break;
    case 'socio':
      id = appointment.socCod;
      request = updateStateOnly ? { socEst: appointment.socEst } : {
        socIden: appointment.socIden,
        socApePat: appointment.socApePat,
        socApeMat: appointment.socApeMat,
        socNom: appointment.socNom,
        socioFec: appointment.socioFec,
        socCor: appointment.socCor,
        cooperativa: appointment.cooperativa,
        cuenta: appointment.cuenta,
        direccion: appointment.direccion,
        socEst: appointment.socEst,
      };
      break;
    case 'solucion':
      id = appointment.solCod;
      request = {
        solNom: appointment.solNom,
        solDes: appointment.solDes,
        solFec: appointment.solFec,
        solEst: appointment.solEst,
      };
      break;
    case 'tasa':
      id = appointment.tasCod;
      request = {
        tasIden: appointment.tasIden,
        tasTasa: appointment.tasTasa,
        tasPlaDia: appointment.tasPlaDia,
        tasFecIni: appointment.tasFecIni,
        tasFecFin: appointment.tasFecFin,
        tasEst: appointment.tasEst,
      };
      break;
    case 'ticketAyuda':
      id = appointment.ticCod;
      request = {
        descripcion: appointment.descripcion,
        fechaCreacion: appointment.fechaCreacion,
        usuario: appointment.usuario,
        tipSer: appointment.tipSer,
        areCod: appointment.areCod,
        soluciones: appointment.soluciones,
        estCod: appointment.estCod,
      };
      break;
    case 'usuario':
      id = appointment.usuCod;
      request = updateStateOnly ? { usuEst: appointment.usuEst } : {
        usuIde: appointment.usuIde,
        usuUsu: appointment.usuUsu,
        usuPas: appointment.usuPas,
        cooperativa: appointment.cooperativa,
        rol: appointment.rol,
        usuEst: appointment.usuEst,
      };
      break;
    default:
      console.error('Unknown table:', table);
      return;
  }
  console.log(table);
  console.log(id);
  console.log(request);
  console.log(updateStateOnly);
  if (updateStateOnly && !['cuenta', 'cargo', 'cuenta', 'direccion', 'manual', 'dispositivo', 'moneda', 'rol', 'solucion', 'tasa'].includes(table)) {
    await updateEntityState(table, id, request);
  } else {
    await updateCompleteEntity(table, id, request);
  }
};
