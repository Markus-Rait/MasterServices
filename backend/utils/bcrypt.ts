/* eslint-disable @typescript-eslint/no-misused-promises */
import * as bcrypt from 'bcryptjs';

const passwords = ['a', 'admin', 'buyer', 'seller'];

const passGen = async (passwords: string[]) => {
  const salt = await bcrypt.genSalt(10);
  passwords.forEach(async (password) => {
    console.log(`${password}\t${await bcrypt.hash(password, salt)}`);
  });
};

void passGen(passwords);
