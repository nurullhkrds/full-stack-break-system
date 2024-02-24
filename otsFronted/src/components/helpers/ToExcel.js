import * as XLSX from 'xlsx';

const handleDownloadExcel = (data,userDetail) => {
    const tableData = data.map((row) => {
      const formattedDate = new Date(row.createdDate).toLocaleString("tr-TR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
  
      const formattedStartTime = row.startTime
        ? new Date(0, 0, 0, row.startTime[0], row.startTime[1], row.startTime[2]).toLocaleTimeString("tr-TR", { hour: 'numeric', minute: 'numeric', second: 'numeric' })
        : '';
  
      const formattedEndTime = row.endTime
        ? row.endTime === 'Mola Devam Ediyor'
          ? 'Mola Devam Ediyor'
          : new Date(0, 0, 0, row.endTime[0], row.endTime[1], row.endTime[2]).toLocaleTimeString("tr-TR", { hour: 'numeric', minute: 'numeric', second: 'numeric' })
        : '';
  
      const durationMinutes = isNaN(row.durationMinutes) ? '' : row.durationMinutes;
  
      return {
        "Mola Türü": row.breakType,
        "Tarih": formattedDate,
        "Mola Başlangıç": formattedStartTime,
        "Mola Bitiş": formattedEndTime,
        "Dakika": durationMinutes,
      };
    });
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tableData);
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Mola Bilgileri");
    XLSX.writeFile(workbook, `${userDetail?.firstname} ${userDetail?.lastname}_Mola_Bilgileri.xlsx`);
  };
  
  export default handleDownloadExcel;
  