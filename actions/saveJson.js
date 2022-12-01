const fs = require("fs");



function addModifyrunDetails(projectname,testname, viola) {
  const dir1 = 'reports/' + projectname;
 
  if (!fs.existsSync(dir1)){
      fs.mkdirSync(dir1);
  }
  const fname = dir1 + '/' + testname + '.json'

  fs.writeFile(fname, JSON.stringify(viola, null, 4) , function (err,data) {
    if (err) {
        console.log(err)
        throw err;
    }
    // console.log('violations file => : ', fname);
  })  

  const d = new Date().toJSON().slice(0,19).replace(/-/g,'-').replace(/T/g,' ')
  let found=false;
  let projectErrCnt = 0;
  const runDetails = JSON.parse(fs.readFileSync('reports/runDetails.json', {encoding:'utf8', flag:'r'}));   //Json data

  const arr = runDetails.runs.map(function(el) {
    if(el.projectname===projectname && el.testname===testname) {
      el.date = d;
      el.errorcount = viola.length;
      found = true;
    }
    projectErrCnt += parseInt(el.errorcount);
    // console.log('error count', el.errorcount)
    return el;
  },viola);

  runDetails.runs = arr;

  if(found===false){
    const newObj = { "projectname": projectname, "testname": testname, "date": d, "errorcount": viola.length, "issueid":  fname };
    runDetails.runs.push(newObj);
  }

  if( runDetails.runs && runDetails.runs.length >0 ) fs.writeFile('reports/runDetails.json', JSON.stringify(runDetails, null, 4) , function (err,data) {if (err) throw err;})

  // console.log('R U N  D E T A I L S =>', projectname, projectErrCnt);
  addModifyrunSummary(projectname, projectErrCnt)
  
  return projectErrCnt;
}



function addModifyrunSummary(projectname, totErrors) {
  const d = new Date().toJSON().slice(0,19).replace(/-/g,'-').replace(/T/g,' ')
  let found=false;

  const runSummary = JSON.parse(fs.readFileSync('reports/runSummary.json', {encoding:'utf8', flag:'r'}));   //Json data
  const arr1 = runSummary.projects.map(function(el) {
    if(el.projectname===projectname) {
      el.date = d;
      el.totalErrors = totErrors;
      found = true;
    }
    return el;
  },totErrors);
   runSummary.projects = arr1;

  if(found===false){
    const newObj1 = { "projectname": projectname,  "totalErrors": totErrors , "date": d};
    runSummary.projects.push(newObj1);
  }
  if( runSummary.projects && runSummary.projects.length >0 ) fs.writeFile('reports/runSummary.json', JSON.stringify(runSummary, null, 4) , function (err,data) {if (err) throw err;})
  console.log('S U M M A R Y => ', runSummary, runSummary.projects.length)
}

module.exports = {
  addModifyrunDetails,
  addModifyrunSummary,
};
