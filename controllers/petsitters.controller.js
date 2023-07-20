const PetSitterService = require('../services/petsitters.service');

class PetSittersController {
  petSitterService = new PetSitterService();
  // 펫시터 전체 조회 API
  getPetSitters = async (req, res) => {
    try {
      const petSitters = await this.petSitterService.getPetSitters();

      return res.status(200).json({ petSitters });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  };
}

module.exports = PetSittersController;
