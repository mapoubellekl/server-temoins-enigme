import { NextFunction, Request, Response, Router } from 'express';
import { getEnigmeRepository, Enigme } from './enigme';
import { EnigmeDto } from './enigmeDto';
import { DICT_ENIGMES } from './listEnigmes';

var fs = require('fs');
const nbEntreesMax = 12;
let firstDate = new Date(2021, 3, 1);

export const router: Router = Router();

router.get('/enigme/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const idStr = req.params.id;
    const id = Number(idStr);
    const repository = await getEnigmeRepository();

    if(id >=1 && id <= nbEntreesMax && authorizedToShow(id)){
      console.log("authorized-> engime demandée " + idStr );
      var enigme = await repository.findOne({id: id});
      if(!enigme){
        await initEnigme(id);
        enigme = await repository.findOne({id: Number(idStr)});
      }
      res.send(toFrontEnigme(enigme));
    }
    else{
      console.log("get enigme n° "+id+", unauthorized");
      res.send(toUnauthorizedFrontEnigme(id));
    }
  }
  catch (err) {
    return next(err);
  }
});

// router.get('/enigme/', async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     const repository = await getEnigmeRepository();
//     const enigmes = await repository.find();
//     res.send(toFrontEnigmes(enigmes));
//   }
//   catch (err) {
//     return next(err);
//   }
// });


router.post('/check-enigme/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const idStr = req.params.id;
    const repository = await getEnigmeRepository();
    var enigme = await repository.findOne({id: Number(idStr)});

    console.log("check enigme n° "+idStr+", response="+req.body.response + ", reelleReponse ="+enigme.responseEnigme.toUpperCase()+";");
    if(enigme.responseEnigme.toUpperCase() === req.body.response.toUpperCase()){
        enigme.found = true;
        enigme = await repository.save(enigme);
    }
    res.send(toFrontEnigme(enigme));
  }
  catch (err) {
    return next(err);
  }
});

// router.post('/enigme', async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     const repository = await getEnigmeRepository();
//     const enigme = new Enigme();
//     enigme.year = req.body.year;
//     enigme.month = req.body.month;
//     enigme.id = req.body.id;
//     enigme.found = false;
//     enigme.imgEnigme = req.body.imgEnigme;
//     enigme.responseEnigme = 'data:image/png;base64,'+Buffer.from(req.body.responseEnigme).toString('base64');
//     enigme.imgGeoCaching = 'data:image/png;base64,'+Buffer.from(req.body.imgGeoCaching).toString('base64');
//     enigme.imgHiddenObject = 'data:image/png;base64,'+Buffer.from(req.body.imgHiddenObject).toString('base64');

//     const result = await repository.save(enigme);
//     res.send(result);
//   }
//   catch (err) {
//     return next(err);
//   }
// });

// router.delete('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     const repository = await getEnigmeRepository();
//     await repository.delete({id: Number.parseInt(req.params.id)});
//     res.send('OK');
//   }
//   catch (err) {
//     return next(err);
//   }
// });

function toFrontEnigme(enigme: Enigme){
    var res = new EnigmeDto();
    if(enigme){
        res.id = enigme.id;
        res.found = enigme.found;
        res.month = enigme.month;
        res.year = enigme.year;
        res.imgEnigme = readFile('enigme_'+enigme.id);
        res.authorized = true;
        if(enigme.found){
            res.geocachText = enigme.geocachText;
            res.imgGeoCaching  = readFile('geoCaching_'+enigme.id);
            res.imgHiddenObject  = readFile('hidden_'+enigme.id);
        }
    }
    return res;
}

function readFile(nameFile:string){
  let appRoot = process.cwd();
  return fs.readFileSync(appRoot+'/resources/'+nameFile+'.png', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    // return 'data:image/png;base64,'+Buffer.from(data).toString('base64');

    return 'data:image/png;base64,'+data.toString('base64');
    
  });
}

// function toFrontEnigmes(enigmes: Enigme[]){
//     const resArray = new EnigmeDto[enigmes.length]();
//     for (let index = 0; index < enigmes.length; index++) {
//       const enigme = enigmes[index];
//       var res = toFrontEnigme(enigme);
//       if(res){
//         resArray[index] = res;
//       }
//     }
//     return resArray;
// }

function authorizedToShow(id:number){
  let d = new Date(firstDate.getTime());
  console.log("firstDate = " + d);
  d.setMonth(firstDate.getMonth() + id - 1);
  console.log("comparingDate = " + d)
  let current = new Date();
  return (current.getTime() - d.getTime()) >= 0;
}

function toUnauthorizedFrontEnigme(id:number){
  console.log("enigme unauthorized : "+id);
  var res = new EnigmeDto();
  res.authorized = false;
  res.found = false;
  res.id = id;
  let d = new Date(firstDate.getTime());
  d.setMonth(firstDate.getMonth() + id - 1);
  res.month
  return res;
}

async function initEnigme(id:number){
  console.log("save new enigme n°" + id);
  var enigme = DICT_ENIGMES[""+id];
  console.log("enigme qui va etre sauvegardée = " +enigme);
  const toSave = new Enigme();
  toSave.year = enigme["year"];
  toSave.month = enigme["month"];
  toSave.responseEnigme = enigme["response"];
  toSave.geocachText = enigme["geocachText"];
  toSave.found=false;
  toSave.id = id;

  const repository = await getEnigmeRepository();
  console.log("sauvegardé : "+  await repository.save(toSave));
}