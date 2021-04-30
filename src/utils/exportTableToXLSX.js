import xlsx from "xlsx";
import fileSaver from "@/utils/fileSaver.js";

// 字符串转ArrayBuffer
function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

// 将一个sheet转成最终的excel文件的blob对象
function sheet2blob(sheet, sheetName) {
	sheetName = sheetName || "sheet1";
	var workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts = {
		bookType: "xlsx", // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: "binary"
	};
	var wbout = xlsx.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {
		type: "application/octet-stream"
	});
	return blob;
}

function exportXLSXByJSON(json, sheetName, fileName) {
	json = json || [];
	sheetName = sheetName || "sheet1";
	fileName = fileName || "export.xlsx";

	var sheet = xlsx.utils.aoa_to_sheet(json);
	var blob = sheet2blob(sheet, sheetName);
	fileSaver.saveAs(blob, fileName);
}

export {
	exportXLSXByJSON
};
