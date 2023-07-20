const PetSitterRepository = require('../repositories/petsitters.repository');

class PetSitterService {
  petSitterRepository = new PetSitterRepository();
  // 펫시터 전체 조회 API
  getPetSitters = async () => {
    return await this.petSitterRepository.getPetSitters();
  };
}

module.exports = PetSitterService;
