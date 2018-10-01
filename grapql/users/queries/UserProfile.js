
import User from '../types/User'
import Messages from '../../../messages/Messages'


// Query
export default {
  type: User,
  resolve: (_, args, context) => {

    // user authorization 
    console.log('UserProfile context.user : ', context.user)
    if (!context.user) {
      throw new Error(Messages.KEYS.WRONG_SESSION)
    }

    // return current user
    return context.user
  }
}
