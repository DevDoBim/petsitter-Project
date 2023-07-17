const { Users } = require('../models');

class UserRepository {
  // 이메일로 회원 조회
  findUser = async (email) => {
    const user = await Users.findOne({ where: { email } });

    return user;
  };
  // 회원가입 API
  createUser = async (email, hashPassword, name, phone, address) => {
    await Users.create({ email, password: hashPassword, name, phone, address });
    return;
  };
}

module.exports = UserRepository;
