import { app } from "./app.js";
import connectDB from "./dbConfig.js";
const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});