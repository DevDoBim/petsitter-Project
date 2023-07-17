const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {
  userRepository = new UserRepository();
  // 회원가입 API
  signupUser = async (email, password, confirm, name, phone, address) => {
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //이메일 형식검사
    const passwordReg = /^.{4,}$/; //password 형식 검사
    try {
      if (!emailReg.test(email)) {
        return { code: 412, message: '이메일의 형식이 일치하지 않습니다.' };
      }
      if (password !== confirm) {
        return { code: 412, message: '패스워드가 일치하지 않습니다.' };
      }
      if (!passwordReg.test(password)) {
        return { code: 412, message: '패스워드 형식이 일치하지 않습니다.' };
      }
      if (password.includes(email)) {
        return { code: 412, message: '패스워드에 닉네임이 포함되어 있습니다.' };
      }
      if (!name || !phone || !address) {
        return { code: 412, message: '입력되지 않은 정보가 있습니다.' };
      }

      const isExistUser = await this.userRepository.findUser(email);
      if (isExistUser) {
        return { code: 412, message: '중복된 이메일입니다.' };
      }

      //암호화
      const hashPassword = await bcrypt.hash(password, 6);
      await this.userRepository.createUser(email, hashPassword, name, phone, address);

      return { code: 201, message: '회원 가입에 성공하였습니다.' };
    } catch (err) {
      return { code: 400, message: '요청한 데이터 형식이 올바르지 않습니다.' };
    }
  };
  // 로그인 API
  loginUser = async (email, password) => {
    try {
      const user = await this.userRepository.findUser(email);
      if (!user) {
        return { code: 412, message: '닉네임 또는 패스워드를 확인해주세요.' };
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return { code: 412, message: '닉네임 또는 패스워드를 확인해주세요.' };
      }

      const loginToken = jwt.sign({ userId: user.userId }, process.env.secretKey, {
        expiresIn: '60m',
      });

      return { code: 200, message: '로그인에 성공하였습니다.', loginToken };
    } catch (err) {
      return { code: 400, message: '로그인에 실패하였습니다.' };
    }
  };
}

module.exports = UserService;
