import express from 'express';
import createError from 'http-errors';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import { userRouter } from './routes/userRoutes';

const app = express();
/** place handleResponses as the very first middleware */
expressOasGenerator.handleResponses(app, {
  swaggerUiServePath: '/',
  swaggerDocumentOptions: {},
  specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.RECREATE
});

/** initialize your `app` and routes */

const PORT = 5050;

app.get('/', (_, res) => res.send('webserver is running'));

app.use('/user', userRouter);

app.use((_, __, next) => {
  next(createError(404));
});

/** place handleRequests as the very last middleware */
expressOasGenerator.handleRequests();
app.listen(PORT, () => {
  console.log(`webserver is running on http://localhost:${PORT}/`);
});