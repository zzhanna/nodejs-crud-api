import { serverRun, PORT } from "./server";

serverRun.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
