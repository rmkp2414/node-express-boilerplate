const httpStatus = require('http-status');
const { User,File, Borehole,Stdmethodparam } = require('../models');
const boreholeService = require('./borehole.service');
const ApiError = require('../utils/ApiError');
const readline = require('linebyline');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

//29/102 page in Method Code
//CSV look in to the sgf 
//there are more methos
var _globalMethodNames = [
  // { 'code': '00', 'name': 'Hfa' }, consider going as {'code':'0,00,100,1000' , 'name':'Hfa'}
  { 'code': '00', 'name': 'Hfa' },
  { 'code': '01', 'name': 'Jb' },
  { 'code': '02', 'name': 'Slb' },
  { 'code': '03', 'name': 'Vim' },
  { 'code': '04', 'name': 'T' },
  { 'code': '05', 'name': 'Sti' },
  { 'code': '06', 'name': 'check!!!' },  //check 
  { 'code': '07', 'name': 'CPTU' }, //finalized this param // CPT changed to CPTU HM = 7 and HM = 07 and HM = 107A all are CPTU
  { 'code': '08', 'name': 'Jb2' }, //check this param
  { 'code': '09', 'name': 'Jb-tot'},
  { 'code': '35', 'name': 'DPT' }, //finalized
  { 'code': '71', 'name': 'Jb2' },
  { 'code': '31', 'name': 'test' } // finalized this param

]

/* 
08 and 71 both are Jb2 -  some equipments provide their own numbers
for snd files HM is going to be different 
everything in the sgf.pdf are refer to the csv
the give geo....pdf is related to snd

HA=HA
HB=HB
HB=pressure "pressure" will come to the ui
Line X : ex: HB=2 in csv   --> pressure 2  
HB=2 in csv for now show it as HB 2 in UI
when the translation comes do it as Line X


whenevr we need to add new params to the main block since the sgf is outdated
create a library for the main block and data block in the Master Configure
Super user Access Only

in CSVs
Attachment A for methods
Attachment B.Method Codes
in CSV files Parameters in the main block

look in to section A  and section for main block
refer section D for the data block
*/

