import Contacts from './Contacts'
import Student from './Student'

export interface UserSecrets {
  email: string
  password: string
}

type Props = Modify<User, { id?: string }>

export default class User extends Student implements UserSecrets {
  public email: string
  public password: string

  public contacts: Contacts

  constructor(props: Props) {
    super({ ...props, id: props.id || '' })

    this.email = props.email
    this.password = props.password

    this.contacts = new Contacts(props.contacts)
  }
}
