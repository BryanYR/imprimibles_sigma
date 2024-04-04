
const { jsPDF } = require("jspdf")

const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' })

const exportOsRegular = async (req, res, next) => {
  const data = req.body
  try {
    var result = []
    var Items = {
      model: 'KICK EXCLUSIVE',
      quantity: '1',
      unit_price: '6000',
      dscto_unit: '200',
      total: '5800',
    }
    for (var i = 0; i < 10; i += 1) {
      Items.id = (i + 1).toString()
      result.push(Object.assign({}, Items))
    }

    function createHeaders(keys) {
      var result = []
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: 65,
          align: 'center',
          padding: 0
        })
      }
      return result
    }

    var headers = createHeaders(['id', 'model', 'quantity', 'unit_price', 'dscto_unit', 'total'])

    doc.table(1, 1, result, headers, { autoSize: true })
    doc.save("prueba.pdf")
    console.log('data', data)
  } catch (error) {
    console.log(error)
    res.json({ status: false, data: error })
  }
}

module.exports = {
  exportOsRegular
}
