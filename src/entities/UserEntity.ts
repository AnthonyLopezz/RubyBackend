import ProfileEntity from "./ProfileEntity";

class UserEntity {
  public nameUser: string;
  public emailUser: string;
  public passwordUser: string;
  public stateUser: number;
  public dateUser: Date;
  public codProfile: ProfileEntity;

  public nameUserImg?: string;
  public userAvatar?: string;

  constructor(
    name: string,
    email: string,
    pass: string,
    state: number,
    date: Date,
    codP: ProfileEntity
  ) {
    this.nameUser = name;
    this.emailUser = email;
    this.passwordUser = pass;
    this.stateUser = state;
    this.dateUser = date;
    this.codProfile = codP;
  }
}
export default UserEntity;
