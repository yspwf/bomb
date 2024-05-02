import { start } from './library';

import { Main } from './src';

const app = start(Main);
app.listen(9192);
// console.log(app);