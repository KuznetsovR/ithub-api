#!/usr/bin/env node
const [express, port] = [require('express'), 1337];
const { openDayRouter } = require('./open-day/open-day-router');
const cors = require('cors');
const { commissionRouter } = require('./commission/commission-router');
const { coursesRouter } = require('./courses/courses-router');
const { schoolEventRouter } = require('./school-event/school-event-router');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const https = require('https')
const fs = require('fs')

app.use(cors({ origin: '*' }));


const httpsOptions = {
    key: fs.readFileSync("certificate/portal_it-college_ru.key"), // путь к ключу
    cert: fs.readFileSync("certificate/portal_it-college_ru.crt") // путь к сертификату
}

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(jsonParser);
app.use(urlencodedParser);

const upload = multer();

app.use('/api/open-day', openDayRouter);
app.use('/api/school-event', schoolEventRouter);
app.use('/api/courses'  , coursesRouter);
app.use('/api/commission', upload.array('files'), commissionRouter);

https.createServer(httpsOptions, app).listen(port, ()=> console.log('server started'))
