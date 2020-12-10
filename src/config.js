// Grab our config from the env vars, or set some defaults if they're missing.
const config = Object.freeze({
  port: process.env.TRR_PORT || '3010',
  sessionSecret: process.env.TRR_SESSION_SECRET || 'override_this_value',
  hostPrefix: process.env.TRR_HOST_PREFIX || `http://localhost:${process.env.TRR_PORT}`,
  pathPrefix: process.env.TRR_PATH_PREFIX ? `/${process.env.TRR_PATH_PREFIX}` : '/trap-registration-return',
  cookiePrefix: process.env.COOKIE_PREFIX || '__Secure'
});

export {config as default};
