const { registerUserSchema, loginUserSchema } = require("./authModel");
const { ZodError } = require("zod");

describe("Auth Model", () => {
  describe("registerUserSchema", () => {
    it("should validate a valid registration", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      };
      expect(() => registerUserSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if email is invalid", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
        confirmPassword: "password123",
      };
      expect(() => registerUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if password is too short", () => {
      const invalidData = {
        email: "test@example.com",
        password: "short",
        confirmPassword: "short",
      };
      expect(() => registerUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if passwords do not match", () => {
      const invalidData = {
        email: "test@example.com",
        password: "password123",
        confirmPassword: "differentPassword",
      };
      expect(() => registerUserSchema.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("loginUserSchema", () => {
    it("should validate a valid login", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };
      expect(() => loginUserSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if email is invalid", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
      };
      expect(() => loginUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if password is too short", () => {
      const invalidData = {
        email: "test@example.com",
        password: "short",
      };
      expect(() => loginUserSchema.parse(invalidData)).toThrow(ZodError);
    });
  });
});
