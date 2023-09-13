const placeComment = require("../../functions/placeComment");

describe("place comment", () => {
  it("should connect the comment to the commented post", async () => {
    const commentText = "bdsabfk";
    const commentDate = "12.06.2008";
    const commentingUser = { id: "1" };
    const commentedPost = { id: "2", comments: [] };

    await placeComment(
      commentText,
      commentDate,
      commentingUser.id,
      commentedPost.id
    );

    expect(commentedPost.comments.length).toBe(1);
  });
});
