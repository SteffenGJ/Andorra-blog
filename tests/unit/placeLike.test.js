const placeLike = require("../../functions/placeLike");

describe("place like", () => {
  it("should connect the liking user to the post", async () => {
    const user = { id: "2", hasLiked: [] };
    const post = { id: "1" };
    await placeLike(user.id, post.id);

    expect(user.hasLiked[0]).toBe("1");
  });
});
