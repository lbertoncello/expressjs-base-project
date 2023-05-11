import bcrypt from 'bcrypt';

export default class BcryptAdapter {
  constructor(salt) {
    this.salt = salt;
  }

  async encrypt(value) {
    const hash = await bcrypt.hash(value, this.salt);

    return hash;
  }
}
