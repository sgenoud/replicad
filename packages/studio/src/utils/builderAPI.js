// I keep this around for debugging purpose (the reloading is faster when
// working on files in the worker.)
//
//import api from "../builder.worker"; /*

import { wrap } from "comlink";
import CadWorker from "../builder.worker?worker";
const api = wrap(new CadWorker());
/**/

export default api;
