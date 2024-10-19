const invitFriendSchema = require("./invitFriendModel");
const { ZodError } = require("zod");

describe("invitFriendSchema", () => {
  it("should validate a valid email and name", () => {
    const validData = {
      email: "test@example.com",
      name: "John Doe",
    };

    expect(() => invitFriendSchema.parse(validData)).not.toThrow();
  });

  it("should throw a ZodError for an invalid email", () => {
    const invalidData = {
      email: "invalid-email",
      name: "John Doe",
    };

    expect(() => invitFriendSchema.parse(invalidData)).toThrow(ZodError);
  });

  it("should throw a ZodError if email is missing", () => {
    const missingEmailData = {
      name: "John Doe",
    };

    expect(() => invitFriendSchema.parse(missingEmailData)).toThrow(ZodError);
  });

  it("should throw a ZodError if name is missing", () => {
    const missingNameData = {
      email: "test@example.com",
    };

    expect(() => invitFriendSchema.parse(missingNameData)).toThrow(ZodError);
  });

  it("should throw a ZodError if name is empty", () => {
    const emptyNameData = {
      email: "test@example.com",
      name: "",
    };

    expect(() => invitFriendSchema.parse(emptyNameData)).toThrow(ZodError);
  });

  it("should throw a ZodError if name is less than 1 character", () => {
    const invalidNameData = {
      email: "test@example.com",
      name: "J",
    };

    expect(() => invitFriendSchema.parse(invalidNameData)).toThrow(ZodError);
  });
});
