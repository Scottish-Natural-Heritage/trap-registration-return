// Grab our config from the env vars, or set some defaults if they're missing.
const config = Object.freeze({
  port: process.env.TRR_PORT || '3010',
  sessionSecret: process.env.TRR_SESSION_SECRET || 'override_this_value',
  apiEndpoint: process.env.TR_API_URL || 'http://localhost:3001/trap-registration-api/v1',
  hostPrefix: process.env.TRR_HOST_PREFIX || `http://localhost:${process.env.TRR_PORT || 3010}`,
  pathPrefix: process.env.TRR_PATH_PREFIX ? `/${process.env.TRR_PATH_PREFIX}` : '/trap-registration-return',
  cookiePrefix: process.env.COOKIE_PREFIX || '_'
});

export {config as default};
