const { Petsitters } = require('../models');

class PetSitterRepository {
  // 펫시터 전체 조회 API
  getPetSitters = async () => {
    return await Petsitters.findAll({});
  };
}

module.exports = PetSitterRepository;
