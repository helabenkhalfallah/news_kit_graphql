// mongoose part
import mongoose from 'mongoose';
import AppLogger from '../core/logger/AppLogger';

// promise
mongoose.Promise = global.Promise;

// connect
const DBConnect = async () => {
  const dbHost = process.env.MONGOOSE_DB_HOST;
  const dbPort = process.env.MONGOOSE_DB_PORT;
  const dbName = process.env.MONGOOSE_DB_NAME;
  const settings = {
    useCreateIndex: true,
    useNewUrlParser: true,
  };
  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, settings);
    AppLogger.debug('Connected to mongo!!!');
  } catch (err) {
    AppLogger.error('Could not connect to MongoDB');
  }
};

export default DBConnect;


