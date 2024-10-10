const { ZodError } = require("zod");
const { getUserSchema, updateUserSchema } = require("./userModel");

describe("User Model", () => {
  describe("getUserSchema", () => {
    it("should validate a valid UUID", () => {
      const validData = { userId: "52da9b23-03a0-459f-a6d3-8a1a75eba7d5" };

      expect(() => getUserSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error for an invalid UUID", () => {
      const invalidData = { userId: "invalid-uuid" };

      expect(() => getUserSchema.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("updateUserSchema", () => {
    it("should validate valid user data", () => {
      const validData = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        username: "validUsername",
        name: "Valid Name",
        birthday: "1990-01-01",
      };
      expect(() => updateUserSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if username is too short", () => {
      const invalidData = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        username: "a",
        name: "Valid Name",
        birthday: "1990-01-01",
      };
      expect(() => updateUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if name is empty", () => {
      const invalidData = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        username: "validUsername",
        name: "",
        birthday: "1990-01-01",
      };
      expect(() => updateUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if birthday is a future date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const invalidData = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        username: "validUsername",
        name: "Valid Name",
        birthday: futureDate.toISOString(),
      };
      expect(() => updateUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if birthday is invalid", () => {
      const invalidData = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        username: "validUsername",
        name: "Valid Name",
        birthday: "invalid-date",
      };
      expect(() => updateUserSchema.parse(invalidData)).toThrow(ZodError);
    });
  });
});
