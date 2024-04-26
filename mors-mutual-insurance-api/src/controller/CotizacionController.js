const CotizacionService = require('../services/CotizacionService');
const ConceptosCotizacionServ = require('../services/ConceptosCotizacionService');
const ConceptosCotizacion = require('../Model/ConceptosCotizacion');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit-construct');
const fs = require('fs');
const { path } = require('pdfkit');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
});

const getAllCotizaciones = async (req, res) => {
    const allCotizaciones = await CotizacionService.getAllCotizaciones();
    await Promise.all(allCotizaciones.map(async (cotizacion) => {
        const conceptos = await ConceptosCotizacion.getConceptosByCotizacionId(cotizacion.idCotizacion);
        cotizacion.conceptos = conceptos;
    }));
    res.status(200).send(allCotizaciones);
}

const getCotizacionById = async (req, res) => {
    const Cotizacion = await CotizacionService.getCotizacionById(req.params.idCotizacion);
    const conceptos = await ConceptosCotizacion.getConceptosByCotizacionId(Cotizacion[0].idCotizacion);
    Cotizacion[0].conceptos = conceptos;
    res.status(200).send(Cotizacion);
}

const createNewCotizacion = async (req, res) => {
    const { body } = req;
    if (!body.fecha || !body.total || !body.idAsegurado || !body.idVehiculo || !body.idAseguradora ||
        !body.prima_neta || !body.descuento || !body.prima_modulos || !body.recargo_fraccionamiento
        || !body.reduccion_autorizada || !body.derecho_poliza || !body.iva) {
        return;
    }
    const newCotizacion = {
        fecha: body.fecha,
        total: body.total,
        idAsegurado: body.idAsegurado,
        idVehiculo: body.idVehiculo,
        idAseguradora: body.idAseguradora,
        prima_neta: body.prima_neta,
        descuento: body.descuento,
        prima_modulos: body.prima_modulos,
        recargo_fraccionamiento: body.recargo_fraccionamiento,
        reduccion_autorizada: body.reduccion_autorizada,
        derecho_poliza: body.derecho_poliza,
        iva: body.iva
    }
    const createdCotizacion = await CotizacionService.createNewCotizacion(newCotizacion);
    for (concepto of body.conceptos) {
        data = {
            idConcepto: concepto.idConcepto,
            idCotizacion: createdCotizacion.insertId
        }
        await ConceptosCotizacionServ.createNewConceptoCotizacion(data);
    }
    res.status(201).send({ status: "OK", data: createdCotizacion })
}

const updateCotizacion = async (req, res) => {
    const { body } = req;
    if(!body.fecha || !body.total || !body.idAsegurado || !body.idVehiculo || !body.idAseguradora ||
        !body.prima_neta || !body.descuento || !body.prima_modulos || !body.recargo_fraccionamiento
        || !body.reduccion_autorizada || !body.derecho_poliza || !body.iva ){
    return;
}
const newCotizacion = {
    idCotizacion: req.params.idCotizacion,
    fecha: body.fecha,
    total: body.total,
    idAsegurado: body.idAsegurado,
    idVehiculo: body.idVehiculo,
    idAseguradora: body.idAseguradora,
    prima_neta: body.prima_neta,
    descuento: body.descuento,
    prima_modulos: body.prima_modulos,
    recargo_fraccionamiento: body.recargo_fraccionamiento,
    reduccion_autorizada: body.reduccion_autorizada,
    derecho_poliza: body.derecho_poliza,
    iva: body.iva
}
    const updatedCotizacion = await CotizacionService.updateCotizacion(newCotizacion);
    res.status(200).send({ status: "OK", data: updatedCotizacion });
}



