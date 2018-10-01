import { GraphQLNonNull, GraphQLString } from 'graphql'
import AppModels from '../../../models/index'
import User from '../types/User'
import AuthUtils from '../../authentication/utils/AuthUtils'
import Messages from '../../../messages/Messages'

//add
const UserAdd = {
  type: User,
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    birthday: {
      type: GraphQLString,
    },
    job: {
      type: GraphQLString,
    }
  },
  resolve: (_, params, context) => {
    return new Promise((resolve, reject) => {

      // user authorization  
      if (!context.user) {
        reject(Messages.KEYS.WRONG_SESSION)
      }

      // add user
      if (AuthUtils.isValidUser(params)) {
        // insert only if we have required data
        // insert only if user not exist
        AppModels.UserModel.findOne({ email: params.email }, (error, user) => {
          // insert only if user not exist
          if (!error) {
            if (!user) {
              const userModel = new AppModels.UserModel(params)
              let newUser = userModel.save(userModel)
              if (newUser) {
                resolve(newUser)
              } else {
                reject(Messages.KEYS.USER_ADD_ERROR)
              }
            } else {
              reject(Messages.KEYS.USER_ALREADY_EXIST)
            }
          } else {
            reject(error.message)
          }
        })
      } else {
        reject(Messages.KEYS.VERIFY_REQUIRED_INFORMATION)
      }
    })
  }
}

//export user add mutation
export default UserAdd 