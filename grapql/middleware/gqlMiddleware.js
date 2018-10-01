// graphql express
import graphqlHTTP from 'express-graphql';
import gqlProvider from '../index';
import passport from 'passport';
import AppLogger from '../../core/logger/AppLogger';
import AuthUtils from '../authentication/utils/AuthUtils';
import MesssageProvider from '../../messages/MesssageProvider';
import Messages from '../../messages/Messages';
import {
  isEmpty,
} from 'lodash';


// init graphql authentication middleware
export default graphqlHTTP((req, res) => {
  return new Promise((resolve) => {
    const next = (user, info = {}) => {
      AppLogger.debug('gqlMiddleware user - ', user);
      AppLogger.debug('gqlMiddleware info - ', info);
      /**
       * GraphQL configuration
       * graphiql: process.env.NODE_ENV !== 'production'
       */
      resolve({
        schema: gqlProvider,
        graphiql: true,
        context: {
          user: user || null,
        },
        formatError: (gqlError) => {
          const error = gqlError.message;
          const messageByKey = MesssageProvider.messageByKey(error);
          const message = messageByKey || gqlError.message;
          const status = MesssageProvider.statusByKey(error);
          return (
            {
              message: message,
              statusCode: status,
            });
        },
      });
    };

    // passport proxy
    passport.authenticate(process.env.JWT_SCHEME, {
      session: false,
    }, (error, user) => {
      // get request payload
      const body = req.body ? req.body.query : '';
      AppLogger.debug('gqlMiddleware passport body - ', body);
      AppLogger.debug('gqlMiddleware passport error - ', error);

      // if not body means main url
      if (isEmpty(body)) {
        next();
        return;
      }

      // if is login or register skip token auth
      if (body &&
        (body.includes('AuthLogin')
          || body.includes('AuthRegister'))) {
        AppLogger.debug('gqlMiddleware AuthLogin, AuthRegister or Home');
        next();
        return;
      }

      // need auth for others endpoint
      const token = AuthUtils.retrieveToken(req.headers);
      AppLogger.debug('gqlMiddleware passport token - ', token);
      if (AuthUtils.isValidToken(token)) {
        // valid token
        AppLogger.debug('gqlMiddleware valid token');
        next(user);
      } else {
        // invalid token
        AppLogger.debug('gqlMiddleware invalid token');
        res.status(401).send({
          success: false,
          message: MesssageProvider.messageByKey(Messages.KEYS.WRONG_SESSION),
        });
      }
    })(req, res, next);
  });
});
