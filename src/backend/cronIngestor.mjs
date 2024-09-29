import ingestarNormativas from './ingestorWTO.mjs';
import cron from 'node-cron';


cron.schedule('0 0 * * 1', ingestarNormativas);
console.log('Script iniciado y esperando la ejecución semanal.');