const sendMail = (data) => {
    const mail = {
        from: process.env.SMTP_USER,
        to: data.asegurado.correo,
        subject: "Prueba de correo Mors Mutual",
        text: "",
        attachments:[{
            path: data.attachment
        }],
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTMML 1..0 Transitional//EN" "http://www-w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3..org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <title>Document</title>
            <style>
                body{
                    margin: 0;
                    background-color: #cccccc;
                }
        
                table{
                    border-spacing: 0;
                }
        
                td {
                    padding: 0;
                }
        
                img {
                    border: 0;
                }
                
                .wrapper{
                    width: 100%;
                    table-layout: fixed;
                    background-image: url("https://i.ibb.co/4W9HVk4/img-noise-1920x1080-1.png");
                    padding-bottom: 60px;
                }
        
                .main{
                    margin: 0 auto;
                    width: 100%;
                    max-width: 800px;
                    border-spacing:0;
                    font-family: sans-serif;
                    color: #171a1b;
                }
        
                .bkgnd {
                    background-image: url("https://i.ibb.co/QMXQYCd/img-noise-1920x1080-2.png");
                }
        
               td{
                color: whitesmoke;
                text-align: center;
               }
                
                .head img {
                    width: 10%;
                }
                .logo img {
                    height: 50%;
                    min-height: 50%;
                }
                
                .name{
                    font-family: sans-serif;
                    font-size: large;
                    font-weight: bold;
                }
        
                
            </style>
        </head>
        <body>
            <center class="wrapper">
                <table class="main" width="100%">
                    <tr class="bkgnd">
                        <td class="logo" height="90">
                            <img src="https://i.ibb.co/hRN5Zf9/image-removebg-preview-2.png" alt="image-removebg-preview-2" >
                        </td>
                        <td class="name" height="90" width="50%">
                            <p>Mors Mutual Insurance</p>
                        </td>
                    </tr>
                    <tr>
                        <td height="90">
                            Estimado ${data.asegurado.nombre}:
                        </td>
                    </tr>
                    <tr>
                        <td height="90" colspan="2" style="text-align: center;">
                            Hemos generado la cotización para su veh&iacute;culo <b>${data.vehiculo.marca} ${data.vehiculo.modelo}</b> del año 
                            <b>${data.vehiculo.anio}</b>, por la cantidad de:<br>
                            <h1> $ ${data.total} m.n.</h1><br> Si desea conocer más a detalle esta cotización,
                            puede consultar el archivo pdf adjunto. 
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td  height="90">
                            El equipo de Mors Mutual.
                        </td>
                    </tr>
                    <tr class="bkgnd">
                        <td height="90" style="text-align: end;">
                            Powered by:
                        </td>
                        <td height="90" style="text-align: left;">
                            <img src="https://i.ibb.co/6vQ1mX0/fc6e259d75b6a472bc8629917a891c8e05dc787br1-851-315v2-uhq-removebg-preview.png" alt="fc6e259d75b6a472bc8629917a891c8e05dc787br1-851-315v2-uhq-removebg-preview" style="width: 150px; min-width: 50px;">
                        </td>
                    </tr>
                </table>
            </center>
        </body>
        </html>`
    }

    transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.error(err)
        } else {
            res.status(200).send({ status: "OK" });
        }
    });
}

const cotizarPDF = (req, res) => {
    const { body } = req;
    const doc = new PDFDocument();

    const filename = `Cotizacion${Date.now()}.pdf`;

    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${filename}.pdf`
    })

    doc.on('data', (data) => stream.write(data));
    doc.on('end', () => stream.end());

    doc.setDocumentHeader({height:'20'}, () => {
        doc.image('src/resources/logo.png', 75, 55, { width: 30 });
        doc.text('MORS MUTUAL INSURANCE', { align: 'right', marginRight: 50 });
        doc.text("COTIZACION DE SEGURO", { align: 'center', height: '400' });
        doc.text(`Vehiculo: ${body.vehiculo.marca} ${body.vehiculo.modelo}`, {align: 'left'});
        doc.text(`Número de Serie: $${body.vehiculo.num_serie}`,{align:'left'});
        doc.text(`Año: ${body.vehiculo.anio}`,{align:'left'});

    });

    const data = body.conceptos;
    doc.addTable(
        [
            { key: 'descripcion', label: '', align: 'right' },
            { key: 'precio', label: '', align: 'left' },
        ],
        data, {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d6c4dd"],
        cellsPadding: 5,
        marginLeft: 5,
        marginRight: 5,
        headAlign: 'center'
    });

    doc.addTable(
        [
            { key: 'descripcion', label: '', align: 'center' },
            { key: 'precio', label: '', align: 'left' },
        ],
        [
            { descripcion: "PRIMA NETA", precio: `${body.prima_neta}`},
            { descripcion: "DERECHO DE POLIZA", precio: `${body.derecho_poliza}`},
            { descripcion: "PRIMA DE MÓDULOS", precio: `${body.prima_modulos}`},
            { descripcion: "RECARGO FRACCIONAMIENTO", precio: `${body.recargo_fraccionamiento}`},
            { descripcion: "DESCUENTO APLICADO", precio: `${body.descuento}` },
            
        ],
        {
            border: null,
            width:"500",
            striped: false,
            stripedColors: ["#f6f6f6", "#d6c4dd"],
            cellsPadding: 2,
            marginLeft: 2,
            marginRight: 2,
            headAlign: 'left',
        }
    );
    doc.render();
    doc.text(`Total: ${body.total}`,{align:'right'});
    const route = `./src/resources/pdf/${filename}`;
    doc.pipe(fs.createWriteStream(route));
    doc.end();
    body.attachment = route;
    sendMail(body);
}

module.exports = {
    getAllCotizaciones,
    getCotizacionById,
    createNewCotizacion,
    updateCotizacion,
    sendMail,
    cotizarPDF
}