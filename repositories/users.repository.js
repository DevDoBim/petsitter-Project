const { Users } = require('../models');

class UserRepository {
  // 이메일로 회원 조회
  findUser = async (email) => {
    return await Users.findOne({ where: { email } });
  };
  // 회원가입 API
  createUser = async (email, hashPassword, name, phone, address) => {
    await Users.create({ email, password: hashPassword, name, phone, address });
  };
  //회원 정보 수정 api
  updateUser = async (userId, hashPassword, phone, address) => {
    const updateValues = {};
    if (hashPassword) updateValues.password = hashPassword;
    if (phone) updateValues.phone = phone;
    if (address) updateValues.address = address;

    await Users.update(updateValues, { where: { userId } });
  };
  //회원 탈퇴 api
  deleteUser = async (userId) => {
    await Users.destroy({ where: { UserId: userId } });
  };
}

module.exports = UserRepository;
