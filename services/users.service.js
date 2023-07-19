const UserRepository = require('../repositories/users.repository');
const ApiError = require('../apierror');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {
  userRepository = new UserRepository();
  // 회원가입 API
  signupUser = async (email, password, name, phone, address) => {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //이메일 형식검사
    const passwordReg = /^.{4,}$/; //password 형식 검사
    if (!emailReg.test(email)) {
      throw new ApiError('이메일 형식이 일치하지 않습니다.', 412);
    }
    if (!passwordReg.test(password)) {
      throw new ApiError('패스워드 형식이 일치하지 않습니다.', 412);
    }
    if (password.includes(email)) {
      throw new ApiError('패스워드에 닉네임이 포함되어 있습니다.', 412);
    }

    const isExistUser = await this.userRepository.findUser(email);
    if (isExistUser) {
      throw new ApiError('중복된 이메일입니다.', 412);
    }

    //암호화
    const hashPassword = await bcrypt.hash(password, 6);
    await this.userRepository.createUser(email, hashPassword, name, phone, address);
    return;
  };
  // 로그인 API
  loginUser = async (email, password) => {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new ApiError('닉네임 또는 패스워드를 확인해주세요.', 412);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ApiError('닉네임 또는 패스워드를 확인해주세요.', 412);
    }

    const loginToken = jwt.sign({ userId: user.userId }, process.env.secretKey, {
      expiresIn: '60m',
    });

    return { loginToken };
  };
  //회원 정보 수정 api
  updateUser = async (userId, password, existPassword, newPassword, phone, address) => {
    const match = await bcrypt.compare(existPassword, password);
    if (!match) {
      throw new ApiError('기존 비밀번호가 일치하지 않습니다.', 412);
    }
    if (newPassword) {
      const passwordReg = /^.{4,}$/; //password 형식 검사
      if (!passwordReg.test(newPassword)) {
        throw new ApiError('비밀번호 형식이 일치하지 않습니다.', 412);
      }
    }

    const hashPassword = newPassword ? await bcrypt.hash(newPassword, 6) : null;

    await this.userRepository.updateUser(userId, hashPassword, phone, address);
    return;
  };
  //회원 탈퇴 api
  deleteUser = async (userId, password, existPassword) => {
    const match = await bcrypt.compare(existPassword, password);
    if (!match) {
      throw new ApiError('비밀번호가 일치하지 않습니다.', 412);
    }

    await this.userRepository.deleteUser(userId);
  };
}

module.exports = UserService;