const private_FileReadingService = async(file)=>{
var rl = readline(file.path);
var starCount = 0;
var ISSND = false;
var ISSTD = false;
var STDHEADER = 2;
var STDDATASTART = 4;
var DATA = []
var _borehole = {}
var BOREHOLENAMES = []
var METHODNAMES = []
var FINISHREADINGPREVIOUSBLOCK = false;
var ALLDATA = []

var boreholeBucket = []

/* Requirements
When usernavigates to a project he will be shown all the boreholes related to that 
when he click on a borehole all the methods performed will be shown 

the user should be able to insert a new record in the grid 
there is an order of sorting the data 

when user enters some details 


when user clicks on the graph button the graphs for all the parameters will be shown.

so for all the method types we need to have model classes

we are not going to save data for methods individually


*/

var _activeParamsFromDB = []
// const _activeMethodaFromDB = await Stdmethodparam.find({})

//find for existing borehole 
  //file will come here and it will be read up to the end
  var _currentBlock = 0;
  rl.on('line',async function(line, lineCount, byteCount) {   
      if (lineCount == 1 && line == '$') {
          ISSTD = true;
          //throw "Enough reading file";
      }        
      else if(lineCount == 1 && line != '$') {          
          ISSND = true;          
          //throw "Enough reading file";            
      }
      if(ISSND){
          console.log('SND READING')
          
          /* first identify the file type prv, gvr , vm, jb2 etc 
          if the file extension is prv the borehole name comes in the filename
          */        
         var filename = file.originalname;
         var fileext = filename.split('.')  
        


          var boreholename = fileext[0]
            //BOREHOLENAMES.push(boreholename)

            _borehole.boreholename = boreholename
            _borehole.projectid  = '0000001'
            _borehole.firmid = 'COMPANYID'
            _borehole.filepath = '/uploads'
            _borehole.filename =  file.originalname
            _borehole.uploadedby = "kapila" //get the name from token

            const prv =  fileext[1]== 'PRV' ? true : false;
            const snd = fileext[1]== 'SND' ? true : false;
            const tlk =  fileext[1]== 'TLK' ? true : false;
            const gvr = fileext[1]== 'GVR' ? true : false;
            

            /* //process the data rows
            data objects are different based on the methods and file types
            create the data objects accordingly

            Look for xyz values in file whihc they are available

            first we have to read all the lines and after that based on the type we will have to 
            do the reading based on logic 
            
             */
            if(prv){
              console.log(filename)
/* 
0.000000 2017-08-31 0 1 0 0 GUID 8224781b-8f37-4e41-8e6b-8822d01cbd89
*
SKR    0.30 J N J     0.00      0     0.00      0      0                      
SKR    1.00 J N J     0.00      0     0.00      0      0 Mg [husasiCldc pl]   5B/4
SKR    2.00 J N J     0.00      0     0.00      0      0 Mg [saleGr brick]    3B/2
SKR    2.50 J N J  
*/
            }
            if(snd){
              console.log(filename)
              /* 
6582016.485000
148732.956000
14.424000
0.000000
0.000000
0.000000 0 90.000000
*
97
40 0
*
99
GUID ab825604-2c43-4590-8682-12863d157ae2
014c5c88-3983-40de-a8ad-502e9409d050
796533 Huvudsta 3_1
17IT001
*
3 2017-07-06
1.000000 91 0 3 1 1725 17IT001*20170706*1724.VIM GUID 8cdba5bf-0c0d-479f-8739-9a160c196aed
1.200    3 100      31              
               */
            }
            if(gvr){
              console.log(filename)
              /* 
              6581998.298000
148819.892000
15.772000
0.000000
0.000000
RF 0 0 GUID 1e6d472b-24bc-44ef-bb55-3673394d1c64
16.750000 0
4.250000 90.000000
0.500000 11.157242 
*
 2017 7 12 13.100000 N FUNKTIONSKONTROLL OK
 2017 8 22 10.639999 J
 2017 9 5 10.920000 J */
            }
            if(tlk){
              console.log(filename)
            /* torrskorpa 33 0 0        Torrskorpa
12.8237 
0.00   0.00   0.00   0.00   0.00   0.00
lera 11 0 0              Lera
  9.4278 
0.00   0.00   0.00   0.00   0.00   0.00
friktjord 36 0 0         Friktionsjord
  6.0052 
0.00   0.00   0.00   0.00   0.00   0.00
*
*/
            }

         
    var methodDetailsAvailable = false;

    var starCount  = 0
    var currentLine =0;
    var x,y,z , section,distance, predrill,bearing,tilt,guid // guid is not interested in reading discard for the moment
    //turn it on and off guid
    var headDetailRead = false;
    // var rl = readline(file_path);
    // rl.on('line', function(line, lineCount, byteCount) {
      // do something with the line of text
      console.log(line +'   : '+ lineCount )

      line == "*" ? starCount++ : null

      if(starCount==1){
          //get related details
          
      }
      if(starCount==2){
        if(line.contains('GUID')) //will look this little later 
        guid = line

          //get related details
      }

      if(starCount==3)
      {
        var methoddetailsLine = lineCount+1
          methodDetailsAvailable = true;
      }
      if(methoddetailsLine == lineCount){
        var method = line[currentLine+1].split(' ')
        var HM = method[0]
        var date = method[1]

        //get more details 
        
      }
      if(lineCount == methoddetailsLine+1 ){
        var more = line.split(' ');

        var stopcode = more[1]
        var maxforce = more[3]
        var HB = more[5]
        headDetailRead = true
      }
      if(headDetailRead){
        //these are data for that file
        var data = [] 
        var datasplit = line.split(' ')
          var row = {
              'Depth': datasplit[0],
              'penterationresistance': datasplit[1],
              'penterationrate': datasplit[2],
              'feedtrustfprce': datasplit[3],
              'rotationspeed': datasplit[4],
              'flushpressure': datasplit[5],
              'flushrate': datasplit[6],
              'hydrallichammerpressure': datasplit[7],
              'pressureinrotarymoter': datasplit[8],
              'actualsoilinterpretation': datasplit[9]
          }
      }
    // })
    // .on('error', function(e) {
    //   // something went wrong
    // });
    
 
    // const file = readline.createInterface({
    //     input: Fs.createReadStream(file_path),
    //     output: process.stdout,
    //     terminal: false
    // });

    // var methodDetailsAvailable = false;

    // var starCount  = 0
    // var currentLine =0;
    // var x,y,z
    // file.on('line', (line,lineCount) => {
        
        

    //     line == "*" ? starCount++ : null

    //     if(starCount==1){
    //         //get related details
    //     }
    //     if(starCount==2){
    //         //get related details
    //     }

    //     if(starCount==3)
    //     {
    //         methodDetailsAvailable = true;
    //     }
    //     if(methodDetailsAvailable){
    //         var method = line[currentLine+1].split(' ')
    //         var HM = method[0]
    //         var date = method[1]

    //         //get more details 
    //         var more = line[currentLine+2].split(' ');
            

    //     }
        
    //     x = currentLine == 1 ? line : x
    //     y = currentLine == 2 ? line : y
    //     z = currentLine ==3 ? line : z

    //     var METHOD = currentLine == 17 ? line.split(' ')[0] : null
    //     var PERFORMEDDATE = currentLine == 17 ? line.split(' ')[1] : null

    //     console.log('x : ' + x + ' y : ' + y + ' z : ' + z + 'star Count' + starCount) ;
    //     console.log(METHOD)
    //     console.log(PERFORMEDDATE)  

    //     if(currentLine == 17){
    //         // throw '';
    //         throw new Error('no need to go ahead');
            
    //     }

    //     // if(line == "*")
    //     // {
    //     //     starCount++
    //     // }
    //     // if(starCount==1)
    // // }).on('end',()=>{
    // //     console.log('x : ' + x + 'y : ' + y + 'z : ' + z) ;
    // //     console.log(METHOD)
    // //     console.log(PERFORMEDDATE) 
    
    // currentLine++;
    // }).on('error',(e)=>{
    //     console.log('error' + e)
    // })




      }
      if(ISSTD){
        console.log('STD/CSV READING')
        if(lineCount != 1 && line == '$'){
          FINISHREADINGPREVIOUSBLOCK = true          
        }
        /* Header Block */
        if(line.match(/HK=.+?/)){
            var HK = line.match(/HK=(.*?),/)
            var boreholename = HK[1]
            //BOREHOLENAMES.push(boreholename)

            _borehole.boreholename = boreholename
            _borehole.projectid  = '0000001'
            _borehole.firmid = 'COMPANYID'
            _borehole.filepath = '/uploads'
            _borehole.filename =  file.originalname
            _borehole.uploadedby = "kapila" //get the name from token
           
          var HM = line.match(/HM=(.*?),/)
          var method = _globalMethodNames.filter(m => {
            return m.code == HM[1]
          })
          method.length > 0 ? METHODNAMES.push(method[0].name) : 'UNKNOWN'
          _borehole.methodname =  method.length > 0 ? method[0].name :'UNKNOWN' 
          // _borehole.data = {'filepath' : '/uploads', 'file' : file.originalname , 'methodname' : method.length > 0 ? method[0].name :'UNKNOWN' }
          
        }

        //old code start
        // if (line.match(/^D=/)) {
        //   var data = line.split(',')
        //   var row = ''
        //   //get all params list in db and check the available params are in it
        //   // for this method type check what params have configured read
        //   //get the order of the params from config for this method.
        //   data.forEach(currentItem => {
        //     var cur = currentItem.split('=')
        //     //check whether this is an active column for this method
        //     // var isActiveParam = await _activeMethodaFromDB.filter((p) => {
        //     //   return p.param == cur[0] && p.status == 'active'
        //     // })
        //     // isActiveParam ?  row += `{'param': '${cur[0]}', 'val': '${cur[1]}'},` : null        
            
        //     // row += `{'param': '${cur[0]}', 'val': '${cur[1]}'},` //replace with this 
        //       row += `${cur[0]}:${cur[1]},`
              
        //      //DATA.push(`${cur[0]},${cur[1]}`)
        //   });
        //   //  DATA.push(JSON.stringify({row}))
        //   //  DATA.push({row})
        //   var tmp = {row}
        //   // DATA.push(row)
        //   DATA.push(tmp)
        // } 
        //pld code ends

        if (line.match(/^D=/)) {
          var tmpline = line.replace(/^/,'{"').replace(/$/,'"}').replace(/=/g,'":"').replace(/,/g,'","')
          DATA.push(tmpline)
          //var data = line.split(',')
          //var row = ''
          //get all params list in db and check the available params are in it
          // for this method type check what params have configured read
          //get the order of the params from config for this method.
          // data.forEach(currentItem => {
          //   var cur = currentItem.split('=')
          //   //check whether this is an active column for this method
          //   // var isActiveParam = await _activeMethodaFromDB.filter((p) => {
          //   //   return p.param == cur[0] && p.status == 'active'
          //   // })
          //   // isActiveParam ?  row += `{'param': '${cur[0]}', 'val': '${cur[1]}'},` : null        
            
          //   // row += `{'param': '${cur[0]}', 'val': '${cur[1]}'},` //replace with this 
          //     row += `${cur[0]}:${cur[1]},`
              
          //    //DATA.push(`${cur[0]},${cur[1]}`)
          // });
          // //  DATA.push(JSON.stringify({row}))
          // //  DATA.push({row})
          // var tmp = {row}
          // // DATA.push(row)
          // DATA.push(tmp)
        } 

        if(FINISHREADINGPREVIOUSBLOCK){          
            // var data = {'borehole' : BOREHOLENAMES[_currentBlock] , 'method' : METHODNAMES[_currentBlock], 'block' : DATA}
            // ALLDATA.push(data)
          //  
            // _currentBlock++;
            var data = DATA

            // var existingBorehole = boreholeBucket.filter((b,i)=>{
            //   return b.boreholename == _borehole.boreholename && b.methodname == _borehole.methodname
            // })
            // if(existingBorehole.length > 0){
            //   //when uploading ig same file with same method exits 
            //     existingBorehole.data.datablock.push(data)
            // }
            // else{
            //     _borehole.data.datablock = data           
            // }

            // _borehole.data.datablock = data 
            _borehole.data = data 
            boreholeBucket.push(_borehole)
            DATA = []
            _borehole = {}
            FINISHREADINGPREVIOUSBLOCK = false
            // console.log(_borehole)
        }

          //for this method get the order
          //stdmethod params
          // methodName.length > 0 && !METHODSPERFORMEDINBOREHOLE.includes(methodName[0].name) ?  METHODSPERFORMEDINBOREHOLE.push(methodName[0].name) : null

          //methods performed in this borehole
          //BOREHOLEMETHODS.push(methodName[0].name)
          //add file names to bore hole related files
          //if the file is read before we should inform user
          //BOREHOLEFILES.push(file.originalfilename)

          //  _stddata.data = {'method': methodname , 'rows': []}
          // _stddata.x = ''
          // _stddata.y = ''
          // _stddata.z = ''
          // FirmId,ProjectId,FileType,DataId,DataFile,FileIndex,BoreHoleType,Xcoordinate,Ycoordinate,ZLevel,Section,Distance,
          // PreDrill,Bearing,Tilt,BoreHoleGuid,HM,HMType,BoreHoleDate,StopCode,SoilCode,GWLMinLevel,GWLMaxLevel,BedRock,
          // MaximumForce,HB,DataBlock,DataColumnCount,DataColumn,Lat,Lon,SubMethodDetail,GWDUpperReservoir,GWDLowerReservoir,
          // DesignationSystem,General,TopLevel,TipLevel,FilterLength,FilterType,LongTermMeasurement,GroundWaterReservoir,GWLMean,
          // Processed,ProcessedOn,Status              
          // }

         

                  //get all params list in db and check the available params are in it
                  // for this method type check what params have configured read
                  //get the order of the params from config for this method.


                  // data.forEach(currentItem => {
                  //     var cur = currentItem.split('=')

                      //check whether this is an active column for this method
                    // var isActiveParam = await _activeMethodaFromDB.filter((p) => {
                    //   return p.param == cur[0] && p.status == 'active'
                    // })
                    // isActiveParam ?  row += `{'param': '${cur[0]}', 'val': '${cur[1]}'},` : null        
                  //   row += `{'param': '${cur[0]}', 'val': '${cur[1]}'},`                     // row += d;
                  // });

                  // DATA.push(JSON.stringify({row}))
                  //DATA.push({row})

                  // if(FINISHREADINGBLOCK){
                  //   _borehole.projectid  = '0000001'
                  //   _borehole.firmid = 'COMPANYID'
                  //   _borehole.boreholename = BOREHOLENAMES[0]
                  //   _borehole.method = METHODS[0]
                  //   _borehole.data = { 'method': METHODNAME[0], 'block': DATA }                    
                  //   await Borehole.create(_borehole)
                  //   FINISHREADINGBLOCK = false;
                  //   DATA = [{}]
                  // }

         // }
      }             
  }).on('end',async ()=>{
    var data = DATA
    // _borehole.data.datablock = data  
    _borehole.data = data           
    boreholeBucket.push(_borehole)
    _borehole = {}
    DATA = []
    FINISHREADINGPREVIOUSBLOCK = false

    //get all methods to one borehole name

   // var processing = await processBoreholesToOne(boreholeBucket)


    //check for existing file 

     //var boreholex = await Borehole.findByBoreholeName(boreholeBucket[0].boreholename)


    //  console.log('x' + boreholex)
    //         if(boreholex.length>0){
    //           //check the filenames are same
    //           boreholex.files.forEach((file)=>{
                
    //               //the user has upload a file with the same name
    //               //we need to add all the rows and then 
    //               //will add the row with the filename
                
    //           })
    //         }
    //         else{
    //           //can write to the db
    //           //need to check within the same set of blocks whether there are files containing same borehole methods
    //         }

    /* start save data */
    boreholeBucket.forEach(async(bh,i)=>{
      var dbborehole = await Borehole.findByBoreholeName(bh.boreholename)
     // console.log(dbborehole.methodname == bh.methodname)
     // return;
      if(dbborehole){
        console.log('1' + dbborehole)
        if(bh.methodname == dbborehole.methodname ){
          
          await bh.data.forEach((filerow,filerowindex)=>{
            dbborehole.data.forEach((dbrow,dbrowindex)=>{

             // await processLines(filerow,dbrow)
              if(JSON.stringify(filerow)===JSON.stringify(dbrow)){
                console.log('Found Identical lRows' + filerow + ' = ' + dbrow)
                bh.data.splice(i,1) //remove row from databucket not going to db
              }
              else{
                //try to merge
                //var tmp = Array.prototype.push.apply(filerow,dbrow);
                
                //console.log('merged' + tmp)
              }
            })
          })
          bh.data.length > 0 ? await Borehole.updateOne({ _id: dbborehole._id },{ $push: { data: bh.data }}) : null
        }
      }
      else{
        console.log('2' + dbborehole)
        console.log('insert new borehole data set')
        await Borehole.create(bh)
      }
      // return;
      //existing borehole details
      dbborehole.then(docs=>{
         console.log(docs)
        // if(bh.methodname == docs.methodnme ){
          
        //   await bh.data.forEach((filerow,filerowindex)=>{
        //     dbborehole.data.forEach((dbrow,dbrowindex)=>{
        //       if(JSON.stringify(filerow)===JSON.stringify(dbrow)){
        //         console.log('Found Identical lRows' + filerow + ' = ' + dbrow)
        //         bh.data.datablock.splice(i,1) //remove row from databucket not going to db
        //       }
        //       else{
        //         //try to merge
        //         var tmp = Array.prototype.push.apply(filerow,dbrow);
        //         console.log('merged' + tmp)
        //       }
        //     })
        //   })
        // }
      })
      if(dbborehole){
       
           
        
        // boreholex.data.push(bh.data);
        //for each datablock compare all the same method data block and discard similar data rows
        //we dont need to keep redundant data

        //find whether details available for new method
        // var methodData = dbborehole.data.filter((b, i) => {
        //   return b.methodname == bh.data.methodname
        // })
        //a data set for the running method is available in db
          //   if(methodData.length > 0){



          // //  await methodData.forEach((e,i)=>{   
          //  await methodData[0].datablock.forEach((e,i)=>{
          //       bh.data.datablock.forEach((x,i)=>{
                  
          //         // if(JSON.stringify(x)===JSON.stringify(e.datablock)){
          //         if(JSON.stringify(x)===JSON.stringify(e)){
          //           console.log(x==e)
          //           bh.data.datablock.splice(i,1)
          //           //here we will have to do the merging
          //           //if the D is equal add the additional params to the same block 
          //           //prev data D=0.1,C=0.5,X=0.2
          //           //new row D=0.1,N=0.8,Z=0.3,C=0.6
          //           //db row after update D=0.1,C=0.5,X=0.2,N=0.8
          //           //? what happens for same row in a new file different value is available for existing row***
          //           //can we have two rows with different data for the same row - I think we cannot and we should not

          //           //ANSWER RECEIVED
          //           // in that case we need to ask the user 3 options: choose the first data, choose the second data, add that information 
          //           // to a new borehole because we cant merge that data since it is in the same depth                    
          //         }
          //         else{
          //           bh.data.datablock.push(x)
          //           //check if the depth is same
          //           //if depth same check each and every other params are same 
          //           //working
          //           // var breakdbline = e.split(',')
          //           // var breakfileline = x.split(',')

          //           // breakdbline.forEach((dbparam,dbi)=>{
          //           //   breakfileline.forEach((bfparam,dfi)=>{
          //           //       if(dbparam != bfparam){
          //           //         console.log('equal depath ' + dbparam + ' - ' + bfparam)
                            
          //           //       }                      
          //           //   })
          //           // })
          //           //working

          //           //if depth same and two params are identical ask from user whihch one to keep and which one to discard


          //           //here i think we can get the difference between two objects
          //           //we cant tell from whihc file this data comes as there is a merging happends
          //           //we can update a last update data and last added file name or somethisn

          //           //a new screen with 
          //           // var test = JSON.stringify(x).diff(JSON.stringify(e))
          //           //ammend the diff to existing row 

          //           //save them as conflicted data and until they clean them up show them a notification saying that 
          //           //there are some conflickted data and set them manually
          //         }
          //       })
          //     })            
          //   }           

        // bh.data.datablock.length > 0 ? await Borehole.updateOne({ _id: dbborehole._id },{ $push: { data: bh.data }}) : null
        //bh.data.datablock.length > 0 ? await Borehole.updateOne({ _id: dbborehole._id },{ data: bh.data }) : null
      }
      else{
        console.log('insert new borehole data set')
        await Borehole.create(bh)
      }      
    })
    /* end save data */

    //remove this method rightaways if not needed
    // const processLines = async(filerow,dbrow)=>{
    //   var fr = filerow.split(',')
    //   var dr = dbrow.split(',')
    //   var line = []
    //   fr.forEach(f=>{
    //     dr.forEach(d=>{
    //     if(f == d){

    //     }
    //     })
    //   })
    // }
    
    //console.log('x data ' + _borehole)
    //var data = {'borehole' : BOREHOLENAMES[_currentBlock] , 'method' : METHODNAMES[_currentBlock], 'block' : DATA}
    //ALLDATA.push(data)
    //DATA = []
    //_currentBlock = 0;
    //FINISHREADINGPREVIOUSBLOCK = false
    // console.log('end reading file :' + file.originalname)
    // console.log('all methods ' + METHODNAMES)
    // console.log('all boreholes' + BOREHOLENAMES)
    // console.log('all data ' + ALLDATA)



    //get everything from the DB 
  }).on('error',(e)=>{
      console.log('error reading file :' + file.originalname + ' errro : ' + e)
      
  }).on('close',(e)=>{
      console.log('close reading file :' + file.originalname)
      
  })
}

const processBoreholesToOne = async(bhbucket)=>{
  var newBucket = []
  var uniqueBoreholes = [...new Set(bhbucket.boreholename)]

  uniqueBoreholes.forEach((ubh,index)=>{
    bhbucket.forEach((b,i)=>{
      b.data.push()
if(ubh == b.boreholename){

}
    })
  })
  
}

const saveFile = async (file) => {

var boreholedetails = private_FileReadingService(file)




  //save the file in the storage and save the details in the db
  // if (await User.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  // return User.create(userBody);
  // return 'received the file ' + file 
};


/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getBoreholeByName = async (name) => {
  return Borehole.findById(id);
};



/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};




module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  saveFile
};
