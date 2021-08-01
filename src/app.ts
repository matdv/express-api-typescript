import express from 'express';
import createError from 'http-errors';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import { userRouter } from './routes/userRoutes';

const PORT = 5050;
const SWAGGERPATH = 'swagger';
const app = express();

/** place handleResponses as the very first middleware */
expressOasGenerator.handleResponses(app, {
  swaggerUiServePath: SWAGGERPATH,
  swaggerDocumentOptions: {},
  specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.RECREATE
});


/** initialize your `app` and routes */
app.use('/user', userRouter);


/** place handleRequests as the last middleware before error handler */
expressOasGenerator.handleRequests();

/** place the error handler as the very last middleware */
app.use((_, __, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`webserver is running on http://localhost:${PORT}/`);
});
