const axios = require('axios');
const { jsPDF } = require("jspdf")
require('jspdf-autotable')
const doc = new jsPDF({ putOnlyUsedFonts: true})

const exportOsRegular = async (req, res, next) => {
  const data = req.body
  try {
    var result = []
    const {
      url_image,
      data_company,
      title,
      first_table
    } = data
    //Pasando imagen a base 64
    var imgData = await getImageBase64(url_image)
    //Armando el pdf
    doc.addImage(imgData, "PNG", 15, 10, 40, 20); //añadiendo el logo de la empresa
    doc.setDrawColor(207, 207, 207); 
    doc.setLineWidth(0.3); //añadiendo linea vertical
    doc.line(60, 10, 60, 30);
    doc.setFontSize(5);
    doc.text(data_company, 65, 20) //añadiendo info de la empresa
    doc.setFontSize(14);
    doc.setFont("popins", "bold"); //cambiando a font bold
    doc.text(title, 110, 40, null, null, "center") //colocando el titulo del pdf
    doc.setFont("courier", "normal"); //volviendo al font normal
    
    //agregando tabla primera
    doc.autoTable({
      startY: 50,
      head: [
        [
          {
            content: 'DATOS DE LA ORDEN',
            colSpan: 7,
            styles: { halign: 'left', fillColor: [23, 47, 200], lineColor: [0, 0, 0] },
          },
        ],
      ],
      body: first_table,
    })

    doc.save((__dirname.substring(0,__dirname.length-11)+ `/public/oc/prueba.pdf`))
    
  } catch (error) {
    console.log(error)
    res.json({ status: false, data: error })
  }
}

async function getImageBase64(url) {
  try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageData = Buffer.from(response.data, 'binary').toString('base64');
      return `data:${response.headers['content-type']};base64,${imageData}`;
  } catch (error) {
      console.error('Error al descargar la imagen:', error);
      return null;
  }
}

module.exports = {
  exportOsRegular
}
