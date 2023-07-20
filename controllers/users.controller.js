const UserService = require('../services/users.service');

class UsersController {
  userService = new UserService();
  // 회원가입 API
  signupUser = async (req, res) => {
    try {
      const { email, password, confirm, name, phone, address } = req.body;

      if (!email || !password || !name || !phone || !address) {
        return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      if (password !== confirm) {
        return res.status(412).json({ message: '패스워드가 일치하지 않습니다.' });
      }

      await this.userService.signupUser(email, password, name, phone, address);

      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  // 로그인 API
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const { loginToken } = await this.userService.loginUser(email, password);

      res.cookie('Authorization', `Bearer ${loginToken}`);
      return res.status(200).json({ message: '로그인에 성공하였습니다.', loginToken });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //회원 정보 조회 API
  getUser = async (req, res) => {
    try {
      const user = res.locals.user;

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //회원 정보 수정 API
  updateUser = async (req, res) => {
    try {
      const { userId, password } = res.locals.user;
      const { existPassword, newPassword, newComfirm, phone, address } = req.body;

      if (newPassword !== newComfirm) {
        return res.status(412).json({ message: '새로운 비밀번호가 일치하지 않습니다.' });
      }

      await this.userService.updateUser(userId, password, existPassword, newPassword, phone, address);

      return res.status(200).json({ message: '프로필을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //회원 탈퇴 API
  deleteUser = async (req, res) => {
    try {
      const { userId, password } = res.locals.user;
      const { existPassword } = req.body;

      if (!existPassword) {
        return res.status(412).json({ errorMessage: '비밀번호 형식이 일치하지 않습니다.' });
      }

      await this.userService.deleteUser(userId, password, existPassword);

      return res.status(200).json({ message: '회원 탈퇴 완료하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = UsersController;
