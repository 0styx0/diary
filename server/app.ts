import * as express from 'express';
import * as graphsqlHTTP from 'express-graphql';

import schema from './src/schema';

const app = express();

app.use('/api', graphsqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000);
