// Minimal, human-readable, short-named Google Apps Script
// Usage: paste into Apps Script and run `run()`

function run() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cfg = {
    MSHEET: null,           // set name string to override auto detection 
    C_NAME: 1,              // name of column (0-based)
    C_DEPT: 3,              // department column
    C_YEAR: 4,              // year column
    C_ROLL: 5,              // roll column
    HDR: ["Name","Roll No","ECA"]
  };

  // find main sheet (by name)
  const ms = cfg.MSHEET ? ss.getSheetByName(cfg.MSHEET)
                        : ss.getSheets().find(s => s.getName().toLowerCase().includes("response"));
  if (!ms) {
    SpreadsheetApp.getUi().alert("master sheet not found");
    return;
  }

  const data = ms.getDataRange().getValues();
  if (data.length <= 1) {
    SpreadsheetApp.getUi().alert("no rows");
    return;
  }

  const rows = data.slice(1);
  const map = {};               // sheetName -> [name,roll,eca,..many more]

  rows.forEach(r => {
    const name = String(r[cfg.C_NAME] || "").trim();
    const dept = String(r[cfg.C_DEPT] || "").trim();
    const year = String(r[cfg.C_YEAR] || "").trim();
    const roll = String(r[cfg.C_ROLL] || "").trim();
    if (!name || !dept || !year) return;

    const key = makeName(year, dept);
    if (!key) return;
    if (!map[key]) map[key] = [];
    map[key].push([name, roll, ""]);
  });

  Object.keys(map).forEach(k => {
    let sh = ss.getSheetByName(k);
    if (!sh) {
      sh = ss.insertSheet(k);
      sh.appendRow(cfg.HDR);
    } else {
      if (sh.getLastRow() > 1) sh.getRange(2,1,sh.getLastRow()-1, cfg.HDR.length).clearContent();
    }
    const vals = map[k];
    if (vals.length) sh.getRange(2,1,vals.length, cfg.HDR.length).setValues(vals);
  });

  SpreadsheetApp.getUi().alert("done");
}

function makeName(yearTxt, deptTxt){
  const y = numFrom(yearTxt);
  if (!y) return null;
  const sem = (y-1)*2 + 1;                               // 1->1,2->3,3->5,4->7
  const d = deptTxt.toUpperCase().replace(/\s+/g,"");    // like "CSE2"
  const branch = (d.match(/[A-Z]+/)||[])[0] || "GEN";
  const sec = (d.match(/\d+/)||[])[0] || "1";
  return `${sem}${branch}${sec}`;                        // example "5CSE2"
}

function numFrom(s){
  const m = String(s).match(/\d+/);
  return m ? parseInt(m[0],10) : null;
}
