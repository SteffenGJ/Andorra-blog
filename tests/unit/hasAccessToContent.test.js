const hasAccessToContent = require("../../functions/middleware/hasAccessToContent");
const User = require("../../models/user");

jest.mock("../../models/user");

describe("hasAccessToContent", () => {
  it("should deny a user access if the user has not been authorized access", async () => {
    const req = {
      body: {
        userId: "3",
      },
    };
    const next = jest.fn();

    User.findById.mockResolvedValueOnce({ authorization: "Pending" });

    await hasAccessToContent(req, undefined, next);

    expect(next).toHaveBeenCalledWith(
      new Error(
        "Vi er i fuld gang med at kigge på din anmodning om adgang til hjemmesiden. Skriv til ejeren hvis du vil have hurtigt adgang til siden"
      )
    );
  });

  it("should peacefully move on if the user is authorized", async () => {
    const req = { body: { userId: "3" } };
    const next = jest.fn();

    User.findById.mockResolvedValue({ authorization: "Reader" });

    await hasAccessToContent(req, undefined, next);

    expect(next).not.toHaveBeenCalledWith(new Error());
  });

  it("should throw an error if no user-id is provided", async () => {
    const req = { body: {} };
    const next = jest.fn();

    await hasAccessToContent(req, undefined, next);

    expect(next).toHaveBeenCalledWith(
      new Error("Du har ikke adgang til siden. Opret venligst en bruger.")
    );
  });
});
