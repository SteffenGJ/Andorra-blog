const {
  NoAccountError,
  NotGrantedAccessError,
} = require("../../models/errors");
const User = require("../../models/user");

const hasAccessToContent = async (req, res, next) => {
  if (!req.params.id || req.params.id === "null") {
    const error = new NoAccountError(
      "Du skal oprette en bruger for at få adgang til denne side."
    );
    return next(error);
  }

  const thisUser = await User.findById(req.params.id);

  if (thisUser.authorization === "Pending") {
    const error = new NotGrantedAccessError(
      "Jeg er i fuld gang med at behandle din anmodning om adgang til hjemmesiden. Prøv igen senere. Skriv til mig hvis du vil have hurtig adgang til siden."
    );
    return next(error);
  }

  next();
};

module.exports = hasAccessToContent;
