interface IUser {
  id: string;
  password: string;
  hashed?: string | null;
  email?: string | null;
  tel?: string | null;
  birth?: string | null;
}

export default class User implements IUser {
  id;
  password;
  hashed;
  email;
  tel;
  birth;

  constructor(userinfo: IUser) {
    const { id, password, hashed, email, tel, birth } = userinfo;
    this.id = id;
    this.password = password;
    this.hashed = hashed || null;
    this.email = email || null;
    this.tel = tel || null;
    this.birth = birth || null;
  }
}
