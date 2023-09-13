const isUsernameTaken = require("../../functions/middleware/isUsernameTaken");
const User = require("../../models/user");

jest.mock("../../models/user");

describe("isUsernameTaken", () => {
  it("should return an error if username is taken", async () => {
    const req = { body: { user: { username: "Berit" } } };

    const next = jest.fn();

    User.findOne.mockResolvedValue(true);

    await isUsernameTaken(req, undefined, next);

    expect(next).toHaveBeenCalledWith(
      new Error("Brugernavnet er allerede taget.")
    );
  });

  it("should peacefully move on to the next route if username is not taken", async () => {
    const req = { body: { user: { username: "Berit" } } };
    const next = jest.fn();

    User.findOne.mockResolvedValue(false);

    await isUsernameTaken(req, undefined, next);

    expect(next).not.toHaveBeenCalledWith(
      new Error("Brugernavnet er allerede taget.")
    );
  });
});
