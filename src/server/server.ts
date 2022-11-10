import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { clientConnect, initDb } from './createDB';
import {
  createNewOfficer,
  createNewNuclear,
  createNewLocationHistory,
  createNewLocation,
  getAllDataTable,
  updateRows,
  deleteRows,
  CheckIfExist,
} from './postgres';
import cors from 'cors';

const server = express();
server.use(json());
server.use(express.static('./dist'));
// server.use(characterCheck);
server.use(cors());

init();

async function init() {
  await clientConnect();
  await initDb();
  await loadServer();
}

async function loadServer() {
  // server.get('*', async (req: Request, res: Response) => {
  //   res.sendFile(req.path || '/index.html', { root: './dist' });
  // });

  // Post requests - add new rows:
  server.post('/new-bomb', async (req: Request, res: Response) => {
    console.log('post - new-bomb: ' + req.body);
    if (
      (await CheckIfExist('officers', 'officer_id', req.body.officer_id)) &&
      (await CheckIfExist('locations', 'location_id', req.body.location_id))
    ) {
      await createNewNuclear(req.body);
      res.send({ message: true });
    } else {
      res.send({ message: 'Invalid location_id / officer_id input !' });
    }
  });

  server.post('/new-officer', async (req: Request, res: Response) => {
    console.log('post - new-officer: ' + req.body);
    await createNewOfficer(req.body);
    res.send({ message: true });
  });

  server.post('/new-location', async (req: Request, res: Response) => {
    console.log('post - new-location: ' + req.body);
    await createNewLocation(req.body);
    res.send({ message: true });
  });

  server.post('/new-locations_history', async (req: Request, res: Response) => {
    console.log('post - new-locations_history: ' + req.body);
    if (
      (await CheckIfExist('bombs', 'bomb_id', req.body.bomb_id)) &&
      (await CheckIfExist('locations', 'location_id', req.body.location_id))
    ) {
      await createNewLocationHistory(req.body);
      res.send({ message: true });
    } else {
      res.send({ message: 'Invalid location_id / bomb_id input !' });
    }
  });

  // Put requests - delete / update rows:
  server.put('/delete-form', async (req: Request, res: Response) => {
    console.log('put - delete-form: ' + req.body);
    res.send({ message: await deleteRows(req.body) });
  });

  server.put('/update-form', async (req: Request, res: Response) => {
    console.log('put - update-form: ' + req.body);
    res.send({ message: await updateRows(req.body) });
  });

  // Get requests - get the tables data:
  server.get('/get-table/:name', async (req: Request, res: Response) => {
    console.log('get - get-table: ' + req.params.name);
    res.send(await getAllDataTable(req.params.name));
  });

  // Initialize the server + port:
  const port = process.env.PORT || 4000;
  server.listen(port, () => console.log('Hosted: http://localhost:' + port));
}

function characterCheck(req: Request, res: Response, next: Function) {
  // Checks the integrity of the characters - prevents SQL injection !!!
  const bodyObject: Object = req.body;
  console.log(bodyObject);
  for (const [key, value] of Object.entries(bodyObject)) {
    if (!CheckTypes(key, value)) {
      res.send({
        message: 'Invalid input - `' + value.toString() + '`',
      });
      return;
    }
    if (
      value.toString().match(/^[A-Za-z0-9-_./ @]+$/) === null ||
      value.toString().includes('//')
    ) {
      console.log('problem: ' + value.toString());
      res.send({
        message: 'Invalid input character - `' + value.toString() + '`',
      });
      return;
    }
  }
  next();
}

function CheckTypes(key: string, value: string) {
  if (
    (key === 'lat' ||
      key === 'lon' ||
      key === 'location_id' ||
      key === 'officer_id' ||
      key === 'location_id' ||
      key === 'bomb_id' ||
      key === 'army_identity_number') &&
    !isNumeric(value)
  ) {
    console.log('Problem!', key, value);
    return false;
  } else if (
    (key === 'manufacturing_year' ||
      key === 'arrival_date' ||
      key === 'departure_date') &&
    !isDate(value)
  ) {
    console.log('Problem!', key, value);
    return false;
  }
  return true;
}

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

function isDate(date: string) {
  console.log(new Date(date).toDateString());
  return new Date(date).toDateString() !== 'Invalid Date';
}
