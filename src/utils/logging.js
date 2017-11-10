import bunyan from 'bunyan';

const log = bunyan.createLogger({ name: 'root', level: 'info' });
log.debug('bunyan logging init');

// register a global exception handler
window.onerror = (messageOrEvent, source, lineno, colno, error) =>
  log.error({ err: error });

// register the log as a global (would prefer webpack ProvidePlugin...)
global.log = log;

function LogRawStream() {}
LogRawStream.prototype.write = rec =>
  /* eslint no-console: off */
  console.log(
    '[%s] %s: %s',
    rec.time.toISOString(),
    bunyan.nameFromLevel[rec.level],
    rec.msg,
  );

log.addStream({
  level: 'debug',
  stream: new LogRawStream(),
  type: 'raw',
});

export default log;
