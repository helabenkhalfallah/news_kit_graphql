import UserAdd from './users/mutations/UserAdd'
import UserEdit from './users/mutations/UserEdit'
import UserDelete from './users/mutations/UserDelete'
import UsersDelete from './users/mutations/UsersDelete'
import AuthLogin from './authentication/mutations/AuthLogin'
import AuthRegister from './authentication/mutations/AuthRegister'

//all mutations
const gqlMutationsProvider = {
  AuthLogin,
  AuthRegister,
  UserAdd,
  UserEdit,
  UserDelete,
  UsersDelete,
}

//export gql provider
export default gqlMutationsProvider 