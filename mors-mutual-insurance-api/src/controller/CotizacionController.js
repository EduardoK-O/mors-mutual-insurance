const CotizacionService = require('../services/CotizacionService');
const ConceptosCotizacionServ = require('../services/ConceptosCotizacionService');
const ConceptosCotizacion = require('../Model/ConceptosCotizacion');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit-construct');

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
    await Promise.all(allCotizaciones.map(async (cotizacion) =>{
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
    if(!body.fecha || !body.total || !body.idAsegurado || !body.idVehiculo || !body.idAseguradora ||
            !body.prima_neta || !body.descuento || !body.prima_modulos || !body.recargo_fraccionamiento
            || !body.reduccion_autorizada || !body.derecho_poliza || !body.iva ){
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
    for(concepto of body.conceptos){
        data= {
            idConcepto: concepto.idConcepto,
            idCotizacion: createdCotizacion.insertId
        }
        await ConceptosCotizacionServ.createNewConceptoCotizacion(data);
    }
    res.status(201).send({status: "OK", data: createdCotizacion})
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
    res.status(200).send({status: "OK", data: updatedCotizacion});
}



const sendMail = (req, res) => {
    const mail = {
        from: process.env.SMTP_USER,
        to: req.body.correo,
        subject: "Prueba de correo Mors Mutual",
        text: "",
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
                            Estimado cliente:
                        </td>
                    </tr>
                    <tr>
                        <td height="90" colspan="2" style="text-align: justify;">
                            En breve le haremos llegar su cotización por este medio. Agradecemos su paciencia.
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
            res.status(200).send({status: "OK"});
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

doc.on('data', (data)=> stream.write(data));
doc.on('end', ()=>stream.end());

//doc.text(`nombre: ${body.nombre}, correo: ${body.correo}`);
doc.setDocumentHeader({}, ()=>{
    doc.image('src/resources/logo.png', 75, 55, {width: 30});
    doc.text('Mors Mutual Insurance', {align: 'right', marginRight: 50});
    doc.text("COTIZACION DE SEGURO",  {align:'center', height:'400'});
});

const data = [
    {correo: body.correo, nombre: body.nombre}
]
doc.addTable(
    [
        {key: 'correo', label: '', align: 'left'},
        {key: 'nombre', label: '', align: 'right'},
    ], 
    data, {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d6c4dd"],
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'center'
    });
doc.render();
doc.end();
} 

module.exports = {
    getAllCotizaciones,
    getCotizacionById,
    createNewCotizacion,
    updateCotizacion
}