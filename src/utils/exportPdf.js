export const exportPDF = async (element, filename = 'document.pdf') => {
  const html2pdfModule = await import('html2pdf.js');
  const html2pdf = html2pdfModule.default;

  const opt = {
    margin: [1, 0.5, 1, 0.5],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] },
  };

  html2pdf().set(opt).from(element).save();
};
