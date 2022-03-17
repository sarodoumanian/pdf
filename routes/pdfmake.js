const express = require("express");
const router = express.Router();

const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post("/pdf", (req, res) => {
  const { fname, lname } = req.body;

  var documentDefinition = {
    content: [`Hello ${fname} ${lname}`, "This is a test for creating PDF", `${new Date(Date.now()).toLocaleDateString()}`],
  };

  const pdfDoc = pdfMake.createPdf(documentDefinition);
  pdfDoc.getBase64((data) => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${fname}-${lname}.pdf`,
    });

    const download = Buffer.from(data.toString("utf-8"), "base64");
    res.end(download);
  });
});

module.exports = router;
