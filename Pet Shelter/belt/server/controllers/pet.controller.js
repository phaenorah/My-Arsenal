const Pet = require('mongoose').model('Pet');
const { Http } = require('@status/codes');


module.exports = {
  index(_request, response) {
    Pet.find({})
      .then(pets => response.json(pets))
      .catch(error => response.status(Http.InternalServerError).json(error));
  },
  create(request, response) {
    Pet.create(request.body)
      .then(pet => response.json(pet))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);

        response.status(Http.UnprocessableEntity).json(errors);
      });
  },
  show(request, response) {
    const { pet_id: petId } = request.params;

    Pet.findById(petId)
      .then(pet => {
        if (!pet) {
          throw new Error(`Pet with id ${petId} not found!`);
        }

        response.json(pet);
      })
      .catch(error => {
        response.status(Http.NotFound).json(error);
      });
  },
  update(request, response) {
    const { pet_id: petId } = request.params;
    Pet.findByIdAndUpdate(petId, request.body, { new: true, runValidators: true })
      .then(pet => response.json(pet))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);

        response.status(Http.UnprocessableEntity).json(errors);
      });
  },
  destroy(request, response) {
    const { pet_id: petId } = request.params;
    Pet.findByIdAndRemove(petId)
      .then(pet => response.json(pet))
      .catch(error => response.status(Http.Conflict).json(error));
  },
};
