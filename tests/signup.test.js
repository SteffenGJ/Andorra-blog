const hasAccessToContent = require("../functions/middleware/hasAccessToContent");
const createAccount = require("../functions/createAccount");
const getContent = require("../functions/getContent");

describe("user signup and auth", () => {
  it("should grant access to content given a user has been granted permission", async () => {
    const userWithPermission = { id: "2", authorization: "Reader" };

    expect(await hasAccessToContent(userWithPermission.id)).toBe(true);
  });

  it("should not grant access to a non-registred user", async () => {
    expect(await hasAccessToContent()).toBe(false);
  });

  it("should encourage users with no account to create an account", async () => {
    expect(await getContent()).toEqual({
      success: false,
      message: "Du har ingen profil. Gå til 'Opret profil'.",
    });
  });

  it("should be able to create a new account", async () => {
    const newUser = {
      username: "Berit",
      passwordHash: "1234",
    };

    expect(await createAccount(newUser)).toEqual({
      success: true,
      data: { id: "1", username: "Berit", authorization: "Pending" },
    });
  });

  it("should not allow new user to see content before the user has been granted permission", async () => {
    const pendingUser = { id: "1", authorization: "Pending" };
    expect(await hasAccessToContent(pendingUser.id)).toBe(false);
  });
});
